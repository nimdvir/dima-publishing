---
name: xai-text-to-speech
description: >-
  Use when integrating the xAI Text-to-Speech API, TTS, speech synthesis,
  audio generation, voice generation, voice_id configuration, XAI_API_KEY
  authentication, or the https://api.x.ai/v1/tts endpoint. Ask discovery
  questions before code, then generate a tailored implementation for Node.js,
  Python, browser playback through a backend proxy, batch audio generation,
  streaming pipelines, telephony, or video embedding.
license: MIT
metadata:
  author: nd115232
  version: '0.1.0'
---

# xAI Text-to-Speech Integration Guide

Use this skill when a developer wants to integrate xAI Text-to-Speech (TTS), generate speech/audio from text, select an xAI voice, call `https://api.x.ai/v1/tts`, or handle `XAI_API_KEY` authentication.

This guide is based on xAI console/playground settings supplied by the user. Before writing production code, verify the current xAI API docs because endpoints, supported voices, formats, rate limits, and streaming support may change.

## Required First Response

Before writing any implementation code, ask the discovery questions below in a single message. Use `vscode_askQuestions` when available; otherwise ask them directly in chat.

Do not ask the developer to paste an API key. Only ask whether they already have one and tell them to store it as an environment variable.

Ask exactly these questions before code unless the current conversation already contains clear answers:

1. **Language / platform** - Node.js, Python, Browser, or something else?
2. **API key** - Do you already have an xAI API key? Keys are created at `console.x.ai` -> API Keys.
3. **Use case** - Are you generating audio on-demand, batch-processing text, or building a real-time streaming pipeline?
4. **Playback** - How will the audio be consumed? Browser `<audio>` element, saved to file, piped to a telephony system, or embedded in a video?
5. **Framework** - Are you using a specific framework? React, Next.js, Express, FastAPI, or something else?

After the developer answers, generate only the implementation sections that apply. Skip irrelevant languages, frameworks, playback modes, and deployment advice.

## Non-Negotiable Rules

- Do not write code until the discovery questions have been answered.
- Never expose `XAI_API_KEY` in browser or client-side code.
- For browser playback, proxy the request through a backend route or server function.
- Use environment variables for secrets.
- Do not log API keys, bearer tokens, or sensitive submitted text.
- If the user asks for streaming, verify whether xAI supports true streaming before claiming it does. If true streaming is not verified, explain that the HTTP response can still be streamed or buffered server-side depending on the runtime.
- If the user asks for a new API key, point them to `https://console.x.ai` -> API Keys. Do not generate or request secrets.

## Current Configuration Defaults

Use these defaults unless the developer asks for something else:

- Voice: `gwd3bpae6pbr`
- Language: `en`
- Output format: MP3, 44,100 Hz, 128 kbps
- Text: `Hello! This is a text-to-speech demo.`

## Auth

API keys start with `xai-`. Pass the key as a bearer token:

```bash
export XAI_API_KEY="xai-..."
```

For Windows PowerShell examples, prefer:

```powershell
$env:XAI_API_KEY = "xai-..."
```

Browser/client-side rule: never expose the API key. Proxy requests through a backend.

## API Endpoint

```text
POST https://api.x.ai/v1/tts
```

Headers:

- `Authorization: Bearer <API_KEY>`
- `Content-Type: application/json`

Response: raw audio bytes in the requested format.

## Request Body

```json
{
  "text": "Hello! This is a text-to-speech demo.",
  "voice_id": "gwd3bpae6pbr",
  "output_format": {
    "codec": "mp3",
    "sample_rate": 44100,
    "bit_rate": 128000
  },
  "language": "en"
}
```

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `text` | string | The text to synthesize. Supports speech tags. |
| `voice_id` | string | The voice to use, such as `Eve` or `Ara`, or a console voice id such as `gwd3bpae6pbr`. |
| `output_format` | object | Output format: `{ codec, sample_rate, bit_rate? }`. |
| `language` | string | BCP-47 language code, such as `en`, `es`, or `fr`, or `auto` to auto-detect. |

