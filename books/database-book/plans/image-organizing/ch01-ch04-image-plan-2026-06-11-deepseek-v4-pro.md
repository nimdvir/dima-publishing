# Ch01–Ch04 Image Placement Plan: Add, Replace & Retain

Date: 2026-06-11
Model: DeepSeek V4 Pro (GitHub Copilot)
Image root: `G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images`
Source chapters: `books/database-book/files/source/chapters/`
Primary skill: `.agents/skills/chapter-media/SKILL.md`
Inventory: `.images/_inventory/ch01-ch04-media-inventory.csv` (619 rows, scanned 2026-06-11)
Chapter map: `.images/_inventory/chapter-map.json`

This plan is a **detailed per-image action list** for chapters 1–4, derived from a
full cross-reference of all 619 inventoried assets against the current source chapter
files. It specifies which images to **add**, **replace**, **retain as-is**, or **skip**
(duplicates/alternates/slide-exports). It does **not** execute — each phase requires
approval before the `chapter-media` workflow is invoked.

---

## Pre-Read

Before starting any phase:

- `AGENTS.md`
- `.agents/README.md`
- `.agents/skills/chapter-media/SKILL.md`
- `.agents/skills/chapter-media-inventory/SKILL.md`
- `.images/_inventory/chapter-map.json`
- `.images/_inventory/ch01-ch04-media-inventory.csv`

---

## Constraints

1. **No deletions.** Never delete originals, even in `ch0N-unused/` or `recommend-delete/`.
2. **No renames without approval.** Original filenames are preserved.
3. **Source chapters are in `files/source/chapters/ch0N-slug/`.** The latest dated
   Markdown files linked from each chapter's `index.md` are the edit targets.
4. **Images already on Cloudinary** (status `used` in inventory) are already placed;
   do not re-place or re-upload the same file unless replacing with a different version.
5. **Slide exports** (status `slide-export`) are excluded from placement unless
   explicitly listed.
6. **Chapter map alignment** per `chapter-map.json` is confirmed for ch01–ch04.
7. **Per `chapter-media` workflow**: scan → suggest → decide → place → optimize →
   upload → rewrite links → update ledger. This plan covers **suggest & decide**.
   Execution is a separate phase.

---

## Summary by Chapter

| Chapter | Total Assets | Currently Used |  Unused Candidates   | Recommended to Add |
| ------- | :----------: | :------------: | :------------------: | :----------------: |
| Ch01    |     200      |      ~30+      |  ~15 (mostly dupes)  |         2          |
| Ch02    |     109      |      ~22       |  ~25 (many unique)   |        6–8         |
| Ch03    |     171      |      ~25       | ~10 (older versions) |        1–2         |
| Ch04    |     119      |      ~33       | ~10 (older versions) |         1          |

---

## Phase 1 — Chapter 2: High Priority (6–8 images to add)

**Rationale**: Ch02 has the most unused-but-quality images. Key concepts discussed in
text (IPO Model, Five Components, IS vs IT, decision levels, KPIs, strategic alignment,
IT governance) lack dedicated visuals.

