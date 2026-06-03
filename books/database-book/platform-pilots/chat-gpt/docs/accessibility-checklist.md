# Accessibility Checklist

**Project:** Database Book Platform  
**Version:** 0.1  
**Date:** 2026-05-29  
**Target:** WCAG 2.2 Level AA where practical  
**Status:** Working checklist

## 1. Purpose

This checklist defines accessibility requirements for the digital book platform.

The book includes Markdown chapters, images, YouTube videos, audio overviews, notes, navigation, login, payment, and future interactive components. Accessibility must be built into the workflow from the beginning.

## 2. Global Requirements

| ID | Requirement | Priority |
|---|---|---|
| A11Y-01 | WCAG 2.2 AA target | Must |
| A11Y-02 | Keyboard access | Must |
| A11Y-03 | Screen reader support | Must |
| A11Y-04 | Logical headings | Must |
| A11Y-05 | Color contrast | Must |
| A11Y-06 | Responsive reflow | Must |
| A11Y-07 | Accessible forms | Must |
| A11Y-08 | Accessible media | Must |
| A11Y-09 | No color-only meaning | Must |
| A11Y-10 | Clear errors | Must |
| A11Y-11 | Visible focus | Must |
| A11Y-12 | Reduced motion | Should |

## 3. Chapter Checklist

```markdown
## Chapter Accessibility Checklist

- [ ] Headings follow logical order.
- [ ] H1 is used only once.
- [ ] H2/H3 structure is coherent.
- [ ] Images have meaningful alt text.
- [ ] Complex visuals have captions.
- [ ] Audio has transcript.
- [ ] Videos have captions or transcript.
- [ ] Links use meaningful text.
- [ ] Tables are simple.
- [ ] Code appears as real text.
- [ ] No information depends on color alone.
- [ ] Callouts are readable as blockquotes.
- [ ] Page works on mobile.
```

## 4. Navigation Accessibility

| Item | Requirement |
|---|---|
| Sidebar | Keyboard usable |
| Chapter tree | Expandable |
| Active chapter | Programmatic state |
| Active section | Visible state |
| Mobile drawer | Focus managed |
| Close button | Keyboard usable |
| Bottom nav | Descriptive labels |
| Search | Labeled input |

### Sidebar Checklist

- [ ] User can tab into sidebar.
- [ ] User can expand chapters.
- [ ] User can collapse chapters.
- [ ] Current chapter is indicated.
- [ ] Current section is indicated.
- [ ] Lock state is text-accessible.
- [ ] Mobile drawer closes by keyboard.
- [ ] Focus returns after drawer closes.

## 5. Heading Structure

Required structure:

```markdown
# Chapter Title
## Major Section
### Subsection
```

Avoid skipped levels.

### Heading Checklist

- [ ] One H1 per chapter.
- [ ] No skipped levels.
- [ ] Headings describe content.
- [ ] Headings are not styling hacks.
- [ ] Sidebar sections match headings.

## 6. Image Accessibility

| Image Type | Requirement |
|---|---|
| Instructional | Alt text |
| Complex diagram | Alt + caption |
| Screenshot | Describe key info |
| Decorative | Avoid or hide |
| Code image | Avoid |
| Table image | Avoid |

Good alt text:

```markdown
![Diagram showing students, deliverables, and grades connected through primary and foreign keys.](IMAGE_URL)
```

Weak alt text:

```markdown
![Image](IMAGE_URL)
```

### Image Checklist

- [ ] Alt text describes meaning.
- [ ] Caption explains purpose.
- [ ] Complex image has nearby explanation.
- [ ] Essential text is not image-only.
- [ ] Cloudinary URL is stable.
- [ ] Image is not decorative clutter.

## 7. Audio Accessibility

Every audio overview needs a transcript.

| Requirement | Priority |
|---|---|
| Audio controls | Must |
| Transcript link | Must |
| Caption/description | Must |
| No autoplay | Must |
| Download option | Could |

Example:

```html
<figure>
  <audio controls preload="metadata">
    <source src="AUDIO_URL_HERE" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <figcaption>Audio overview for Chapter 2.</figcaption>
</figure>

[Read the audio transcript](transcript.md)
```

## 8. Video Accessibility

