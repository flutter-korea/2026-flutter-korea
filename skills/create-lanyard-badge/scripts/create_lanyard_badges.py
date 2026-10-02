#!/usr/bin/env python3
"""Render Flutter Korea 2026 lanyard badges from JSON or CSV records."""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
import zipfile
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError as exc:
    raise SystemExit("Pillow is required. Install it with: python3 -m pip install Pillow") from exc


SKILL_DIR = Path(__file__).resolve().parents[1]
ASSET_DIR = SKILL_DIR / "assets"
BACKGROUND = ASSET_DIR / "staff_badge_background.png"
AI_ICON = ASSET_DIR / "ai_track_icon.png"
FLUTTER_MARK = ASSET_DIR / "flutter_mark.png"

W, H = 1374, 2126
PDF_W, PDF_H = 164.91, 255.618
TRIM_BOX = (49, 49, 1325, 2077)
FULL_SIZE_1200 = (2749, 4260)
TRIM_SIZE_1200 = (2551, 4063)
NAVY = "#062663"
BLUE = "#087BF3"
PILL = "#EAF5FE"

FONT_BOLD_CANDIDATES = (
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
)
FONT_REGULAR_CANDIDATES = (
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/Library/Fonts/Arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
)
FONT_KOREAN_CANDIDATES = (
    "/System/Library/Fonts/AppleSDGothicNeo.ttc",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
)


def existing_font(candidates: tuple[str, ...]) -> str:
    for candidate in candidates:
        if Path(candidate).exists():
            return candidate
    raise SystemExit(f"No suitable font found. Checked: {', '.join(candidates)}")


FONT_BOLD = existing_font(FONT_BOLD_CANDIDATES)
FONT_REGULAR = existing_font(FONT_REGULAR_CANDIDATES)
FONT_KOREAN = existing_font(FONT_KOREAN_CANDIDATES)


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(path, size, index=index)
    except OSError:
        return ImageFont.truetype(path, size)


def fit_font(text: str, path: str, maximum: int, minimum: int, max_width: int, index: int = 0):
    for size in range(maximum, minimum - 1, -2):
        candidate = font(path, size, index=index)
        box = candidate.getbbox(text)
        if box[2] - box[0] <= max_width:
            return candidate
    return font(path, minimum, index=index)


def fit_crop(image: Image.Image) -> Image.Image:
    target_ratio = W / H
    source_ratio = image.width / image.height
    if source_ratio > target_ratio:
        needed_w = round(image.height * target_ratio)
        left = (image.width - needed_w) // 2
        image = image.crop((left, 0, left + needed_w, image.height))
    else:
        needed_h = round(image.width / target_ratio)
        top = (image.height - needed_h) // 2
        image = image.crop((0, top, image.width, top + needed_h))
    return image.resize((W, H), Image.Resampling.LANCZOS)


def transparent_white(image: Image.Image, threshold: int = 245) -> Image.Image:
    result = image.convert("RGBA")
    pixels = result.load()
    for y in range(result.height):
        for x in range(result.width):
            r, g, b, a = pixels[x, y]
            if r > threshold and g > threshold and b > threshold:
                pixels[x, y] = (r, g, b, 0)
    return result


def draw_centered(draw: ImageDraw.ImageDraw, text: str, y: float, text_font, fill: str):
    box = draw.textbbox((0, 0), text, font=text_font)
    x = (W - (box[2] - box[0])) / 2 - box[0]
    draw.text((x, y), text, font=text_font, fill=fill)


def draw_event_title(draw: ImageDraw.ImageDraw):
    event_font = font(FONT_BOLD, 62)
    parts = (("Flutter ", NAVY), ("Korea ", BLUE), ("2026", NAVY))
    width = sum(draw.textlength(text, font=event_font) for text, _ in parts)
    x = (W - width) / 2
    for text, color in parts:
        draw.text((x, 270), text, font=event_font, fill=color)
        x += draw.textlength(text, font=event_font)


def draw_track_pill(image: Image.Image):
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((128, 1555, 828, 1655), radius=42, fill=PILL)
    ai = Image.open(AI_ICON).convert("RGBA").resize((52, 52), Image.Resampling.LANCZOS)
    image.paste(ai, (162, 1574), ai)
    track_font = font(FONT_REGULAR, 34)
    draw.text((224, 1585), "AI Track", font=track_font, fill=NAVY)
    draw.text((431, 1585), "·", font=track_font, fill=NAVY)
    flutter = Image.open(FLUTTER_MARK).convert("RGBA").resize((54, 54), Image.Resampling.LANCZOS)
    image.paste(flutter, (483, 1578), flutter)
    draw.text((552, 1585), "Flutter Track", font=track_font, fill=NAVY)


