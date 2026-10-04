#!/usr/bin/env python3
"""Generate SRT subtitles and short summaries for local videos using Gemini.

For each input video this script:
  1. Uploads the file to the Gemini File API.
  2. Waits for processing to finish.
  3. Generates a SubRip (.srt) transcript saved next to the video.
  4. Generates a short YouTube-style summary saved as a .md file next to the video.

Requires the GEMINI_API_KEY environment variable and the google-genai package.

Examples
--------
  python generate_video_assets.py --videos "C:/path/a.mp4" "C:/path/b.mp4"
  python generate_video_assets.py --batch-file books/database-book/data/ch07_videos_batch.yml
  python generate_video_assets.py --videos "a.mp4" --force
"""

from __future__ import annotations

import argparse
import os
import sys
import time
from pathlib import Path

MODEL = "gemini-3.5-flash"
SRT_PROMPT = (
    "Transcribe the audio of this video and output ONLY a valid SubRip (.srt) "
    "file: numbered cues with HH:MM:SS,mmm --> HH:MM:SS,mmm timestamps and text. "
    "Do not include markdown code fences or any commentary."
)
SUMMARY_PROMPT = (
    "Write a short, 2-3 sentence summary of this video suitable for a YouTube "
    "description. Use plain, student-friendly language. Output ONLY the summary."
)


def strip_code_fence(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return text


def collect_videos(args) -> list[Path]:
    paths: list[Path] = []
    if args.batch_file:
        import yaml  # local import so pure --videos runs need no yaml

        data = yaml.safe_load(Path(args.batch_file).read_text(encoding="utf-8")) or {}
        for entry in data.get("videos", []):
            if entry.get("path"):
                paths.append(Path(entry["path"]))
    for p in args.videos:
        paths.append(Path(p))
    return paths


def wait_for_active(client, video_file):
    while True:
        video_file = client.files.get(name=video_file.name)
        state = str(video_file.state)
        if "PROCESSING" in state:
            time.sleep(5)
        elif "ACTIVE" in state:
            return video_file
        else:  # FAILED or unknown
            return video_file


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate SRT + summary assets for videos via Gemini.")
    parser.add_argument("--videos", nargs="*", default=[], help="One or more video file paths.")
    parser.add_argument("--batch-file", default="", help="YAML batch file with a 'videos' list of {path}.")
    parser.add_argument("--model", default=MODEL, help="Gemini model to use.")
    parser.add_argument("--force", action="store_true", help="Regenerate even if .srt/.md already exist.")
    args = parser.parse_args()

    if not os.environ.get("GEMINI_API_KEY"):
        print("Error: GEMINI_API_KEY environment variable is not set.")
        sys.exit(1)

    videos = collect_videos(args)
    if not videos:
        print("No videos provided. Use --videos or --batch-file.")
        sys.exit(1)

    from google import genai

    client = genai.Client()

    for video_path in videos:
        if not video_path.exists():
            print(f"File not found, skipping: {video_path}")
            continue

        srt_path = video_path.with_suffix(".srt")
        summary_path = video_path.with_suffix(".md")
        if not args.force and srt_path.exists() and summary_path.exists():
            print(f"Assets exist, skipping: {video_path.name}")
            continue

        print(f"Uploading {video_path.name} to Gemini...")
        video_file = client.files.upload(file=str(video_path))

        print("Waiting for video processing...")
        video_file = wait_for_active(client, video_file)
        if "FAILED" in str(video_file.state):
            print(f"Processing failed, skipping: {video_path.name}")
            continue

        print("Generating SRT subtitles...")
        srt_resp = client.models.generate_content(
            model=args.model, contents=[video_file, SRT_PROMPT]
        )
        srt_path.write_text(strip_code_fence(srt_resp.text), encoding="utf-8")

        print("Generating summary...")
        sum_resp = client.models.generate_content(
            model=args.model, contents=[video_file, SUMMARY_PROMPT]
        )
        summary_path.write_text(sum_resp.text.strip(), encoding="utf-8")

        print(f"Completed: {video_path.name}\n")

    print("Asset generation complete.")


if __name__ == "__main__":
    main()
