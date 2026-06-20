"""Add page breaks to chapters with zero or too few breaks."""
import os
import re
from pathlib import Path

repo = Path(__file__).resolve().parents[3] / 'files' / 'source' / 'chapters'
PB = '\n\n<!-- PAGE BREAK -->\n<div style="page-break-after: always;"></div>\n\n'

chapters = [
    ('ch01', 'ch01-introduction-to-course/ch01-main-2026-06-17.md', True),
    ('ch02', 'ch02-mis-and-bitm/ch02-main-2026-06-17.md', True),
    ('ch14', 'ch14-powerbi/core-concepts.md', False),
    ('ch15', 'ch15-business-strategy-is/core-concepts.md', False),
    ('ch16', 'ch16-final-review/core-concepts.md', False),
    ('ch17', 'ch17-conclusion/core-concepts.md', False),
]

for ch_id, rel_path, is_dated in chapters:
    full_path = repo / rel_path
    if not full_path.exists():
        print(f'{ch_id}: NOT FOUND')
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    before = content.count('PAGE BREAK')
    lines = content.split('\n')
    new_lines = []
    in_core = not is_dated
    h2_since_break = 0
    break_interval = 3
    
    for line in lines:
        stripped = line.strip()
        
        if is_dated and not in_core:
            if re.match(r'^#\s*Core\s*Concept', stripped, re.I):
                in_core = True
        
        if re.search(r'PAGE\s*BREAK|page-break', stripped, re.I) and in_core:
            h2_since_break = 0
            new_lines.append(line)
            continue
        
        is_h2 = bool(re.match(r'^##\s+\S', stripped))
        is_skip = bool(re.match(r'^##\s*(Learning\s*Objectives|Chapter\s*Roadmap)', stripped, re.I))
        
        if is_h2 and in_core and not is_skip:
            h2_since_break += 1
            if h2_since_break >= break_interval:
                new_lines.append(PB.rstrip('\n'))
                h2_since_break = 0
        
        new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
    after = new_content.count('PAGE BREAK')
    
    with open(full_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(new_content)
    
    print(f'{ch_id}: {before} -> {after} page breaks')

print('Done.')
