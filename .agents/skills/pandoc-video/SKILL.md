---
name: pandoc-video
description: >
  Generate video embed snippets for Markdown that will be converted with Pandoc to HTML and/or EPUB.
  Use when: embedding an MP4 in Markdown; producing an iframe YouTube/Vimeo embed for HTML; creating
  a clickable YouTube thumbnail link for cross-format (HTML + EPUB) portability; converting one
  video reference format into another for a Pandoc workflow.
argument-hint: Video URL or local path, plus the target output (HTML, EPUB, or both)
---

# Pandoc Video Embed Skill

Use this skill whenever the user wants to add video to Markdown that will be converted with Pandoc to HTML and/or EPUB.

This skill supports exactly three patterns:

1. **Direct MP4 embed** — for local or hosted `.mp4` files using the HTML `<video>` element.
2. **Iframe embed** — for HTML-only embedded players such as YouTube or Vimeo.
3. **YouTube link with automatic thumbnail** — for a clickable image thumbnail generated from a YouTube URL without requiring an API.

Prefer the most portable solution for the target format:

- **HTML only** → direct MP4 or iframe are acceptable.
- **EPUB** → prefer direct MP4 only when the user explicitly wants embedded media and accepts uneven reader support.
- **HTML + EPUB or cross-format source** → prefer a clickable YouTube thumbnail link.

## When to Use

Invoke this skill when the user asks:

- how to add video in Pandoc
- how to embed MP4 in Markdown/HTML/EPUB
- how to use iframe embed code
- how to link to YouTube with a thumbnail
- how to automatically generate a YouTube thumbnail from a link
- how to create reusable Markdown snippets for video in a Pandoc workflow
- to convert one video reference format into another

## Core Rules

### Rule 1 — Match the output format

- For **HTML**, raw HTML video or iframe is acceptable.
- For **EPUB**, avoid iframe embeds.
- For **cross-format portability**, use a linked thumbnail.

### Rule 2 — Use raw HTML when needed

Pandoc Markdown has no native video syntax. Use raw HTML for `<video>` or `<iframe>`.

### Rule 3 — Prefer thumbnails for YouTube in EPUB

Safest EPUB-compatible pattern: clickable image + normal link to the YouTube watch URL + optional caption.

### Rule 4 — Automatic YouTube thumbnail derivation

Extract the video ID and derive the thumbnail using:

`https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`

Preferred quality fallback order:

1. `maxresdefault.jpg`
2. `sddefault.jpg`
3. `hqdefault.jpg`
4. `mqdefault.jpg`
5. `default.jpg`

Without a validation step, default to `hqdefault.jpg`.

## Output Patterns

### Pattern A — Direct MP4 embed

```html
<video controls playsinline width="720" poster="images/video-poster.jpg">
  <source src="media/video-file.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

Notes:

- `poster` is optional but recommended.
- `playsinline` helps mobile behavior.
- Use relative paths for repo content.
- Note that EPUB support for embedded video varies by reader.

### Pattern B — Iframe embed

```html
<iframe
  width="720"
  height="405"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>
```

Notes:

- Do not recommend for EPUB.
- Many EPUB readers will not render iframes reliably.

### Pattern C — YouTube link with automatic thumbnail

```md
[![Watch the video](https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
```

With caption:

```md
[![Watch the video](https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

*Click the image to watch the companion video.*
```

Notes:

- Preferred cross-format solution.
- Works well for HTML and EPUB.
- If the user wants the image local instead of hotlinked, say so and provide a local-path variant.

## YouTube ID Extraction

Extract from common formats:

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`

After extraction:

- watch URL → `https://www.youtube.com/watch?v=VIDEO_ID`
- thumbnail URL → `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`

## Response Behavior

1. Identify whether the user wants embedded MP4, iframe, or linked thumbnail.
2. Ask about output target only if necessary; otherwise infer from context.
3. Provide a ready-to-paste snippet.
4. Briefly explain format compatibility (HTML support, EPUB caveats, portability recommendation).
5. For YouTube links, return both a normalized watch URL and an automatic thumbnail URL.
6. When relevant, provide all three options side by side and label the recommended one.

## Default Recommendation Logic

If the user does not specify a preference:

- **Pandoc + EPUB** → Pattern C first.
- **HTML page/site only** → Pattern A for MP4, Pattern B for hosted players.
- **Book / Jupyter Book / course book / multiple output formats / Pandoc generally** → Pattern C first.

## One-line Fallback Advice

> For Pandoc projects that may become both HTML and EPUB, use a clickable YouTube thumbnail link rather than an iframe.

## Preferred Answer Style

- Be direct.
- Give the snippet first.
- Keep explanation brief but technically accurate.
- Recommend the most robust option when multiple formats are involved.
- Do not overcomplicate with API-based thumbnail lookup unless asked.
