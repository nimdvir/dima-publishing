# Copilot Chat — Add Ollama Custom Models (BYOK)

**Date:** 2026-07-06

## TL;DR

Added multiple free/cheap AI models to GitHub Copilot Chat using Ollama as an
OpenAI-compatible custom endpoint. No third-party extensions needed. Original
provider setup was preserved and backed up.

## Key Points

- **Best approach:** Copilot's native "Manage Models" (BYOK) instead of
  third-party extensions. Avoided the "30+ models / free Opus" proxy extensions
  (`ltmoerdani.*`) due to data-exfiltration risk.
- **OpenRouter rejected** — user reported it never worked for them.
- **Ollama is the win:** already running locally (v0.31.1 on `127.0.0.1:11434`)
  with both local and cloud models. Runtime is free; local models are free;
  cloud models need an Ollama subscription.
- **LiteLLM / Headroom proxies** at `~/token-tracking/` are NOT running and add
  no value for this use case — left off.
- Custom provider config uses `apiType: chat-completions` (not the Responses
  API) and `url: http://127.0.0.1:11434/v1/chat/completions` per model.

## What Was Done

1. Verified Ollama running; started it when it was down.
2. Pulled `minimax-m3:cloud` as a test (`ollama pull minimax-m3:cloud`).
3. Filled the empty `Ollama-custom` block in `chatLanguageModels.json` with 8
   models: minimax-m3, kimi-k2.7-code, deepseek-v4-pro, glm-5.2,
   qwen3-coder:480b, nemotron-3-super, gemini-3-flash-preview (cloud) +
   qwen2.5-coder:7b (local).
4. Set `apiKey` to `ollama` (no real key needed).
5. Created a timestamped backup and validated JSON (`ConvertFrom-Json` → OK).
6. Preserved all existing providers (Copilot, Ollama-deprecated, Google,
   OpenAI, Anthropic).

## Open Issue

- The `Ollama-custom` models don't yet appear in the Copilot model picker.
  Likely needs a VS Code window reload, and possibly the cloud models must be
  pulled locally first (`ollama pull <id>`) or require an active Ollama cloud
  subscription.

## Key Files

- `C:\Users\nd115232\AppData\Roaming\Code\User\profiles\-7dbe41f9\chatLanguageModels.json`
- `C:\Users\nd115232\AppData\Roaming\Code\User\profiles\-7dbe41f9\chatLanguageModels.json.bak-2026-07-06.json` (backup)
- `C:\Users\nd115232\token-tracking\litellm-config.yaml` (proxy config, unused here)
