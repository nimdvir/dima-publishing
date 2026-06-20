"""Fix zero page-break chapters: add PAGE BREAK before major H2 boundaries in Core Concepts."""
import re, os

repo = r'c:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source\chapters'

PAGE_BREAK_BLOCK = '\n\n<!-- PAGE BREAK -->\n<div style="page-break-after: always;"></div>\n\n'

def add_page_breaks(content, is_dated_fallback=False):
    """Add page breaks before H2 headings in Core Concepts section."""
    lines = content.split('\n')
    new_lines = []
    in_core = False
    first_break_seen = False
    h2_count = 0
    
    for i, line in enumerate(lines):
        new_lines.append(line)
        
        # Detect entry into Core Concepts
        if re.match(r'^#\s*Core\s*Concept', line, re.I):
            in_core = True
            continue
        
        if not in_core:
            continue
        
        # Detect first page break
        if re.search(r'PAGE\s*BREAK|page-break', line, re.I):
            first_break_seen = True
            continue
        
        # After first break, add breaks before H2s (skip if too close to previous break)
        if re.match(r'^##\s+\S', line):
            h2_count += 1
            # Add page break before this H2 (but not if it's Learning Objectives or Chapter Roadmap)
            heading_text = line.strip()
            if not re.match(r'^##\s*(Learning\s*Objectives|Chapter\s*Roadmap)', heading_text, re.I):
                # Insert page break before this line
                new_lines.insert(-1, PAGE_BREAK_BLOCK.rstrip('\n'))
    
    return '\n'.join(new_lines)


# Process chapters with 0 page breaks
zero_break_chapters = {
    'ch01': 'ch01-introduction-to-course/ch01-main-2026-06-17.md',  # dated-fallback
    'ch14': 'ch14-powerbi/core-concepts.md',
    'ch15': 'ch15-business-strategy-is/core-concepts.md',
    'ch16': 'ch16-final-review/core-concepts.md',
    'ch17': 'ch17-conclusion/core-concepts.md',
}

for ch_id, rel_path in zero_break_chapters.items():
    full_path = os.path.join(repo, rel_path)
    if not os.path.exists(full_path):
        print(f'{ch_id}: FILE NOT FOUND - {full_path}')
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    before = content.count('PAGE BREAK')
    
    # For dated-fallback (ch01), the Core Concepts starts after first page break
    # For stable (ch14-17), the whole file is Core Concepts
    is_dated = (ch_id == 'ch01')
    
    content = add_page_breaks(content, is_dated)
    
    after = content.count('PAGE BREAK')
    
    with open(full_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)
    
    print(f'{ch_id} ({os.path.basename(rel_path)}): {before} -> {after} page breaks')
