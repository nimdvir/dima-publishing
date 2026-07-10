# Chat: Ch07 Video Upload Pipeline — 2026-07-07

**Source:** Copilot
**Original link:** n/a — local Copilot session

> Reopen: open this file in VS Code, or start a new chat and paste the TL;DR
> below as context. (VS Code Copilot sessions have no shareable deep link;
> only web chats with a share URL can be linked directly.)

---

## TL;DR

Built and ran an end-to-end pipeline to upload the three Chapter 7
normalization videos to YouTube. Generated `.srt` subtitles and short
summaries with the Gemini API, batch-uploaded the videos (unlisted) to the
"BITM330 - Course Videos" playlist, and embedded responsive players into the
Chapter 7 `core-concepts.md`. Documented the resulting links in a new video
registry and upgraded the `upload-book-videos` skill into a full pipeline
(generate → upload → embed) with credential setup notes.

---

## Key Points

- Service Account keys do NOT work for YouTube channel uploads — a **Desktop
  app** OAuth client is required.
- OAuth "Testing" mode throws Error 403: access_denied until the Google account
  is added under the consent screen **Test users**.
- `secrets/` holds the OAuth client secret + token and is gitignored.
- Gemini `gemini-3.5-flash` successfully transcribed video audio to SRT and
  wrote short YouTube-style summaries.

---

## What Was Done / Decided

### Asset generation
- Created a Gemini-based script that uploads each MP4, waits for processing,
  then writes a `.srt` transcript and a `.md` summary next to the source video.
- Generated assets for all 3 Ch07 videos in `.images/ch07-normalization/ch-07-videos/`.

### YouTube upload
- Moved the user's Desktop OAuth client to `secrets/youtube_client_secret.json`
  and added `secrets/` to `.gitignore`.
- Created `books/database-book/data/ch07_videos_batch.yml` with summaries as
  descriptions.
- Ran dry-run, then live upload with `--allow-live-upload`. Videos added to the
  "BITM330 - Course Videos" playlist (unlisted).

### Embedding + docs
- Ran `batch_embed_videos.py` to insert responsive iframes into
  `ch07-normalization/core-concepts.md`.
- Created `books/database-book/data/video-registry.md` with watch/embed URLs.
- Upgraded the `upload-book-videos` skill (v0.4.0): added generalized
  `generate_video_assets.py`, prerequisites/credentials section, 9-step
  workflow, and registry note.

### Uploaded video IDs
- Data Normalization → `nTlbk1sCl2g`
- How Database Normalization Prevents Data Corruption → `QrMKVjAdEmw`
- How Normalization Fixes Messy Databases → `BAbBQ17U9xc`

---

## Key Files / Artifacts

| File / Artifact | Change or Relevance |
|-----------------|---------------------|
| `.agents/skills/upload-book-videos/scripts/generate_video_assets.py` | Created — Gemini SRT + summary generator |
| `.agents/skills/upload-book-videos/SKILL.md` | Modified — full pipeline + credential docs (v0.4.0) |
| `books/database-book/data/ch07_videos_batch.yml` | Created — upload/embed batch config |
| `books/database-book/data/video-registry.md` | Created — readable link registry |
| `data/uploaded_videos.json` | Created — machine state map of uploaded IDs |
| `books/database-book/files/source/chapters/ch07-normalization/core-concepts.md` | Modified — 3 embedded video players |
| `secrets/youtube_client_secret.json` | Created — Desktop OAuth client (gitignored) |

---
