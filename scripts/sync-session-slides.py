#!/usr/bin/env python3
"""Extract slide URLs, including linked text and Drive chips, from the public sheet."""
import json
import re
import sys
from html.parser import HTMLParser
from urllib.parse import parse_qs, urlparse
from urllib.request import urlopen

URL = 'https://docs.google.com/spreadsheets/d/1UU5eMpXwRo0LWrhpxGqUC2yfZb1ZkpiiN0ipHu9hOis/htmlview/sheet?headers=true&gid=0'

class SheetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rows, self.row, self.cell = [], None, None
    def handle_starttag(self, tag, attrs):
        if tag == 'tr': self.row = []
        elif tag == 'td' and self.row is not None: self.cell = {'text': '', 'links': []}
        elif tag == 'a' and self.cell is not None:
            self.cell['links'].append(dict(attrs).get('href', ''))
    def handle_data(self, data):
        if self.cell is not None: self.cell['text'] += data
    def handle_endtag(self, tag):
        if tag == 'td' and self.cell is not None:
            self.row.append(self.cell); self.cell = None
        elif tag == 'tr' and self.row is not None:
            self.rows.append(self.row); self.row = None

def url_for(cell):
    candidates = cell['links'] + re.findall(r'https?://[^\s<>]+', cell['text'])
    for candidate in candidates:
        parsed = urlparse(candidate)
        if parsed.hostname in ('www.google.com', 'google.com') and parsed.path == '/url':
            candidate = parse_qs(parsed.query).get('q', [''])[0]
            parsed = urlparse(candidate)
        if parsed.scheme in ('http', 'https') and parsed.netloc:
            return candidate
    return None

try:
    with urlopen(URL, timeout=20) as response:
        parser = SheetParser(); parser.feed(response.read().decode('utf-8'))
    if not any(len(row) >= 3 and row[0]['text'].strip() == '연사자명' for row in parser.rows):
        raise ValueError('Sheet header not found')
    result = {row[0]['text'].strip(): url_for(row[2]) for row in parser.rows if len(row) >= 3 and url_for(row[2])}
    print(json.dumps(result, ensure_ascii=False))
except Exception as exc:
    print(f'Could not read slide links: {exc}', file=sys.stderr)
    sys.exit(1)
