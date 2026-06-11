## Highlights

* I merged the three competing drafts into one canonical skill: **`chapter-final-review`**.
* I used **Codex as the base**, added **GPT’s comprehensive reports/media/manifest/DOCX structure**, and added **Claude’s menu, approval gate, idempotency rules, diff-preview gates, and lightweight front-matter branch**.
* I removed the problematic parts: **no auto-sync, no deploy, no dated Lab 1 runbook as canonical, no singular `appendix/` path, no old manifest-staleness workflow**.
* Download the full package here: [chapter-final-review-merged.zip](sandbox:/mnt/data/chapter-final-review-merged.zip)

## Files Created

* [Download `SKILL.md`](sandbox:/mnt/data/chapter-final-review-merged/SKILL.md)
* [Download `agents/openai.yaml`](sandbox:/mnt/data/chapter-final-review-merged/agents/openai.yaml)
* [Download full ZIP](sandbox:/mnt/data/chapter-final-review-merged.zip)

## Install Path

Place the folder here:

```text
C:\Users\nd115232\Documents\GitHub\dima-publishing\.agents\skills\chapter-final-review
```

It should contain:

```text
chapter-final-review/
  SKILL.md
  agents/
    openai.yaml
```

## What I Merged In

From **Codex**, I kept the repo-canonical model, stable source files, Lab 1 merge-and-delete rule, `.reports/` structure, image manifest, Cloudinary convention, and no-deploy rule. 

From **GPT**, I kept the comprehensive source-of-truth model, media documentation contract, term mega table, DOCX structure, validation checklist, and final response contract. 

From **Claude**, I kept the interactive menu, approval gate, partial modes, front-matter branch, diff-preview gates, and idempotency rules — but removed the old sync/deploy and dated-lab-runbook assumptions. 

This should now be the one skill to keep as canonical.