The pasted source says `voice_id` may be case-insensitive, but also says the voice name is case-sensitive. Prefer the exact voice id/name supplied by the console or docs, and verify current behavior before production use.

## Voices

The voice name or console voice id is the `voice_id` body field.

| Voice | Tone | Best for |
|---|---|---|
| `Eve` | Energetic and upbeat | Default, general-purpose assistants and everyday conversation |
| `Ara` | Warm and friendly | Conversational assistants and customer support |
| `Rex` | Confident and clear | Business and professional applications |
| `Sal` | Smooth and balanced | Versatile, general-purpose use |
| `Leo` | Authoritative and strong | Instructional content, announcements, and narration |
| `Altair` | Elegant and refined | High-end commercials, luxury brands, and documentary narration |
| `Atlas` | Confident and authoritative | Executive assistant, sales, and team management |
| `Carina` | Soft and empathetic | Therapy, mental health, and emotional support |
| `Castor` | Confident and persuasive | Enterprise sales, negotiations, and everyday sales |
| `Celeste` | Compassionate and motivating | Customer success, user advocacy, and tech support |
| `Cosmo` | Engaging and curious | How-to videos, product reviews, and edutainment |
| `Helios` | Passionate and upbeat | Productivity assistants, fitness coaching, and lifestyle |
| `Helix` | Dynamic and energetic | Podcasts, esports, and sports commentary |
| `Iris` | Friendly and upbeat | Consumer sales, retail, and customer outreach |
| `Kepler` | Innovative and charismatic | Tech commercials, corporate videos, and comedy |
| `Lumen` | Wise and engaging | Corporate training and professional development |
| `Luna` | Calm and nurturing | Education, tutoring, and language learning |
| `Lux` | Grounded and wise | Meditation, mindfulness, and talk therapy |
| `Naksh` | Warm and thoughtful | Personal assistant and multilingual support |
| `Orion` | Rich and cinematic | Trailers, audiobooks, brand films, and narration |
| `Perseus` | Vibrant and bright | Lifestyle brands and consumer advertising |
| `Rigel` | Professional and precise | Business assistant, scheduling, and operations |
| `Sirius` | Witty and energetic | Sports and gaming commentary |
| `Ursa` | Friendly and grounded | Everyday assistant, family, and personal use |
| `Zagan` | Powerful and dramatic | Games, animation, storytelling, and characters |
| `Zenith` | Smart and focused | Tech/SaaS sales and competitive pitches |

## Speech Tags

Inline tags insert a vocal expression at a point in the text:

`[pause]` `[long-pause]` `[hum-tune]` `[laugh]` `[chuckle]` `[giggle]` `[cry]` `[tsk]` `[tongue-click]` `[lip-smack]` `[breath]` `[inhale]` `[exhale]` `[sigh]`

Example:

```json
"So I walked in and [pause] there it was. [laugh] I couldn't believe it."
```

Wrapping tags change delivery style for enclosed text:

`<soft>` `<whisper>` `<loud>` `<build-intensity>` `<decrease-intensity>` `<higher-pitch>` `<lower-pitch>` `<slow>` `<fast>` `<sing-song>` `<singing>` `<laugh-speak>` `<emphasis>`

Example:

```json
"I need to tell you something. <whisper>It is a secret.</whisper> Pretty cool, right?"
```

When generating code, keep user-supplied text escaped safely for the selected language and transport.

## Output Formats

Pass `output_format` as a structured object, for example:

```json
{ "codec": "mp3", "sample_rate": 24000, "bit_rate": 128000 }
```

The pasted guide says the API default, when `output_format` is omitted, is MP3 at 24 kHz / 128 kbps.

