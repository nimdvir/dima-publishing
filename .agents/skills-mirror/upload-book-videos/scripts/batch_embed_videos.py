#!/usr/bin/env python3
"""Batch embed uploaded videos into chapter Markdown files using label mapping."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any

import yaml


def load_yaml_or_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        if path.suffix.lower() in {".yml", ".yaml"}:
            return yaml.safe_load(handle) or {}
        return json.load(handle) or {}


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
    parser = argparse.ArgumentParser(description="Embed uploaded YouTube videos in Markdown chapters.")
    parser.add_argument("--state", default="data/uploaded_videos.json", help="Path to uploaded state json file.")
    parser.add_argument("--batch-file", required=True, help="Path to batch config mapping file (YAML or JSON).")
    parser.add_argument("--book-root", default=".", help="Root directory of the book repository.")
    parser.add_argument("--dry-run", action="store_true", help="Preview only, do not write changes.")
    args = parser.parse_args()

    state_path = Path(args.state)
    if not state_path.exists():
        raise FileNotFoundError(f"State file not found: {state_path}. Please run upload_video or batch_upload_videos first.")

    batch_path = Path(args.batch_file)
    if not batch_path.exists():
        raise FileNotFoundError(f"Batch config mapping file not found: {batch_path}")

    state_data = load_yaml_or_json(state_path)
    state_videos = state_data.get("videos", {})

    batch_data = load_yaml_or_json(batch_path)
    embed_requests = batch_data.get("embeds", [])

    if not embed_requests:
        # Check if they put 'videos' array with 'embed_target' in the upload config file
        embed_requests = []
        for entry in batch_data.get("videos", []):
            if entry.get("embed_target"):
                embed_requests.append({
                    "label": entry.get("label") or Path(entry["path"]).stem,
                    "file": entry["embed_target"],
                    "marker": entry.get("embed_marker", "")
                })

    if not embed_requests:
        print("No embed mappings found in the batch file.")
        return

    book_root = Path(args.book_root).resolve()
    changed_count = 0

    print(f"--- Batch embed execution (dry_run={args.dry_run}) ---")

    for req in embed_requests:
        label = req.get("label")
        target_relative = req.get("file")
        if not label or not target_relative:
            continue

        # Look up uploaded metadata
        uploaded = state_videos.get(label)
        if not uploaded:
            print(f"Skipping '{label}': No upload state record. Run upload first.")
            continue

        video_id = uploaded.get("video_id")
        if not video_id:
            print(f"Skipping '{label}': Record has no video_id.")
            continue

        target_file = book_root / target_relative
        if not target_file.exists():
            print(f"Skipping '{label}': Target file does not exist at {target_file}")
            continue

        content = target_file.read_text(encoding="utf-8")
        marker = req.get("marker") or f"<!-- VIDEO:{label} -->"
        block = embed_html(video_id, uploaded.get("title", label))
        updated = insert_embed(content, marker, block)

        if updated == content:
            print(f"Up to date: '{label}' in {target_relative}")
            continue

        if args.dry_run:
            print(f"[dry-run] Would update: '{label}' in {target_relative}")
            print(f"          marker: {marker}")
            print(f"          video:  {uploaded.get('title')} ({video_id})")
        else:
            target_file.write_text(updated, encoding="utf-8")
            print(f"Embedded:  '{label}' -> {target_relative}")

        changed_count += 1

    summary = "Would update" if args.dry_run else "Updated"
    print(f"\nBatch embedding complete. {summary} {changed_count} files.")


if __name__ == "__main__":
    main()