| Requirement | Priority |
|---|---|
| Captions | Must |
| Transcript/summary | Should |
| Meaningful title | Must |
| Caption text | Must |
| No autoplay | Must |
| Responsive frame | Must |

### Video Checklist

- [ ] Video has captions.
- [ ] Captions are checked.
- [ ] Iframe has title.
- [ ] Caption explains purpose.
- [ ] Transcript or summary exists.
- [ ] No autoplay.
- [ ] Video is responsive.

## 9. GIF and Animation Accessibility

| Media | Recommendation |
|---|---|
| Tiny loop | Acceptable |
| Demo | Use video |
| Multi-step | Use video |
| Flashing | Avoid |
| Essential info | Provide text |

### Animation Checklist

- [ ] No flashing content.
- [ ] Motion is not essential.
- [ ] Written explanation exists.
- [ ] Video used if controls needed.
- [ ] Animation has no sound autoplay.

## 10. Text and Readability

| Item | Requirement |
|---|---|
| Paragraphs | Short |
| Sentences | Clear |
| Terms | Defined |
| Jargon | Explained |
| Examples | Concrete |
| Level | Student-friendly |

## 11. Link Accessibility

Bad:

```markdown
[Click here](...)
```

Good:

```markdown
[Download the Chapter 5 SQL practice file](...)
```

### Link Checklist

- [ ] Link text is meaningful.
- [ ] Link works out of context.
- [ ] External links are clear.
- [ ] Download links identify file type.
- [ ] Broken links are checked.

## 12. Table Accessibility

| Requirement | Priority |
|---|---|
| Simple tables | Must |
| Header row | Must |
| No merged cells | Should |
| No image tables | Must |
| Mobile readable | Must |

## 13. Code Accessibility

Use real code blocks, not screenshots.

```sql
SELECT
    StudentID,
    LastName,
    Grade
FROM Student
WHERE Grade >= 90;
```

### Code Checklist

- [ ] Code is text.
- [ ] Code is copyable.
- [ ] Highlighting has contrast.
- [ ] Long lines are handled.
- [ ] Code has explanation.

## 14. Forms Accessibility

Applies to login, signup, checkout, notes, and support forms.

| Item | Requirement |
|---|---|
| Label | Visible |
| Error | Clear |
| Required | Indicated |
| Focus | Visible |
| Keyboard | Works |
| Autocomplete | Helpful |

## 15. Notes UI Accessibility

| Requirement | Priority |
|---|---|
| Note editor label | Must |
| Save confirmation | Must |
| Keyboard access | Must |
| Delete confirmation | Must |
| Private status clear | Must |
| Search notes | Should |

## 16. Payment Accessibility

| Requirement | Priority |
|---|---|
| Clear buy button | Must |
| Product name | Must |
| Price shown | Must |
| Access duration | Must |
| Refund policy | Must |
| Success page | Must |
| Cancel page | Must |

## 17. Color and Contrast

| Text | Contrast |
|---|---|
| Normal | 4.5:1 |
| Large | 3:1 |
| UI components | 3:1 |

## 18. Keyboard Testing

Test:

```text
Tab
Shift+Tab
Enter
Space
Arrow keys
Escape
```

Keyboard checklist:

- [ ] Sidebar works.
- [ ] Mobile drawer works.
- [ ] Notes panel works.
- [ ] Search works.
- [ ] Login works.
- [ ] Buy flow starts.
- [ ] Bottom nav works.
- [ ] Focus order is logical.

## 19. Screen Reader Checks

At minimum:

- Chrome + NVDA on Windows if available.
- Safari + VoiceOver if available.
- Browser accessibility tree inspection.

Checklist:

- [ ] Page title makes sense.
- [ ] Landmarks exist.
- [ ] Headings are logical.
- [ ] Buttons have names.
- [ ] Forms have labels.
- [ ] Errors are announced.
- [ ] Media has labels.
- [ ] Sidebar state is clear.

## 20. MVP Acceptance Criteria

The platform is accessible enough for MVP only when:

- chapters use logical headings;
- images have alt text;
- audio has transcripts;
- videos have captions or summaries;
- sidebar works by keyboard;
- notes UI works by keyboard;
- forms have labels;
- contrast passes;
- mobile layout reflows;
- paid access flow is clear.

## 21. References

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI Tutorials: https://www.w3.org/WAI/tutorials/