| codec | sample_rate | bit_rate | Description |
|---|---:|---:|---|
| mp3 | 22050 | 32000 | MP3 22.05 kHz, 32 kbps |
| mp3 | 24000 | 128000 | MP3 24 kHz, 128 kbps, API default |
| mp3 | 44100 | 64000 | MP3 44.1 kHz, 64 kbps |
| mp3 | 44100 | 128000 | MP3 44.1 kHz, 128 kbps |
| mp3 | 44100 | 192000 | MP3 44.1 kHz, 192 kbps |
| wav | 16000 | | WAV 16 kHz |
| wav | 44100 | | WAV 44.1 kHz |
| wav | 48000 | | WAV 48 kHz |

## Tailored Implementation Guidance

After discovery, choose the smallest applicable section set.

### Node.js

- Use `fetch`, built into Node.js 18 and later. No SDK is required for the basic HTTP call.
- For saving files, convert `res.arrayBuffer()` to `Buffer` and write it with `fs/promises`.
- For server routes, return the audio bytes with a matching `Content-Type`, such as `audio/mpeg` for MP3 or `audio/wav` for WAV.
- Add explicit handling for non-200 responses before reading audio bytes.

### Python

- Use `requests` for simple scripts or `httpx` for async apps.
- `res.content` gives raw audio bytes for normal responses.
- For large outputs or progressive transfer, use `requests.post(..., stream=True)` and iterate `res.iter_content(chunk_size=4096)`.
- Write bytes directly to a file opened in binary mode.

### Browser Playback

- Never call xAI directly from browser code.
- Create a backend endpoint that receives text, calls xAI with `XAI_API_KEY`, and returns audio bytes.
- In the browser, read the backend response as a `Blob`, create an object URL, and set it on an `<audio>` element.
- Revoke object URLs when no longer needed.

### Batch Processing

- Treat synthesis requests as independent jobs.
- In JavaScript, use bounded concurrency instead of unbounded `Promise.all` for large batches.
- In Python, use `asyncio.gather` with a semaphore or a queue worker model.
- Respect rate limits and add exponential backoff for `429` and retryable `500+` responses.
- Store output files with stable names and metadata that record voice, language, format, and source text id.

### Real-Time or Streaming Pipelines

- First verify current xAI support for true streaming TTS.
- If true streaming is not supported or not documented, describe a backend buffering or chunk-forwarding approach instead of promising low-latency streaming.
- For telephony, confirm required codec, sample rate, chunking, and transport before generating code.
- For video embedding, generate files first, then hand off to the user's media or video pipeline.

### Framework Routing

- Next.js: implement server-side route handlers or server actions that keep `XAI_API_KEY` on the server.
- Express: create a POST route that validates input, calls xAI, and streams or sends audio bytes.
- FastAPI: use an endpoint that validates input and returns a `Response` or `StreamingResponse` with the audio media type.
- React-only apps need a backend. Do not put the bearer token in React client code.

## Error Handling

| Status | Meaning | Action |
|---:|---|---|
| 200 | Success | Audio bytes in response body |
| 400 | Bad request | Check text length, voice name, language, and format |
| 401 | Unauthorized | Invalid or missing API key |
| 429 | Rate limited | Back off and retry |
| 500+ | Server error | Retry with exponential backoff |

Implementation should surface clear developer-facing errors without printing secrets.

## Example Request

Use this only after discovery answers confirm that a curl example is useful.

```bash
curl -X POST "https://api.x.ai/v1/tts" \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello! This is a text-to-speech demo.",
    "voice_id": "gwd3bpae6pbr",
    "output_format": {
      "codec": "mp3",
      "sample_rate": 44100,
      "bit_rate": 128000
    },
    "language": "en"
  }' \
  --output output.mp3
```

## Final Response Shape After Answers

When answering an implementation request after discovery, use this shape:

1. Restate the selected platform, use case, playback path, and framework in one short sentence.
2. Provide only the needed code and setup steps.
3. Include environment variable setup without asking for the secret value.
4. Include one focused test command or manual verification step.
5. Mention live-doc verification for production if using voices, formats, streaming, or limits that may change.
