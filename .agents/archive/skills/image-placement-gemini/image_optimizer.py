import os
import re
import sys
import argparse
import urllib.parse
import json

class ChapterImagePlacer:
    def __init__(self, mode, chapter, image_dir=None):
        self.mode = mode
        self.chapter_arg = chapter
        self.workspace_root = self.resolve_workspace_root()
        self.chapter_file = self.resolve_chapter_file()
        self.chapter_dir = os.path.dirname(self.chapter_file)
        self.chapter_num = self.extract_chapter_number()
        
        self.local_image_dir = image_dir if image_dir else self.resolve_local_image_dir()
        
        # Override map for exact, high-confidence mappings for Chapter 5
        self.explicit_map = {
            "bridge diagram could show database tables": "optimized/create_a_clean_textbook_figure_that_shows_sql_as_t.jpg",
            "left-to-right roadmap could match the six": "optimized/create_a_lefttoright_instructional_diagram_showi.jpg",
            "before-and-after visual could show a large grade": "create_a_clean_conceptual_diagram_explaining_that_.png",
            "layered application visual could place sql": "optimized/create_a_modular_educational_diagram_showing_how_s.jpg",
            "split diagram could contrast \"what i want\"": "optimized/create_a_twopanel_instructional_figure_showing_th.jpg",
            "annotated version of the business question": "optimized/create_a_detailed_instructional_figure_showing_the.jpg",
            "comparison graphic could show a hidden spreadsheet": "optimized/sql-pros.jpg",
            "toolbox diagram could introduce ddl": "optimized/create_a_splitpanel_textbook_diagram_comparing_dd.jpg",
            "three-panel platform comparison could show": "optimized/create_a_threepanel_comparison_figure_for_the_cou.jpg",
            "workflow comparison could show sqliteonline": "optimized/create_a_sidebyside_instructional_figure_showing.jpg",
            "supabase dashboard map could label the table": "supabase_dashboard_map.png",
            "portability path could show one sql": "optimized/create_a_stepbystep_instructional_diagram_showin.jpg",
            "two-table schema sketch could show": "optimized/create_a_clean_schema_overview_figure_for_the_chap.jpg",
            "table anatomy visual could highlight": "create_a_clean_teachingdataset_diagram_showing_th.png",
            "flat-table warning visual could show": "flat_table_warning_diagram.png",
            "grading-weight card visual could show": "grading_weight_cards.png",
            "question board could connect classroom": "ch05-sql-bridge-questions-to-answers.png",
            "structure-first workflow could show": "create-tables.png",
            "table blueprint could label table name": "create_a_clean_instructional_diagram_showing_inser.png",
            "annotated sql-to-table diagram could map": "gradebook_table_blueprint.png",
            "compact metadata-table diagram could show": "optimized/create_a_clean_schema_overview_figure_for_the_chap.jpg",
            "before-and-after table diagram could show": "alter_table_before_after.png",
            "column-value matching diagram could line up": "create_a_clean_instructional_diagram_showing_inser.png",
            "multi-row insertion flow could show six": "multi_row_insert_flow.png",
            "category-load visual could show the four": "calc-sql.png",
            "verification checklist could show": "optimized/SQL-review.jpg",
            "query-clause roadmap could show": "what-is-sql.png",
            "projection diagram could show a full": "create_a_clean_sql_select_concept_diagram_showing_.png",
            "duplicate-collapse visual could show": "distinct_duplicate_collapse.png",
            "filter funnel could show": "create_a_clean_where_filtering_diagram_showing_row.png",
            "missing-value visual could contrast zero": "create_a_clean_nullhandling_diagram_showing_why_n.png",
            "logic-gate diagram could show": "create_a_clean_logicoperator_and_filteringoption.png",
            "three-card operator visual could show": "pattern_matching_operators.png",
            "ordering visual could show the same": "create_a_clean_order_by_and_alias_diagram_showing_.png",
            "before-and-after output grid could show": "create_a_clean_order_by_and_alias_diagram_showing_.png",
            "stacked query-building visual could add": "create_a_clean_stepbystep_querybuilding_diagram.png",
            "two-table join overview could place": "create_a_clean_fourquestion_joinplanning_diagram.png",
            "context-reconstruction visual could show": "join_logic.png",
            "four-question join checklist could label": "create_a_clean_fourquestion_joinplanning_diagram.png",
            "matched-rows diagram could connect": "Joins.png",
            "preserved-left-table visual could show": "Joins.png",
            "join-type comparison chart could show": "Joins.png",
            "rows-to-summary visual could show many": "create_a_clean_aggregation_diagram_showing_individ.png",
            "reporting pyramid could show raw rows": "optimized/create_a_processflow_diagram_showing_the_sql_aggr.jpg",
            "function-card visual could give": "calc-sql.png",
            "bucket diagram could sort grade rows": "create_a_clean_group_by_and_having_pipeline_diagra.png",
            "two-stage filter diagram could show": "create_a_clean_group_by_and_having_pipeline_diagra.png",
            "dashboard tile mockup could show": "create_a_clean_calculatedresults_diagram_showing_.png",
            "calculated-output visual could show": "create_a_clean_calculatedresults_diagram_showing_.png",
            "formula flow could show": "calc-sql.png",
            "platform comparison strip could show": "sql_date_platform_comparison.png",
            "threshold ladder could map scores": "create_a_clean_calculatedresults_diagram_showing_.png",
            "complete-summary pipeline could show": "create_a_clean_calculatedresults_diagram_showing_.png",
            "forward-path map could show": "optimized/create_a_lefttoright_instructional_diagram_showi.jpg",
            "appendix practice map could connect": "optimized/SQL-review.jpg",
            "side-by-side insert comparison could show": "create-tables.png",
            "three-platform expression card could show": "create_a_clean_calculatedresults_diagram_showing_.png",
            "missing-work detector visual could show": "join_logic.png",
            "concept map could cluster the terms": "optimized/NotebookLM Mind Map.png",
            "chapter arc visual could show the progression": "optimized/ch05-summary.jpg"
        }

    def resolve_workspace_root(self):
        current = os.path.abspath(os.getcwd())
        while True:
            if os.path.exists(os.path.join(current, ".images")) or os.path.exists(os.path.join(current, "BITM330-Book-draft")):
                return current
            parent = os.path.dirname(current)
            if parent == current:
                return os.path.abspath(os.getcwd())
            current = parent

    def resolve_chapter_file(self):
        if os.path.isfile(self.chapter_arg):
            return os.path.abspath(self.chapter_arg)
        
        ch_pattern = re.compile(r'^ch0?(\d+)', re.IGNORECASE)
        match = ch_pattern.match(self.chapter_arg)
        if match:
            ch_num = int(match.group(1))
            ch_str = f"ch{ch_num:02d}"
        else:
            ch_str = self.chapter_arg.lower()
            
        draft_dir = os.path.join(self.workspace_root, "BITM330-Book-draft", "chapter-drafts")
        candidates = []
        for root, dirs, files in os.walk(draft_dir):
            if "main" in root.split(os.sep):
                for f in files:
                    if f.endswith(".md") and ch_str in f.lower() and "-main-" in f.lower():
                        candidates.append(os.path.join(root, f))
                        
        if not candidates:
            raise FileNotFoundError(f"Could not find main chapter file for '{self.chapter_arg}'")
        
        candidates.sort(key=os.path.getmtime, reverse=True)
        return candidates[0]

    def extract_chapter_number(self):
        basename = os.path.basename(self.chapter_file)
        match = re.search(r'ch0?(\d+)', basename, re.IGNORECASE)
        if match:
            return int(match.group(1))
        return 0

    def resolve_local_image_dir(self):
        images_root = os.path.join(self.workspace_root, ".images")
        
        # Find directory matching chapter number
        for name in os.listdir(images_root):
            path = os.path.join(images_root, name)
            if os.path.isdir(path):
                m = re.match(r'^(?:ch|Ch)0?(\d+)', name)
                if m and int(m.group(1)) == self.chapter_num:
                    return path
                    
        path = os.path.join(images_root, f"Ch{self.chapter_num:02d}")
        os.makedirs(path, exist_ok=True)
        return path

    def find_matching_file(self, suggestion_text):
        suggestion_clean = suggestion_text.lower().strip()
        
        # 1. Try explicit override map
        for key, val in self.explicit_map.items():
            if key in suggestion_clean:
                target_path = os.path.join(self.local_image_dir, val)
                if os.path.exists(target_path):
                    return val
                
        # 2. Try generic token-based keyword intersection
        stop_words = {"a", "an", "the", "could", "show", "diagram", "visual", "of", "and", "to", "in", "list", "table", "figure", "suggestion"}
        suggestion_tokens = set(re.findall(r'\b\w+\b', suggestion_clean)) - stop_words
        
        best_match = None
        best_intersection = 0
        
        # Helper to scan folder recursively
        all_files = []
        for root, dirs, files in os.walk(self.local_image_dir):
            # exclude used folders to avoid self-reference loops
            if "-used" in root:
                continue
            for f in files:
                if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                    rel_to_img_dir = os.path.relpath(os.path.join(root, f), self.local_image_dir)
                    all_files.append((f, rel_to_img_dir))
                    
        for filename, rel_path in all_files:
            file_clean = filename.lower().replace("-", " ").replace("_", " ")
            file_tokens = set(re.findall(r'\b\w+\b', file_clean))
            
            intersection = suggestion_tokens.intersection(file_tokens)
            if len(intersection) > best_intersection and len(intersection) >= 2:
                best_intersection = len(intersection)
                best_match = rel_path
                
        return best_match

    def scan_suggestions(self):
        with open(self.chapter_file, "r", encoding="utf-8") as f:
            content = f.read()
            
        lines = content.splitlines()
        suggestions = []
        
        in_code_block = False
        in_comment = False
        
        for idx, line in enumerate(lines):
            line_stripped = line.strip()
            if line_stripped.startswith("```"):
                in_code_block = not in_code_block
                continue
            if line_stripped.startswith("<!--"):
                if not line_stripped.endswith("-->"):
                    in_comment = True
                continue
            if in_comment and line_stripped.endswith("-->"):
                in_comment = False
                continue
                
            if in_code_block or in_comment:
                continue
                
            # Scan for: *Figure suggestion: description*
            m = re.match(r'^\*Figure suggestion:\s*(.*?)\*$', line_stripped, re.IGNORECASE)
            if m:
                desc = m.group(1)
                suggestions.append({
                    "line": idx + 1,
                    "raw": line,
                    "description": desc
                })
                
        return suggestions

    def execute_placement(self):
        print(f"Chapter File: {self.chapter_file}")
        print(f"Chapter Image Directory: {self.local_image_dir}")
        
        suggestions = self.scan_suggestions()
        print(f"Found {len(suggestions)} figure suggestions.")
        
        # Mappings list
        placements = []
        missing_count = 0
        
        for sug in suggestions:
            match_file = self.find_matching_file(sug["description"])
            
            if match_file:
                # Resolve relative path for markdown link
                # Local relative path from chapter_dir to the image file
                # G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch05-sql\main\
                # is 4 levels deep relative to BITM330-book-drive
                # We need standard 4 levels relative path:
                # ../../../../.images/{folder_name}/{match_file}
                folder_name = os.path.basename(self.local_image_dir)
                rel_url = f"../../../../.images/{folder_name}/{match_file.replace(os.sep, '/')}"
                
                placements.append({
                    "line": sug["line"],
                    "raw": sug["raw"],
                    "description": sug["description"],
                    "matched": True,
                    "file_path": rel_url,
                    "caption": f"Figure 5.{len(placements)+1}: {sug['description']}"
                })
            else:
                missing_count += 1
                placements.append({
                    "line": sug["line"],
                    "raw": sug["raw"],
                    "description": sug["description"],
                    "matched": False,
                    "file_path": "",
                    "caption": ""
                })

        # Dry-run proposed mappings table
        print("\n=== Proposed Image Mappings ===")
        print(f"{'Line':<5} | {'Matched?':<8} | {'File / Suggestion':<75}")
        print("-" * 95)
        for p in placements:
            status = "Yes" if p["matched"] else "No"
            detail = p["file_path"] if p["matched"] else f"[MISSING] Suggestions: {p['description'][:60]}"
            print(f"{p['line']:<5} | {status:<8} | {detail:<75}")
            
        if missing_count > 0:
            print(f"\nMissing Figures: {missing_count} suggestions require generation.")
            print("Recommended prompt generation list:")
            for p in placements:
                if not p["matched"]:
                    print(f"  - Line {p['line']}: Generate a clean textbook diagram showing: '{p['description']}'")
                    
        if self.mode == "dry-run":
            print("\nDry-run complete. No changes made.")
            return

        if self.mode == "rewrite":
            # Read and replace in-place
            with open(self.chapter_file, "r", encoding="utf-8") as f:
                lines = f.read().splitlines()
                
            # Process in reverse order to maintain correct line indexing
            replacements_made = 0
            sorted_placements = sorted(placements, key=lambda x: x["line"], reverse=True)
            
            for p in sorted_placements:
                if not p["matched"]:
                    # Skip missing suggestions so they can be generated first
                    continue
                    
                line_idx = p["line"] - 1
                
                # Image markdown block
                img_block = f"![{os.path.basename(p['file_path'])}]({p['file_path']})"
                
                # Format Caption
                caption_text = f"*{p['caption']}*"
                
                # Replace in-place
                lines[line_idx] = img_block
                
                # Check for existing caption on subsequent line to prevent duplicates (idempotency)
                has_subsequent_caption = False
                next_idx = line_idx + 1
                while next_idx < len(lines):
                    nxt = lines[next_idx].strip()
                    if nxt:
                        if (nxt.startswith("*") and nxt.endswith("*")) or (nxt.startswith("_") and nxt.endswith("_")):
                            has_subsequent_caption = True
                            lines[next_idx] = caption_text
                        break
                    next_idx += 1
                    
                if not has_subsequent_caption:
                    lines.insert(line_idx + 1, "")
                    lines.insert(line_idx + 2, caption_text)
                    
                replacements_made += 1
                
            if replacements_made > 0:
                with open(self.chapter_file, "w", encoding="utf-8") as f:
                    f.write("\n".join(lines) + "\n")
                print(f"\nSuccess: Rewrote chapter markdown file. Placed {replacements_made} images.")
            else:
                print("\nNo replacements were made.")

def main():
    parser = argparse.ArgumentParser(description="BITM330 Chapter Local Image Placer CLI")
    parser.add_argument("--mode", choices=["dry-run", "rewrite"], required=True, help="Execution mode")
    parser.add_argument("--chapter", required=True, help="Chapter code (e.g. ch05) or main file path")
    parser.add_argument("--image-dir", default=None, help="Chapter image directory override")
    
    args = parser.parse_args()
    
    placer = ChapterImagePlacer(
        mode=args.mode,
        chapter=args.chapter,
        image_dir=args.image_dir
    )
    
    placer.execute_placement()

if __name__ == "__main__":
    main()
