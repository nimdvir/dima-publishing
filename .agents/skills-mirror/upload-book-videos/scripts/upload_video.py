#!/usr/bin/env python3
"""Upload a video to YouTube and record its ID."""

from __future__ import annotations

import argparse
import json
import mimetypes
from pathlib import Path
from typing import Any

SCOPES = ["https://www.googleapis.com/auth/youtube"]


def load_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def save_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2, ensure_ascii=False)
        handle.write("\n")


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


def upload_video(youtube, video_path: Path, title: str, description: str, privacy: str, dry_run: bool) -> str:
    if dry_run:
        print(f"[dry-run] would upload: {video_path.name}")
        print(f"          title: {title}")
        print(f"          privacy: {privacy}")
        return f"dry_run_{video_path.stem[:20]}"

    from googleapiclient.http import MediaFileUpload

    mime_type = mimetypes.guess_type(video_path.name)[0] or "video/*"
    media = MediaFileUpload(str(video_path), mimetype=mime_type, chunksize=-1, resumable=True)
    body = {
        "snippet": {
            "title": title,
            "description": description,
            "categoryId": "27",
        },
        "status": {"privacyStatus": privacy},
    }
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)
    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"  Uploaded {int(status.progress() * 100)}%")
    return response["id"]


def add_to_playlist(youtube, playlist_title: str, playlist_id: str | None, video_id: str, dry_run: bool) -> str:
    if dry_run:
        print(f"[dry-run] would add to playlist: {playlist_title}")
        return f"dry_run_playlist_{playlist_title[:20]}"

    if not playlist_id:
        request = youtube.playlists().insert(
            part="snippet,status",
            body={
                "snippet": {"title": playlist_title},
                "status": {"privacyStatus": "unlisted"},
            },
        )
        response = request.execute()
        playlist_id = response["id"]
        print(f"  Created playlist: {playlist_title} ({playlist_id})")

    youtube.playlistItems().insert(
        part="snippet",
        body={
            "snippet": {
                "playlistId": playlist_id,
                "resourceId": {"kind": "youtube#video", "videoId": video_id},
            }
        },
    ).execute()
    return playlist_id


def main() -> None:
    parser = argparse.ArgumentParser(description="Upload a video to YouTube.")
    parser.add_argument("--video", required=True, help="Path to the video file to upload.")
    parser.add_argument("--title", required=True, help="YouTube video title.")
    parser.add_argument("--description", default="", help="YouTube video description.")
    parser.add_argument("--playlist", default="", help="YouTube playlist name (created if new).")
    parser.add_argument("--privacy", default="unlisted", choices=["private", "unlisted", "public"])
    parser.add_argument("--state", default="data/uploaded_videos.json", help="Path to upload state file.")
    parser.add_argument("--label", default="", help="Short label/key for this video in the state file.")
    parser.add_argument("--client-secrets", default="secrets/youtube_client_secret.json")
    parser.add_argument("--token", default="secrets/youtube_token.json")
    parser.add_argument("--dry-run", action="store_true", help="Preview only, no upload.")
    parser.add_argument("--allow-live-upload", action="store_true", help="Required for real uploads.")
    args = parser.parse_args()

    video_path = Path(args.video).expanduser().resolve()
    if not video_path.exists():
        raise FileNotFoundError(f"Video not found: {video_path}")

    if not args.dry_run and not args.allow_live_upload:
        raise SystemExit("Use --dry-run first. Add --allow-live-upload when ready for real upload.")

    label = args.label or video_path.stem
    state_path = Path(args.state)
    state = load_json(state_path)

    youtube = None if args.dry_run else get_youtube_service(Path(args.client_secrets), Path(args.token))

    print(f"Video: {video_path.name}")
    print(f"Title: {args.title}")
    print(f"Privacy: {args.privacy}")

    video_id = upload_video(youtube, video_path, args.title, args.description, args.privacy, args.dry_run)
    print(f"YouTube ID: {video_id}")
    print(f"Watch URL: https://youtu.be/{video_id}")
    print(f"Embed URL: https://www.youtube.com/embed/{video_id}")

    if args.playlist:
        playlists = state.get("playlists", {})
        existing = playlists.get(args.playlist, {})
        playlist_id = existing.get("playlist_id") if existing else None
        playlist_id = add_to_playlist(youtube, args.playlist, playlist_id, video_id, args.dry_run)
        if not args.dry_run:
            playlists[args.playlist] = {"playlist_id": playlist_id}
            state["playlists"] = playlists

    if not args.dry_run:
        state.setdefault("videos", {})[label] = {
            "video_id": video_id,
            "title": args.title,
            "source_path": str(video_path),
            "url": f"https://youtu.be/{video_id}",
            "embed_url": f"https://www.youtube.com/embed/{video_id}",
            "playlist": args.playlist or None,
            "privacy": args.privacy,
        }
        save_json(state_path, state)
        print(f"State saved to: {state_path}")


if __name__ == "__main__":
    main()
