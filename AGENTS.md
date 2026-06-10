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

## Legacy `.agents` Path Alias

The canonical agents and skills directory is:

`C:\Users\nd115232\Documents\GitHub\dima-publishing\.agents`

On this computer, the following legacy Google Drive path may be configured as
a filesystem junction to the canonical directory:

`G:\My Drive\0-Projects\!-important\BITM330-book-drive\.agents`

When the path is a verified junction, editing either path modifies the same
canonical repository files.

If the path is not a verified junction:

1. Do not edit the Google Drive copy.
2. Map the same relative path to the repository `.agents` directory.
3. Edit the repository version instead.
4. Never overwrite a newer repository file from Google Drive.

## External Assets

Large image assets remain outside the repository at the configured media library
path. Do not move, delete, or overwrite original media without explicit approval.
