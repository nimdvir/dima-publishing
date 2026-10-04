#!/usr/bin/env python3
"""Insert a YouTube embed into a Markdown file."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


def embed_html(video_id: str, title: str) -> str:
    return (
        '<div class="video-wrapper">\n'
        f'  <iframe src="https://www.youtube.com/embed/{video_id}" '
        f'title="{title}" '
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" '
        "allowfullscreen></iframe>\n"
        "</div>"
    )


def insert_embed(content: str, marker: str, block: str) -> str:
    """Insert or replace a block at the marker location."""
    pattern = re.compile(
        re.escape(marker) + r"\n(?:<div class=\"video-wrapper\">.*?</div>\n?)?", re.DOTALL
    )
    replacement = f"{marker}\n{block}\n"
    if marker in content:
        return pattern.sub(replacement, content)
    # Append at end if marker not found
    return content.rstrip() + f"\n\n{replacement}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Insert a YouTube embed into a Markdown file.")
    parser.add_argument("--file", required=True, help="Target Markdown file.")
    parser.add_argument("--video-id", required=True, help="YouTube video ID.")
    parser.add_argument("--title", required=True, help="Video title for iframe title attribute.")
    parser.add_argument("--marker", default="", help="HTML comment marker to insert at/after. Default: auto-generate from video-id.")
    parser.add_argument("--dry-run", action="store_true", help="Preview only, do not write.")
    args = parser.parse_args()

    target = Path(args.file).expanduser().resolve()
    if not target.exists():
        raise FileNotFoundError(f"Target file not found: {target}")

    marker = args.marker or f"<!-- VIDEO:{args.video_id} -->"
    content = target.read_text(encoding="utf-8")
    block = embed_html(args.video_id, args.title)
    updated = insert_embed(content, marker, block)

    if updated == content:
        print("No changes needed.")
        return

    if args.dry_run:
        print(f"[dry-run] would update: {target}")
        print(f"  marker: {marker}")
        print(f"  video:  {args.title} ({args.video_id})")
        return

    target.write_text(updated, encoding="utf-8")
    print(f"Updated: {target}")


if __name__ == "__main__":
    main()
