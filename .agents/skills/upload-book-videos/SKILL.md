---
name: upload-book-videos
description: Batch upload selected video files to YouTube and embed them in chapter Markdown folders using simple YAML/JSON mapping files under manual point-and-batch control.
argument-hint: "--batch-file data/video_batch.yml --dry-run"
metadata:
  author: dima-publishing
  version: "0.3.0"
---

# Upload Book Videos

## Purpose

Batch-upload selected video files to YouTube and embed them into your chapter Markdown index/main files using direct, manual control mapping files.

## Important Constraints

- Proceed, but dry-run only for initial passes.
- Manual local scripts only.
- No real YouTube uploads without adding the mandatory `--allow-live-upload` flag.
- No GitHub Actions execution.
- Do not commit OAuth secrets, tokens, or credentials.

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/batch_upload_videos.py` | Upload multiple specified videos in a batch, saving IDs to state |
| `scripts/batch_embed_videos.py` | Insert corresponding responsive embeds into Markdown chapters |

## Configuration Contract

Create a file (for example `data/video_batch.yml`) with this structure:

```yaml
playlist: "BITM330 - Course Videos"  # Playlist to add videos to
privacy: unlisted                     # default privacy status

videos:
  - path: "G:/My Drive/.../video1.mp4"
    title: "Chapter 1: Overview"
    description: "Overview video for the first chapter."
    label: "ch01-overview"
    embed_target: "books/database-book/files/source/chapters/ch01/index.md"

  - path: "G:/My Drive/.../video2.mp4"
    title: "Chapter 2: Overview"
    description: "Main concepts of chapter 2."
    label: "ch02-overview"
    embed_target: "books/database-book/files/source/chapters/ch02/index.md"
    embed_marker: "<!-- VIDEO:ch02-special -->"  # Optional marker override
```

## Workflow

1. Document the video paths you want to upload in a configuration file (like `data/video_batch.yml`).
2. Run `batch_upload_videos.py --dry-run` to preview the uploaded queue and playlist placements.
3. Run `batch_upload_videos.py --allow-live-upload` to upload to the YouTube API.
4. Review the generated `data/uploaded_videos.json` state map.
5. Run `batch_embed_videos.py --dry-run` to verify embed updates.
6. Run `batch_embed_videos.py` to write the responsive iframe wrappers into chapter Markdown files.

## Commands

### Batch Upload (Dry-Run Preview)

```bash
python .agents/skills/upload-book-videos/scripts/batch_upload_videos.py \
  --batch-file data/video_batch.yml \
  --dry-run
```

### Batch Upload (Actual Live Upload)

```bash
python .agents/skills/upload-book-videos/scripts/batch_upload_videos.py \
  --batch-file data/video_batch.yml \
  --client-secrets secrets/youtube_client_secret.json \
  --token secrets/youtube_token.json \
  --allow-live-upload
```

### Batch Embed Chapters (Dry-Run Preview)

```bash
python .agents/skills/upload-book-videos/scripts/batch_embed_videos.py \
  --batch-file data/video_batch.yml \
  --dry-run
```

### Batch Embed Chapters (Write to Chapter Markdown Files)

```bash
python .agents/skills/upload-book-videos/scripts/batch_embed_videos.py \
  --batch-file data/video_batch.yml
```

## Upload State

The script updates `data/uploaded_videos.json`. Once a label (e.g. `ch01-overview`) exists in the state file with a `video_id`, it will be skipped on subsequent upload runs, preventing double-uploads.

## Under the Hood

- `batch_upload_videos.py` creates playlists on-demand if they are new, adds uploaded videos to them, and atomically writes the state file.
- `batch_embed_videos.py` performs safe, idempotent, marker-scoped substitutions, keeping chapters synchronized.