def prepare_background() -> Image.Image:
    original = fit_crop(Image.open(BACKGROUND).convert("RGB"))
    footer = transparent_white(original.crop((330, 1920, 1310, 2070)))

    # Clear inherited logo/session/footer pixels while preserving the supplied artwork.
    draw = ImageDraw.Draw(original)
    draw.rectangle((270, 70, 1115, 355), fill="white")
    draw.rectangle((90, 1530, 850, 1675), fill="white")
    draw.rectangle((320, 1915, 1320, 2080), fill="white")
    original.paste(footer, (330, 1855), footer)
    return original


def normalize_affiliation(value):
    if not value:
        return ""
    if isinstance(value, list):
        parts = [str(item).strip() for item in value if str(item).strip()]
        if len(parts) == 2 and parts[0].casefold() == parts[1].casefold():
            return parts[0]
        return " / ".join(parts)
    return str(value).strip()


def render_badge(record: dict) -> Image.Image:
    image = prepare_background()
    draw = ImageDraw.Draw(image)
    role = str(record.get("role") or "STAFF").strip().upper()
    display_name = str(record.get("korean_name") or record.get("name") or "").strip()
    english_name = str(record.get("english_name") or "").strip()
    affiliation = normalize_affiliation(record.get("affiliation"))
    offset = int(record.get("name_offset_y") or 0)

    draw_event_title(draw)
    role_font = fit_font(role, FONT_BOLD, 150, 96, 1110)
    draw_centered(draw, role, 350, role_font, BLUE if role == "SPEAKER" else NAVY)

    if display_name:
        primary_font = fit_font(display_name, FONT_KOREAN, 210, 100, 1110, index=6)
        lines = [(display_name, primary_font, NAVY)]
        gaps = []
        distinct_english = bool(english_name and display_name.casefold() != english_name.casefold())
        if distinct_english:
            lines.append((english_name, fit_font(english_name, FONT_REGULAR, 128, 68, 1030), NAVY))
            gaps.append(66)
        if affiliation:
            lines.append((affiliation, fit_font(affiliation, FONT_KOREAN, 68, 42, 1040, index=2), NAVY))
            gaps.append(48 if distinct_english else 66)

        boxes = [draw.textbbox((0, 0), text, font=line_font) for text, line_font, _ in lines]
        heights = [box[3] - box[1] for box in boxes]
        total_height = sum(heights) + sum(gaps)
        if len(lines) == 1:
            visible_y = (H - total_height) // 2 + offset
        else:
            visible_y = (560 + 1210 - total_height) // 2 + offset

        for index, ((text, line_font, color), box, height) in enumerate(zip(lines, boxes, heights)):
            x = (W - (box[2] - box[0])) // 2 - box[0]
            draw.text((x, visible_y - box[1]), text, font=line_font, fill=color)
            visible_y += height
            if index < len(gaps):
                visible_y += gaps[index]

    draw_track_pill(image)
    slogan_font = font(FONT_BOLD, 34)
    x, y = 142, 1687
    first = "Back to Basics. "
    draw.text((x, y), first, font=slogan_font, fill=NAVY)
    x += draw.textlength(first, font=slogan_font)
    draw.text((x, y), "Move Forward.", font=slogan_font, fill=BLUE)
    return image


def safe_slug(value: str, fallback: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9_-]+", "_", value.strip()).strip("_").lower()
    return slug or fallback


def load_records(path: Path) -> list[dict]:
    if path.suffix.lower() == ".json":
        data = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(data, dict):
            data = data.get("badges", [])
        if not isinstance(data, list):
            raise ValueError("JSON input must be an array or an object containing a 'badges' array")
        return [dict(item) for item in data]
    if path.suffix.lower() == ".csv":
        with path.open("r", encoding="utf-8-sig", newline="") as handle:
            return [dict(row) for row in csv.DictReader(handle)]
    raise ValueError("Input must be a .json or .csv file")


