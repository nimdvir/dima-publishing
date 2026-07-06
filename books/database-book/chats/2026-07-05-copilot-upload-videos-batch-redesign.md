# Chat: Textbook Video Batch Sync Scheme — 2026-07-05

**Source:** Copilot (current session)
**Original link:** n/a — local Copilot session

> Reopen: open this file in VS Code, or start a new chat and paste the TL;DR
> below as context.

---

## TL;DR

Rebuilt and canonicalized the textbook video upload skill (`upload-book-videos`) inside `dima-publishing` at [.agents/skills/upload-book-videos/](.agents/skills/upload-book-videos/) around a direct, high-control point-and-batch design instead of an over-scoped, folder-crawling manifest scanner. Users can explicitly declare local video files (e.g., from `.images/.videos/` synced Google Drive root) in `data/video_batch.yml`, preview additions, run single-video live validation trials via `--limit 1 --allow-live-upload`, and write responsive iframe embeds cleanly and idempotently into Markdown targets with stable label identifiers.

---

## Key Points

- Simplified video pipeline by removing multi-stage folder crawl and auto-hash dependency.
- Developed `batch_upload_videos.py` supporting dry-runs, playlists, automatic state deduplication tracking, and parameter-capped queues (`--limit N`).
- Developed `batch_embed_videos.py` to insert centered, responsive player templates cleanly and idempotently based on mapping labels.
- Preserved perfect credential isolation: OAuth client-secrets, access credentials, and tokens are ignored by `.gitignore` and must never be committed.

---

## What Was Done / Decided

### Redesign & Implementation
- Replaced manifest-dependent bulk discovery with direct-control batching files (`data/video_batch.yml`).
- Ported, refactored, and compiled both sync scripts cleanly under [.agents/skills/upload-book-videos/scripts/](.agents/skills/upload-book-videos/scripts/).
- Re-architected token hygiene: placed credential ignore structures directly into [.gitignore](.gitignore) for `secrets/`, `youtube_client_secret.json`, and `youtube_token.json`.
- Structured a 2-video Active Pilot Template at `data/video_batch.example.yml` for testing.

---

## Key Files / Artifacts

| File / Artifact | Change or Relevance |
|-----------------|---------------------|
| [.agents/skills/upload-book-videos/SKILL.md](.agents/skills/upload-book-videos/SKILL.md) | Created/Updated — Manual point-and-batch skill definition |
| [.agents/skills/upload-book-videos/scripts/batch_upload_videos.py](.agents/skills/upload-book-videos/scripts/batch_upload_videos.py) | Created — Batch sync/upload script with limit support |
| [.agents/skills/upload-book-videos/scripts/batch_embed_videos.py](.agents/skills/upload-book-videos/scripts/batch_embed_videos.py) | Created — Responsive Markdown content embedding script |
| [.agents/skills/upload-book-videos/references/youtube-setup.md](.agents/skills/upload-book-videos/references/youtube-setup.md) | Created — Client OAuth and quota management onboarding |
| [.gitignore](.gitignore) | Modified — Protected ignored secrets/oauth endpoints |
| [data/video_batch.example.yml](data/video_batch.example.yml) | Created — Baseline configuration template |

---

## Decisions & Rationale

- **Point-and-batch Model vs. Automatic crawling:** Direct, hand-pointed mapping is much safer and easier to use than fully crawling directory systems because we have a mixture of cover animations, draft explainers, and real textbook videos co-existing locally. 
- **Dry-run Requirement:** Mandating a dry-run first prevents accidental duplicate list uploads or creating dozens of orphaned Google API items due to format mismatches.
- **Safety Gate Override:** Reimplemented `--allow-live-upload` as a required parameter so a slip of a key or run action does not inadvertently run expensive API operations.

---

## Next Steps (for Tomorrow)

1. **Verify OAuth Secrets:** Drop `youtube_client_secret.json` into a local `secrets/` directory.
2. **Execute First Pilot Dry-Run:** Run the point-and-batch preview:
   ```bash
   python .agents/skills/upload-book-videos/scripts/batch_upload_videos.py --batch-file data/video_batch.yml --dry-run
   ```
3. **Run Live Capped Testing:** Validate client authorization on exactly one video using the `--limit 1` parameter:
   ```bash
   python .agents/skills/upload-book-videos/scripts/batch_upload_videos.py --batch-file data/video_batch.yml --client-secrets secrets/youtube_client_secret.json --token secrets/youtube_token.json --limit 1 --allow-live-upload
   ```
4. **Clean Run Embed writes:** Run `batch_embed_videos.py` to write verified video player blocks into the target chapter indices.

---

*Summary generated 2026-07-05. Source: copilot.*
