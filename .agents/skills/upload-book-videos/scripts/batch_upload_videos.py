#!/usr/bin/env python3
"""Batch upload selected videos to YouTube with manual/explicit control."""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import re
from pathlib import Path
from typing import Any

import yaml

SCOPES = ["https://www.googleapis.com/auth/youtube"]


def load_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    with path.open("r", encoding="utf-8") as handle:
        try:
            return json.load(handle)
        except json.JSONDecodeError:
            return {}


def save_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2, ensure_ascii=False)
        handle.write("\n")


def title_from_stem(stem: str) -> str:
    words = re.sub(r"[-_]+", " ", stem).strip()
    return words[:1].upper() + words[1:] if words else "Untitled video"


def get_youtube_service(client_secrets: Path, token_path: Path):
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    creds = None
    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(str(client_secrets), SCOPES)
            creds = flow.run_local_server(port=0)
        token_path.parent.mkdir(parents=True, exist_ok=True)
        token_path.write_text(creds.to_json(), encoding="utf-8")
    return build("youtube", "v3", credentials=creds)


def ensure_playlist(youtube, title: str, state: dict[str, Any], privacy: str, dry_run: bool) -> str:
    playlists = state.setdefault("playlists", {})
    if title in playlists:
        return playlists[title]["playlist_id"]
    if dry_run:
        print(f"[dry-run] Would create playlist: {title}")
        return f"dry_run_playlist_{len(playlists) + 1}"

    request = youtube.playlists().insert(
        part="snippet,status",
        body={
            "snippet": {"title": title, "description": f"Videos for {title}"},
            "status": {"privacyStatus": privacy},
        },
    )
    response = request.execute()
    playlist_id = response["id"]
    playlists[title] = {"playlist_id": playlist_id}
    return playlist_id


def upload_video(youtube, video_path: Path, title: str, description: str, privacy: str, dry_run: bool) -> str:
    if dry_run:
        print(f"[dry-run] Would upload video: {title}")
        print(f"          source: {video_path}")
        print(f"          privacy: {privacy}")
        return f"dry_run_video_{video_path.stem[:12]}"

    from googleapiclient.http import MediaFileUpload

    mime_type = mimetypes.guess_type(video_path.name)[0] or "video/*"
    media = MediaFileUpload(str(video_path), mimetype=mime_type, chunksize=-1, resumable=True)
    body = {
        "snippet": {
            "title": title,
            "description": description or f"Video uploaded for textbook block embedding.",
            "categoryId": "27",
        },
        "status": {"privacyStatus": privacy},
    }
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)
    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"  Uploading {video_path.name}: {int(status.progress() * 100)}%")
    return response["id"]


def add_to_playlist(youtube, playlist_id: str, video_id: str, dry_run: bool) -> None:
    if dry_run:
        print(f"[dry-run] Would add video {video_id} to playlist {playlist_id}")
        return
    youtube.playlistItems().insert(
        part="snippet",
        body={
            "snippet": {
                "playlistId": playlist_id,
                "resourceId": {"kind": "youtube#video", "videoId": video_id},
            }
        },
    ).execute()


