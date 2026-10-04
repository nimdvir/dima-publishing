---
name: upload-book-videos
description: End-to-end pipeline to generate subtitles and summaries with Gemini, batch upload selected video files to YouTube, and embed them in chapter Markdown folders using simple YAML/JSON mapping files under manual point-and-batch control.
argument-hint: "--batch-file data/video_batch.yml --dry-run"
metadata:
  author: dima-publishing
  version: "0.4.0"
---

# Upload Book Videos

## Purpose

Take local video files and: (1) generate `.srt` subtitles and a short summary
with the Gemini API, (2) batch-upload them to YouTube and add them to a
playlist, and (3) embed responsive players into chapter Markdown files. All
steps are under direct, manual control through a single mapping file.

## Important Constraints

- Proceed, but dry-run only for initial passes.
- Manual local scripts only.
- No real YouTube uploads without adding the mandatory `--allow-live-upload` flag.
- No GitHub Actions execution.
- Do not commit OAuth secrets, tokens, or credentials.

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/generate_video_assets.py` | Generate `.srt` subtitles and a short `.md` summary for each video using the Gemini API |
| `scripts/batch_upload_videos.py` | Upload multiple specified videos in a batch, saving IDs to state |
| `scripts/batch_embed_videos.py` | Insert corresponding responsive embeds into Markdown chapters |

## Prerequisites

- **Python packages:** `pip install google-genai google-api-python-client google-auth-oauthlib google-auth-httplib2 pyyaml`
- **Gemini:** set the `GEMINI_API_KEY` environment variable (used by `generate_video_assets.py`).
- **YouTube OAuth (one-time):** a **Desktop app** OAuth client is required — a
  Service Account will NOT work for channel uploads.
  1. In Google Cloud Console, create an OAuth client ID of type **Desktop app**.
  2. Save the downloaded JSON to `secrets/youtube_client_secret.json`.
  3. Add your Google account under the OAuth consent screen **Test users** (avoids Error 403: access_denied while the app is in Testing).
  4. First live upload opens a browser to authorize; a reusable
     `secrets/youtube_token.json` is then written automatically.
- Keep `secrets/` in `.gitignore`. Never commit client secrets or tokens.

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
2. Run `generate_video_assets.py --batch-file <file>` to create `.srt` subtitles and `.md` summaries next to each video.
3. Optionally copy each summary into the matching `description` field of the batch file so YouTube descriptions are rich.
4. Run `batch_upload_videos.py --dry-run` to preview the uploaded queue and playlist placements.
5. Run `batch_upload_videos.py --allow-live-upload` to upload to the YouTube API.
6. Review the generated `data/uploaded_videos.json` state map.
7. Run `batch_embed_videos.py --dry-run` to verify embed updates.
8. Run `batch_embed_videos.py` to write the responsive iframe wrappers into chapter Markdown files.
9. Record the resulting links in `books/database-book/data/video-registry.md`.

## Commands

### Generate Subtitles and Summaries

```bash
python .agents/skills/upload-book-videos/scripts/generate_video_assets.py \
  --batch-file books/database-book/data/ch07_videos_batch.yml
```

Or point directly at files:

```bash
python .agents/skills/upload-book-videos/scripts/generate_video_assets.py \
  --videos "G:/My Drive/.../video1.mp4" "G:/My Drive/.../video2.mp4"
```

Skips videos that already have `.srt` and `.md` siblings unless `--force` is passed.

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

## Link Registry

After a successful upload, record the human-readable links (watch URL, embed
URL, video ID, playlist, and where each video is embedded) in
`books/database-book/data/video-registry.md`. The JSON state file remains the
machine source of truth; the registry is the readable index.

## Under the Hood

- `batch_upload_videos.py` creates playlists on-demand if they are new, adds uploaded videos to them, and atomically writes the state file.
- `batch_embed_videos.py` performs safe, idempotent, marker-scoped substitutions, keeping chapters synchronized.