Source chapter: `files/source/chapters/ch02-mis-and-bitm/core-concepts.md`
Image source folder: `G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\ch02-mis-bitm\ch02-used\`

### Recommended Additions (ordered by priority)

#### 1. `ch02-input-process-output-model.png` — ★★★ HIGH
- **Size**: 197 KB | PNG
- **Caption**: Input-Process-Output model applied to an information system
- **Placement**: § "Why Foundations Matter" or § "Information Systems" where the IPO
  concept is introduced
- **Reason**: The chapter discusses how inputs become outputs through processing, but
  lacks a visual for the IPO model itself

#### 2. `ch02-five-components-information-system.png` — ★★★ HIGH
- **Size**: 91 KB | PNG
- **Caption**: The five components of an information system: hardware, software, data,
  procedures, and people
- **Placement**: § "The Five Components of an Information System"
- **Reason**: Core framework; small, clean visual; currently discussed in text only

#### 3. `ch02-is-vs-it-comparison.png` — ★★★ HIGH
- **Size**: 321 KB | PNG
- **Caption**: Information systems vs. information technology — technology is the tool;
  the system includes people, data, and processes
- **Placement**: § distinguishing IS from IT
- **Reason**: The chapter explicitly distinguishes these; this visual side-by-side
  comparison strengthens the concept

#### 4. `ch02-organizational-decision-levels.png` — ★★★ HIGH
- **Size**: 317 KB | PNG
- **Caption**: Organizational decision levels: operational, tactical, and strategic
- **Placement**: § "Management as Decision-Making" or KPI section
- **Reason**: Key MIS concept; chapter discusses different decision types but has no
  level pyramid/visual

#### 5. `ch02-kpi-dashboard-examples.png` — ★★ MEDIUM
- **Size**: 437 KB | PNG
- **Caption**: Example KPI dashboards showing how metrics translate goals into
  measurable signals
- **Placement**: § on KPIs and business performance measurement
- **Reason**: Chapter discusses KPIs extensively; dashboard example makes it concrete

#### 6. `ch02-strategic-alignment-model.png` — ★★ MEDIUM
- **Size**: 262 KB | PNG
- **Caption**: Strategic alignment model connecting business strategy to IT strategy
- **Placement**: § "MIS, BITM, Alignment, and Governance"
- **Reason**: Chapter covers alignment; dedicated visual fills the gap

#### 7. `ch02-it-governance-structure.png` — ★★ MEDIUM
- **Size**: 287 KB | PNG
- **Caption**: IT governance structure showing decision domains and accountability
- **Placement**: § on IT governance
- **Reason**: Governance is discussed in text; visual reinforces the concept

#### 8. `ch02-summary-concept-map.png` — ★ LOWER
- **Size**: 299 KB | PNG
- **Caption**: Chapter 2 concept map: foundations of information systems from data to
  business performance
- **Placement**: End of chapter / Summary section
- **Reason**: Good end-of-chapter recap visual; currently only `ch02-all.jpg` serves
  this role

### Additional Candidates (if more coverage needed)

| File                                                    | Size   | Topic                            |                               Recommended?                                |
| ------------------------------------------------------- | ------ | -------------------------------- | :-----------------------------------------------------------------------: |
| `ch02-dikw-hierarchy.png`                               | 412 KB | DIKW hierarchy visual            |                   Consider if DIKW section needs visual                   |
| `ch02-dikw-staircase-exam.png`                          | 350 KB | DIKW staircase with exam example |                           Alternative to above                            |
| `ch02-mis-vs-bitm-comparison.png`                       | 353 KB | MIS vs BITM side-by-side         | Already covered by `ch02-mis-bitm-alignment-governance.png` which is used |
| `ch02-kpi-design-breakdown.png`                         | 250 KB | KPI design process               |                        Supplement to KPI dashboard                        |
| `ch02-data-everywhere.png`                              | 517 KB | Business activity → data         |                           Intro section visual                            |
| `ch02-information-system-ipo-applied.png`               | 305 KB | IPO applied to IS                |                             Alternative to #1                             |
| `ch02-business-activity-data-systems-decisions.png`     | 86 KB  | Data→Systems→Decisions flow      |                         Small, clean intro visual                         |
| `ch02-same-data-different-organizational-timelines.png` | 414 KB | Same data, different org levels  |                     Could complement decision levels                      |

### Images to Skip (Duplicates of Used Images)

| File                                             | Reason                  |
| ------------------------------------------------ | ----------------------- |
| `ch02-data-to-performance-chain.png`             | Already used as fig 2.3 |
| `ch02-dikw-read-compared.png`                    | Already used            |
| `ch02-wilson-information-behavior-model.png`     | Already used            |
| `ch02-efficiency-vs-effectiveness-matrix.png`    | Already used            |
| `ch02-foundations-leading-data-fundamentals.png` | Already used            |
| `ch02-infographic-overview.png`                  | Already used            |

---

## Phase 2 — Chapter 1: Low Priority (2 images to add)

**Rationale**: Ch01 is very image-rich (30+ placed). Only 2 distinct unused images
exist that aren't duplicates of already-placed ones.

Source chapter: `files/source/chapters/ch01-introduction-to-course/core-concepts.md`
Image source folder: `G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\ch01-welcome-to-the-textbook\`

### Recommended Additions

#### 1. `ch01-systems-thinking-business.png` — ★★ MEDIUM
- **Size**: 427 KB | PNG
- **Location**: `ch01-used/` (placed in folder but NOT referenced in chapter)
- **Caption**: Systems thinking approach connecting business, data, technology, and
  decisions
- **Placement**: "Why This Book Exists" section or near the competencies discussion
- **Reason**: Distinct visual not already represented in chapter; reinforces the
  systems-thinking approach the book advocates

#### 2. `data-dashboard.png` — ★ LOWER
- **Size**: 56 KB | PNG
- **Location**: `optimized/`
- **Caption**: Business dashboard example showing data transformed into visual metrics
- **Placement**: Introduction or data-to-decisions narrative
- **Reason**: Small, clean dashboard visual; could complement the introductory data
  flow discussion

### Images to Skip

| File                                                | Reason                                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `ch1-course-plan1.png`, `ch1-course-plan2.png`      | Alternates; chapter has `ch01-updated-part-1.png` and `ch01-updated-part-2.png`      |
| `ch01-summary2.png`                                 | Alternate; chapter has `ch01-info.png` and `ch01-database-architecture-business.png` |
| `figure1.2-objectives.jpg`                          | Already served by `ch01-figure12-objectives` on Cloudinary                           |
| `flow2.png`                                         | Duplicate of `ch01-flow` which is used                                               |
| `bloom.jpg`                                         | Alternate; `ch1-blooms-taxonomy-in-practice.png` is already used                     |
| `image_004.png` through `image_015.png`             | Older AI generations; superseded by placed versions                                  |
| `ch01-journey.png`, `ch01-question-to-insight.jpg`  | Older versions of placed images                                                      |
| `ch1-model.jpg`, `ch1-model.png`, `ch1-student.jpg` | Very old (Feb 2026) originals                                                        |
| `5-grading-erd2.jpg`                                | Belongs to a later chapter (ERD is Ch06)                                             |
| `every-interaction.png`                             | Large (1.9 MB) unused original                                                       |
| `nim-dvir.png`                                      | Author photo (4.3 MB) — not for chapter body                                         |
| All `slide-export` type                             | Slide exports excluded from placement                                                |

---

## Phase 3 — Chapter 3: Low Priority (1–2 images to add)

**Rationale**: Ch03 is well-covered with 25+ images. Most unused assets are older/
higher-resolution originals of placed images.

Source chapter: `files/source/chapters/ch03-what-is-data/core-concepts.md`
Image source folder: `G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\ch03-what-is-data\`

### Recommended Additions

#### 1. `ch03-dikw-alt.jpg` — ★★ MEDIUM
- **Size**: 203 KB | JPG
- **Location**: `ch03-used/` (placed in folder but NOT referenced in chapter)
- **Caption**: DIKW hierarchy: data → information → knowledge → wisdom with business
  examples
- **Placement**: § "Data, Meaning, and Context" where DIKW is discussed
- **Reason**: Chapter discusses data→information→knowledge→wisdom but has no dedicated
  DIKW visual in the main chapter

#### 2. `ch03-qual-quant.jpg` — ★ LOWER
- **Size**: 110 KB | JPG
- **Location**: `ch03-used/`
- **Caption**: Qualitative vs. quantitative data classification with examples
- **Placement**: § on data classification / qualitative vs quantitative
- **Reason**: Clear visual for the qual/quant distinction; chapter discusses this

### Images to Skip

| File                                                                                                      | Reason                                                                       |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `ch03-business-data-examples.jpg`                                                                         | Duplicate; `ch03-business-data-examples.jpg` is already used via Cloudinary  |
| `ch03-data-types.jpg`, `ch03-nominal-to-ratio.jpg`, `ch03-data-structure.jpg`, `ch03-zero-empty-null.jpg` | Older versions of placed images                                              |
| `Data_Fundamentals_Blueprint_of_Insight.png` (4.3 MB)                                                     | Large root-level infographic; may serve as optional chapter opener if needed |
| `ch03-Data_Fundamentals__Values_to_Wisdom.png` (4.5 MB)                                                   | Large root-level visual; alternative opener                                  |
| All `ch03-image-001` through `ch03-image-014`                                                             | Older AI generation batch (May 2026); superseded                             |
| All `ch03-unused/` originals                                                                              | Older/original versions of placed images                                     |
| All `slides/` and `extracted/`                                                                            | Slide exports, not for chapter body                                          |

---

## Phase 4 — Chapter 4: Low Priority (1 image to add)

**Rationale**: Ch04 is very well-covered (33+ images). Most unused are older originals
or higher-res duplicates.

Source chapter: `files/source/chapters/ch04-databases/core-concepts.md`
Image source folder: `G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\ch04-databases\`

### Recommended Additions

#### 1. `ch04-ch4-summary.jpg` — ★ LOWER
- **Size**: 259 KB | JPG
- **Location**: `used/` (in folder but NOT referenced in chapter)
- **Caption**: Chapter 4 summary: from spreadsheets to structured database systems
- **Placement**: End of chapter / Summary section
- **Reason**: Alternate summary visual; chapter has `ch04-summary.jpg` and
  `ch04-learning-map.jpg` — only add if this one is visually distinct after review

### Images to Skip

| File                                                               | Reason                                                                                                                |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `Guide_to_Database_Foundations.png` (4.6 MB)                       | Large root-level overview; may serve as alternative opener                                                            |
| `The_Power_of_Relational_Databases.png` (4.3 MB)                   | Large root-level; alternative relational overview                                                                     |
| `Database_Fundamentals_Versus_Spreadsheets.png` (4.2 MB)           | Topic already covered by `ch04-spreadsheet-vs-database-strengths.png` and `ch04-spreadsheet-vs-database-detailed.png` |
| `6-Step_Grading_Database_Guide.png` (4.5 MB)                       | May belong in Let's Build or Lab, not main chapter                                                                    |
| `ch04-connecting-database-design-to-business-decisions.jpg` (3 MB) | Older version; audio file already serves this topic                                                                   |
| All `recommend-delete/` items                                      | Marked for deletion — do not use                                                                                      |
| All `unused/` originals                                            | Older versions of already-placed images                                                                               |

---

## Execution Order

1. **Phase 1 — Ch02 (HIGH PRIORITY)**. Run `chapter-media` for ch02 with the 6–8
   images listed above. This is the most impactful phase.
2. **Phase 2 — Ch01 (LOW)**. Only if natural placement spots are identified during
   review.
3. **Phase 3 — Ch03 (LOW)**. Only the DIKW visual; skip qual-quant unless a specific
   gap is confirmed.
4. **Phase 4 — Ch04 (LOW)**. Only if `ch04-ch4-summary.jpg` is visually distinct.

## Per-Image Workflow (for each image in each phase)

Follow the `chapter-media` skill pipeline:

1. **Decide**: Confirm the image and placement section with the author.
2. **Copy to working location**: Source from `ch0N-used/` into a temp working folder.
3. **Optimize**: Run ImageMagick optimization (resize if needed, compress, convert to
   web-friendly format).
4. **Upload to Cloudinary**: Use the Cloudinary MCP to upload optimized version.
5. **Rewrite link**: Replace any placeholder or old link in the chapter Markdown with
   the new Cloudinary URL.
6. **Add caption**: Ensure each placed image has a `*Figure X.Y — Caption text.*` line.
7. **Update ledger**: Update `.images/_inventory/ch01-ch04-media-inventory.csv` and
   `.images/book-media.md` with the new "used" status.

## Verification (per phase)

1. Confirm each new image has a Cloudinary URL in the chapter Markdown.
2. Confirm each new image has a figure number and caption.
3. Confirm no duplicate figure numbers.
4. Confirm no Cloudinary 404s (verify each URL loads).
5. Run `chapter-review-codex` media check if available for the chapter.
6. Update `source-import-manifest.csv` if needed.

## Risks & Notes

- **Ch02 image folder name mismatch**: The image folder is `ch02-mis-bitm` but source
  chapter is `ch02-mis-and-bitm`. The chapter-map.json confirms this alignment.
- **Ch02 has a second image folder**: `ch02-mis-and-bitm/` at root contains older
  images (`ipo.png`, `ipo2.jpg`, `ipo.min.png`, `ven.png`, `bitm-alignment.png`,
  `dikw.png`). These are older/original versions; prefer the newer images in
  `ch02-mis-bitm/ch02-used/`.
- **Duplicate handling**: Several unused images in `ch0N-used/` folders are
  older/higher-resolution originals of already-placed Cloudinary images. The inventory
  CSV tracks which `used_in_files` each Cloudinary URL serves — use this to confirm
  before adding.
- **Ch01 `ch01-used/` vs `optimized/`**: The `ch01-used/` folder contains originals
  that were later optimized into `optimized/`. Both are valid sources; prefer
  `optimized/` for smaller file sizes.
- **Large root-level images** (4–5 MB each in ch03 and ch04 root): These are
  PowerPoint-export-style overview graphics. They could serve as chapter openers but
  need optimization before placement.
