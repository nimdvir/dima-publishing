# Minimalist Vector Style (Data Book Default)

> Support file for the `image-placement` skill (`SKILL.md` in this folder).
>
> This is the default style for BITM330 textbook figures. Apply it unless the user explicitly overrides it, or unless a chapter declares an alternate palette.

## When To Use

- Default style for any new Gemini image prompt produced by the `image-placement` skill.
- Section mode or instruction mode — both default to this style.
- For chapter-wide overrides (e.g., a full-color illustrative palette), follow the chapter's own style note instead.

## Default Style Profile

- Flat vector illustration with sharp geometric edges.
- Deep-blue monochrome base with a sparse warm-gold accent.
- No gradients, shadows, textures, outlines, or realism.
- All elements are solid silhouettes.
- All internal detail must be created **only through negative-space cutouts**.
- Use rectangles, arcs, polygons, and clean symbolic forms.
- Maintain consistent visual weight, scale, density, and a flat or slight 3/4 perspective.
- Keep the image legible when scaled down for textbook use.

## Composition Rules

- Adapt the composition to the concept rather than reusing one layout across the chapter.
- Use process-flow layouts for sequences, split layouts for comparisons, hub-and-spoke or layered layouts for systems, and bridge motifs only when the concept genuinely calls for them.
- Keep spacing even, avoid overlap, and preserve a clean editorial feel.
- Avoid reusing the same composition pattern for nearby figures unless the underlying concept is truly the same.

## Prompt Style Block (Drop-In)

Paste this block at the style position inside any Gemini prompt:

```text
Use a minimalist vector style with sharp geometric forms, a deep-blue monochrome palette, and a sparse warm-gold accent. Render all elements as solid silhouettes; create internal distinctions only through negative-space cutouts. No gradients, shadows, textures, outlines, or readable text labels. Keep the composition balanced, editorial, and legible when scaled down.
```

## Quality Checks

- Internal details are negative-space cutouts, not drawn strokes.
- No gradients, shadows, textures, outlines, or realism.
- Image reads cleanly at small scale.
- Warm-gold accent is sparse, not dominant.
- No literal readable text inside the image (use abstract code-like or data-like forms instead).

## Examples

```markdown
🎨 **Image Generation Prompt**

**Filename**: `figure-05.0-sql-bridge.png`
**Title**: "SQL as Bridge"
**Caption**: "Figure 5.0 -- SQL as the bridge between stored data and business insight"
**Gemini Prompt**: "Create a professional, clean educational illustration for a college textbook showing SQL as a bridge between stored data and business insight. Use a minimalist vector style with sharp geometric forms, a deep-blue monochrome palette, and a sparse warm-gold accent. Show structured data tables on one side, business dashboards on the other, and a symbolic bridge composition connecting them. Render all elements as solid silhouettes, with all internal detail created only through negative-space cutouts. No gradients, shadows, textures, outlines, or readable text labels. Keep the layout balanced, editorial, and legible when scaled down."
```

```markdown
🎨 **Image Generation Prompt**

**Filename**: `figure-comparison-flat-vs-relational.png`
**Title**: "Flat vs. Relational"
**Caption**: "Flat-file and relational structures compared through simplified visual form"
**Gemini Prompt**: "Create a professional, clean educational illustration for a college textbook comparing a flat-file structure with a relational structure. Use a split composition with flat files on one side and linked tables on the other. Use a minimalist vector style with sharp geometric forms, a deep-blue monochrome palette, and a sparse warm-gold accent. Render all elements as solid silhouettes, and create table cells, links, and internal distinctions only through negative-space cutouts. No gradients, shadows, textures, outlines, or readable text labels. Keep the comparison balanced, analytical, and legible when scaled down."
```

```markdown
🎨 **Image Generation Prompt**

**Filename**: `figure-05.10-aggregation-pipeline.png`
**Title**: "Aggregation Pipeline"
**Caption**: "Figure 5.10 -- SQL processes rows through a pipeline: filter with WHERE, organize with GROUP BY, and refine grouped results with HAVING"
**Gemini Prompt**: "Create a professional, clean educational illustration for a college textbook showing the SQL aggregation pipeline. Use a process-flow layout with raw rows entering from the left, a filter stage for WHERE, a grouping stage for GROUP BY, and a final grouped-results filter for HAVING. Use a minimalist vector style with sharp geometric forms, a deep-blue monochrome palette, and a sparse warm-gold accent. Render all stages as solid silhouettes and create internal distinctions only through negative-space cutouts. No gradients, shadows, textures, outlines, or readable text labels. Keep the composition analytical, editorial, and legible when scaled down."
```
