# Repository Agent Instructions

The canonical project agents, skills, prompts, references, templates, and
schemas are stored in `.agents/`.

## Getting Started

Before editing the database textbook or platform code, read:

- `.agents/README.md`
- the relevant skill under `.agents/skills/`
- any linked reference files

## Instruction Precedence

1. System and explicit user instructions
2. Root `AGENTS.md`
3. Relevant canonical skill under `.agents/skills/`
4. Task-specific prompt
5. Active reference files
6. Generated editor-specific mirrors

Files under `.agents/archive/` are historical and must never be used as active
instructions.

## External Assets

Large image assets remain outside the repository at the configured media library
path. Do not move, delete, or overwrite original media without explicit approval.
