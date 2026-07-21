# Password-Free Local Review Deployment

## Summary

Provide a shared, password-free review site at:

```text
http://localhost:3002
```

Any agent working in the repository can start or refresh it.

## Commands

From `reader-hybrid-v1.1`:

```powershell
npm run local:review          # Start the review site
npm run local:refresh         # Regenerate changed chapter content
npm run local:review:restart  # Restart it if needed
npm run local:status          # Check whether it is running
npm run local:stop            # Stop local deployments
```

## Implementation

- Add review commands to the reader's `package.json`.
- Extend the existing background launcher with a localhost-only review mode on port 3002.
- Remove login requirements only inside review mode.
- Keep ports 3000, 3001, LAN access, Supabase, and Vercel unchanged.
- Make `local:refresh` run the existing incremental content generator; Vite then hot-reloads the updated generated textbook data.
- Add a short root `AGENTS.md` note telling agents where and how to start or refresh the review deployment.
- Document the workflow in the reader README.

## Verification

- Open Chapters 5-17, labs, and appendices without login on port 3002.
- Modify representative application styling and confirm automatic hot reload.
- Modify representative chapter content, run `local:refresh`, and confirm the open page updates.
- Confirm ports 3000 and 3001 remain protected.
- Confirm port 3002 cannot be reached through the LAN address.
- Confirm start, status, refresh, restart, and stop commands work.

## Assumptions

- Agents run `local:refresh` after changing chapter or lab Markdown.
- Automatic filesystem watching is excluded to keep the deployment simple.
- The root agent note is informational and does not require agents to start the deployment unless review is needed.