def make_contact_sheet(cards: list[tuple[dict, Image.Image]], path: Path):
    columns, thumb_w, thumb_h = 3, 300, 464
    rows = (len(cards) + columns - 1) // columns
    sheet = Image.new("RGB", (40 + columns * 330, 30 + rows * 510), "#EDF3FA")
    draw = ImageDraw.Draw(sheet)
    label_font = font(FONT_KOREAN, 20, index=6)
    for index, (record, artwork) in enumerate(cards):
        thumb = artwork.copy()
        thumb.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        col, row = index % columns, index // columns
        x = 20 + col * 330 + (thumb_w - thumb.width) // 2
        y = 15 + row * 510
        sheet.paste(thumb, (x, y))
        label = f"{record.get('role', 'STAFF')}: {record.get('korean_name', '')}"
        draw.text((20 + col * 330, y + 470), label, font=label_font, fill=NAVY)
    sheet.save(path, dpi=(300, 300))


def write_pdf(cards: list[tuple[dict, Path]], path: Path) -> bool:
    try:
        from reportlab.lib.utils import ImageReader
        from reportlab.pdfgen import canvas
    except ImportError:
        print("ReportLab is not installed; skipped PDF export.", file=sys.stderr)
        return False
    document = canvas.Canvas(str(path), pagesize=(PDF_W, PDF_H))
    document.setTitle("Flutter Korea 2026 Lanyard Badges")
    for record, preview_path in cards:
        document.drawImage(ImageReader(str(preview_path)), 0, 0, width=PDF_W, height=PDF_H, mask="auto")
        document.setSubject(f"{record.get('role', 'STAFF')} — {record.get('korean_name', '')}")
        document.showPage()
    document.save()
    return True


def zip_directory(directory: Path, archive_path: Path):
    with zipfile.ZipFile(archive_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for file_path in sorted(directory.glob("*.png")):
            archive.write(file_path, file_path.name)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True, help="JSON or CSV badge records")
    parser.add_argument("--output-dir", type=Path, required=True, help="Destination directory")
    parser.add_argument("--role", help="Override the role for every record")
    parser.add_argument("--pdf", action="store_true", help="Also create a multi-page PDF")
    args = parser.parse_args()

    records = load_records(args.input)
    if not records:
        raise SystemExit("The input contains no badge records")
    if args.role:
        for record in records:
            record["role"] = args.role

    output = args.output_dir.resolve()
    preview_dir = output / "preview_600dpi"
    trim_dir = output / "print_54x86mm_1200dpi"
    full_dir = output / "full_artwork_1200dpi"
    for directory in (preview_dir, trim_dir, full_dir):
        directory.mkdir(parents=True, exist_ok=True)

    rendered = []
    pdf_cards = []
    manifest = []
    for index, record in enumerate(records, start=1):
        if not str(record.get("korean_name") or record.get("name") or "").strip():
            raise SystemExit(f"Record {index} has no korean_name/name")
        slug = safe_slug(str(record.get("slug") or ""), f"badge_{index:02d}")
        artwork = render_badge(record)
        preview_path = preview_dir / f"{slug}_preview.png"
        trim_path = trim_dir / f"{slug}_54x86mm_1200dpi.png"
        full_path = full_dir / f"{slug}_full_artwork_1200dpi.png"
        artwork.save(preview_path, dpi=(600, 600), optimize=True)
        artwork.crop(TRIM_BOX).resize(TRIM_SIZE_1200, Image.Resampling.LANCZOS).save(
            trim_path, dpi=(1200, 1200), optimize=True
        )
        artwork.resize(FULL_SIZE_1200, Image.Resampling.LANCZOS).save(
            full_path, dpi=(1200, 1200), optimize=True
        )
        rendered.append((record, artwork))
        pdf_cards.append((record, preview_path))
        manifest.append({"slug": slug, "preview": str(preview_path), "trim_png": str(trim_path), "full_png": str(full_path)})

    contact_sheet = output / "contact_sheet.png"
    make_contact_sheet(rendered, contact_sheet)
    trim_zip = output / "badges_54x86mm_1200dpi.zip"
    full_zip = output / "badges_full_artwork_1200dpi.zip"
    zip_directory(trim_dir, trim_zip)
    zip_directory(full_dir, full_zip)

    pdf_path = output / "badges_print_ready.pdf"
    pdf_created = write_pdf(pdf_cards, pdf_path) if args.pdf else False
    summary = {
        "count": len(records),
        "contact_sheet": str(contact_sheet),
        "trim_zip": str(trim_zip),
        "full_zip": str(full_zip),
        "pdf": str(pdf_path) if pdf_created else None,
        "files": manifest,
    }
    (output / "manifest.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