def load_batch_file(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        if path.suffix.lower() in {".yml", ".yaml"}:
            return yaml.safe_load(handle) or {}
        return json.load(handle) or {}


def main() -> None:
    parser = argparse.ArgumentParser(description="Upload selected videos to YouTube in a batch.")
    parser.add_argument("--videos", nargs="+", default=[], help="List of one or more video files to upload.")
    parser.add_argument("--batch-file", default="", help="Optional YAML/JSON batch configuration file.")
    parser.add_argument("--playlist", default="", help="Default playlist name to add videos to.")
    parser.add_argument("--privacy", default="unlisted", choices=["private", "unlisted", "public"])
    parser.add_argument("--state", default="data/uploaded_videos.json", help="Path to upload state json tracker.")
    parser.add_argument("--client-secrets", default="secrets/youtube_client_secret.json")
    parser.add_argument("--token", default="secrets/youtube_token.json")
    parser.add_argument("--dry-run", action="store_true", help="Preview planned batch actions only.")
    parser.add_argument("--allow-live-upload", action="store_true", help="Required safety guard to proceed with API writes.")
    args = parser.parse_args()

    if not args.dry_run and not args.allow_live_upload:
        raise SystemExit(
            "Upload aborted. You must use --dry-run first, and include --allow-live-upload to write files/playlists to YouTube."
        )

    # 1. Resolve video source list
    video_entries: list[dict[str, Any]] = []

    if args.batch_file:
        config_path = Path(args.batch_file).expanduser().resolve()
        if not config_path.exists():
            raise FileNotFoundError(f"Batch config file not found: {config_path}")
        batch_data = load_batch_file(config_path)
        global_playlist = batch_data.get("playlist", args.playlist)
        global_privacy = batch_data.get("privacy", args.privacy)

        for entry in batch_data.get("videos", []):
            path_str = entry.get("path")
            if not path_str:
                continue
            p = Path(path_str).expanduser()
            video_entries.append({
                "path": p,
                "title": entry.get("title") or title_from_stem(p.stem),
                "description": entry.get("description", ""),
                "playlist": entry.get("playlist") or global_playlist,
                "privacy": entry.get("privacy") or global_privacy,
                "label": entry.get("label") or p.stem,
            })
    else:
        # CLI direct paths
        for path_str in args.videos:
            p = Path(path_str).expanduser()
            video_entries.append({
                "path": p,
                "title": title_from_stem(p.stem),
                "description": f"Uploaded manual video: {p.name}",
                "playlist": args.playlist,
                "privacy": args.privacy,
                "label": p.stem,
            })

    if not video_entries:
        print("No videos specified. Please provide video paths with --videos or a --batch-file config.")
        return

    # 2. Setup YouTube API and loading states
    state_path = Path(args.state)
    state = load_json(state_path)
    youtube = None if args.dry_run else get_youtube_service(Path(args.client_secrets), Path(args.token))

    print(f"--- Batch upload execution (dry_run={args.dry_run}) ---")
    print(f"Total videos in queue: {len(video_entries)}\n")

    # 3. Process video upload loop
    for entry in video_entries:
        video_path = entry["path"].resolve()
        if not video_path.exists():
            raise FileNotFoundError(f"Source video not found: {video_path}")

        label = entry["label"]
        stored = state.get("videos", {}).get(label)
        if stored and stored.get("video_id"):
            print(f"Already uploaded: {entry['title']} -> YouTube ID: {stored['video_id']}")
            continue

        print(f"Uploading: {entry['title']}")
        print(f"  Source:  {video_path}")
        print(f"  Privacy: {entry['privacy']}")

        # Ensure playlist exists
        playlist_id = None
        if entry["playlist"]:
            playlist_id = ensure_playlist(youtube, entry["playlist"], state, entry["privacy"], args.dry_run)

        # Upload video
        video_id = upload_video(youtube, video_path, entry["title"], entry["description"], entry["privacy"], args.dry_run)
        print(f"  Uploaded -> ID: {video_id}")

        # Add to playlist
        if playlist_id:
            add_to_playlist(youtube, playlist_id, video_id, args.dry_run)
            print(f"  Added to playlist: {entry['playlist']}")

        # Track state
        if not args.dry_run:
            state.setdefault("videos", {})[label] = {
                "video_id": video_id,
                "title": entry["title"],
                "source_path": str(video_path),
                "url": f"https://youtu.be/{video_id}",
                "embed_url": f"https://www.youtube.com/embed/{video_id}",
                "playlist": entry["playlist"] or None,
                "privacy": entry["privacy"],
            }
            # Save step-by-step
            save_json(state_path, state)

        print()

    print("Batch processing complete.")


if __name__ == "__main__":
    main()
