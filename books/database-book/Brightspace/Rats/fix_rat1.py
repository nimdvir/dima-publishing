import os
import re
import csv
import random

random.seed(43) # Different seed just to shuffle differently

md_path = r'C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\Brightspace\Rats\rat1_top_questions.md'

correct_texts = {
    1: ['Duplicate records', 'Inconsistent reports', 'Missing information', 'Confusing dashboards'],
    2: ['Performance-oriented analysis', 'Data integrity and system quality', 'Foundational information literacy', 'Strategic problem solving'],
    3: ['The source-table redesign, because trustworthy analytics depend on structured, reliable data'],
    4: ["The report's metrics may be inflated or fragmented because the database cannot reliably link records to a single customer"],
    5: ['Analyst B, because systems thinking traces problems through the data-to-decisions arc'],
    6: ['Structure and retrieval, because the same patient cannot be reliably linked across tables'],
    7: ['The sequence is cumulative; trustworthy analytics cannot be built from messy data definitions'],
    8: ['Queries feeding analytics'],
    9: ['Write the business question in plain English before writing the query'],
    10: ['Because sales, inventory, suppliers, and menu items are tracked separately with inconsistent names']
}

with open(md_path, 'r', encoding='utf-8') as f:
    content = f.read()

header_match = re.split(r'\*\*\d+\.\s+', content)
header = header_match[0]
questions = header_match[1:]

csv_rows = []
new_md_lines = [header.strip(), '']

for idx, q_block in enumerate(questions):
    question_num = idx + 1
    lines = q_block.strip().split('\n')
    
    q_text_match = re.match(r'(.*?)\*\*', lines[0])
    if not q_text_match:
        continue
        
    short_title = q_text_match.group(1).strip()
    
    # Next line is the question text
    q_text = lines[1].strip()
    is_ms = 'Select ALL that apply' in q_text
    
    options = []
    feedback = ''
    
    for line in lines[2:]:
        line = line.strip()
        if line.startswith('**Explanation:**'):
            feedback = line.replace('**Explanation:**', '').strip()
            break
        elif line.startswith('[ ]') or line.startswith('[x]'):
            text = line[3:].strip()
            # Determine if correct based on dictionary
            is_correct = any(c in text for c in correct_texts[question_num])
            options.append({'text': text, 'is_correct': is_correct})
            
    random.shuffle(options)
    
    new_md_lines.append(f'**{question_num}. {short_title}**')
    new_md_lines.append(q_text)
    new_md_lines.append('')
    
    for opt in options:
        mark = '[x]' if opt['is_correct'] else '[ ]'
        new_md_lines.append(f'{mark} {opt["text"]}')
        
    new_md_lines.append('')
    new_md_lines.append(f'**Explanation:** {feedback}')
    new_md_lines.append('')
    
    if is_ms:
        csv_rows.append(['NewQuestion', 'MS', '', '', ''])
        csv_rows.append(['Title', short_title, '', '', ''])
        csv_rows.append(['QuestionText', q_text, '', '', ''])
        csv_rows.append(['Points', '1', '', '', ''])
        csv_rows.append(['Scoring', 'RightAnswers', '', '', ''])
        for opt in options:
            is_correct_val = '1' if opt['is_correct'] else '0'
            csv_rows.append(['Option', is_correct_val, opt['text'], '', ''])
        csv_rows.append(['Feedback', feedback, '', '', ''])
    else:
        csv_rows.append(['NewQuestion', 'MC', '', '', ''])
        csv_rows.append(['Title', short_title, '', '', ''])
        csv_rows.append(['QuestionText', q_text, '', '', ''])
        csv_rows.append(['Points', '1', '', '', ''])
        for opt in options:
            is_correct_val = '100' if opt['is_correct'] else '0'
            csv_rows.append(['Option', is_correct_val, opt['text'], '', ''])
        csv_rows.append(['Feedback', feedback, '', '', ''])
        
    csv_rows.append(['', '', '', '', ''])

with open(md_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_md_lines))
    
out_path = md_path.replace('.md', '.csv')
with open(out_path, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerows(csv_rows)
print('Fixed rat1_top_questions')
