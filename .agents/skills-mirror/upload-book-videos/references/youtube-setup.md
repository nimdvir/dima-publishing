# YouTube Setup (Local First)

## Initial Safety Mode

This skill is configured for local dry-run planning first.

- Manual local batch scripts only.
- No live uploads in the initial pass.
- No GitHub Actions.

Use this mode while OAuth and select file mappings are being validated.

## Requirements

- A YouTube channel for the book/course.
- A Google Cloud project with YouTube Data API v3 enabled.
- OAuth client credentials for a desktop app or installed app.
- Python packages:

```bash
pip install google-api-python-client google-auth google-auth-oauthlib google-auth-httplib2 pyyaml
```

## OAuth Files

Use these paths locally:

```text
secrets/youtube_client_secret.json
secrets/youtube_token.json
```

Do not commit those files (they are excluded by `.gitignore`).

## Recommended Privacy

Use `unlisted` by default for textbook videos.

## Drive Source Note

If videos are only available as a Google Drive web URL, this workflow cannot upload directly until a Drive API download step is implemented.

Recommended initial source is a locally synced Drive folder.

## Live Upload Safety Guard

The sync script requires explicit opt-in for live uploads.

- Dry-run: `--dry-run`
- Live upload: add `--allow-live-upload` package flag only after dry-run verification

## Batch Configuration Example

To map chosen files, titles, and playlists, copy `data/video_batch.example.yml` to `data/video_batch.yml` and edit it to point to your exact video files.

