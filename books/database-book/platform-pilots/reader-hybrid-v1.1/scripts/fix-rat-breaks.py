"""Fix RAT files: remove all page breaks, add exactly ONE before Answer Key."""
import os
import re
from pathlib import Path

repo = Path(__file__).resolve().parents[3] / 'files' / 'source' / 'chapters'

for f in repo.glob('ch*/rat.md'):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    before = content.count('PAGE BREAK')
    
    # Remove ALL page break markers (handle \r\n and \n, with optional whitespace)
    # Pattern: optional newline + comment + optional whitespace/newline + div + optional newline
    content = re.sub(
        r'\s*<!--\s*PAGE\s*BREAK\s*-->\s*<div[^>]*page-break[^>]*></div>\s*',
        '\n\n', content, flags=re.DOTALL
    )
    # Also catch any remaining solo comment markers
    content = re.sub(r'\s*<!--\s*PAGE\s*BREAK\s*-->\s*', '\n', content)
    # Also catch any remaining solo div markers
    content = re.sub(r'\s*<div[^>]*page-break[^>]*></div>\s*', '\n', content)
    
    # Insert ONE page break before Answer Key
    page_break_block = '\n\n<!-- PAGE BREAK -->\n<div style="page-break-after: always;"></div>\n\n'
    content = re.sub(r'(\n#+\s*Answer Key)', page_break_block + r'\1', content)
    
    after = content.count('PAGE BREAK')
    
    with open(f, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(content)
    
    folder = os.path.basename(os.path.dirname(f))
    print(f'{folder}/rat.md: {before} -> {after} breaks')
