from __future__ import annotations

from html import unescape
from pathlib import Path
from shutil import copy2, rmtree
import math
import os
import re
import sys
from urllib.parse import quote, unquote


REPO_ROOT = Path(__file__).resolve().parents[3]
PROTOTYPE_ROOT = Path(__file__).resolve().parent
BOOK_ROOT = PROTOTYPE_ROOT / "book"
CHAPTERS_ROOT = BOOK_ROOT / "chapters"
ASSETS_ROOT = PROTOTYPE_ROOT / "assets" / "book-content"
sys.path.insert(0, str(REPO_ROOT / "book-platform"))

from app.content import get_chapter_parts, get_previous_next, list_chapters  # noqa: E402


CONTENT_URL_RE = re.compile(r'(["\'])/_content/([^"\']+)')
TAG_RE = re.compile(r"<[^>]+>")
WHITESPACE_RE = re.compile(r"\s+")
FIRST_H1_RE = re.compile(r"<h1>.*?</h1>\s*", re.IGNORECASE | re.DOTALL)


def main() -> None:
    chapters = list_chapters()
    if BOOK_ROOT.exists():
        rmtree(BOOK_ROOT)

    CHAPTERS_ROOT.mkdir(parents=True, exist_ok=True)
    ASSETS_ROOT.mkdir(parents=True, exist_ok=True)

    for index, chapter in enumerate(chapters, start=1):
        parts = get_chapter_parts(chapter.slug)
        output_path = CHAPTERS_ROOT / f"{chapter.slug}.html"
        progress_percent = round(index / len(chapters) * 100)
        estimated_minutes = _estimate_minutes(parts)
        section_links = []
        section_html = []

        for part in parts:
            section_id = f"part-{part.slug}"
            section_links.append((section_id, part.label))
            body_html = FIRST_H1_RE.sub("", part.rendered_html, count=1)
            body_html = _rewrite_content_urls(body_html, output_path.parent)
            section_html.append(
                f"""
                <section class=\"reader-section\" id=\"{section_id}\">
                  <span class=\"reader-kicker\">{_html(part.label)}</span>
                  <h2>{_html(part.title)}</h2>
                  {body_html}
                </section>
                """.strip()
            )

        previous_chapter, next_chapter = get_previous_next(chapter.slug)
        output_path.write_text(
            _render_chapter_page(
                chapter_title=chapter.title,
                chapter_number=chapter.number,
                chapter_slug=chapter.slug,
                chapters=chapters,
                progress_percent=progress_percent,
                estimated_minutes=estimated_minutes,
                section_links=section_links,
                section_html="\n".join(section_html),
                previous_chapter=previous_chapter,
                next_chapter=next_chapter,
                part_count=len(parts),
            ),
            encoding="utf-8",
        )

    (BOOK_ROOT / "index.html").write_text(_render_book_index(chapters), encoding="utf-8")
    print(f"Generated {len(chapters)} chapter HTML files in {CHAPTERS_ROOT}")


def _render_book_index(chapters) -> str:
    chapter_links = "\n".join(
    f'<a class="{_current_class(index == 0)}" href="chapters/{chapter.slug}.html">{_html(_chapter_nav_title(chapter.number, chapter.title))}</a>'
        for index, chapter in enumerate(chapters)
    )
    chapter_cards = "\n".join(
        f"""
        <article class=\"chapter-card\">
          <div class=\"chapter-card__header\">
            <div>
              <span class=\"chapter-card__label\">Chapter {chapter.number}</span>
              <h3>{_html(_remove_chapter_prefix(chapter.title))}</h3>
            </div>
            <span class=\"chapter-card__status status--sample\">HTML</span>
          </div>
          <p>Converted from the latest available main chapter draft into a standalone static reader page.</p>
          <div class=\"card-meta\">
            <span class=\"chip\">Static HTML</span>
            <span class=\"chip\">Reader shell</span>
          </div>
          <a class=\"button button--primary\" href=\"chapters/{chapter.slug}.html\">Open chapter</a>
        </article>
        """.strip()
        for chapter in chapters
    )
    return f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  <title>BITM330 Prototype | Full Book</title>
  <link rel=\"icon\" href=\"../assets/favicon.svg\" type=\"image/svg+xml\">
  <link rel=\"stylesheet\" href=\"../styles.css\">
</head>
<body data-page=\"book-index\">
  <a class=\"skip-link\" href=\"#main\">Skip to content</a>
  <header class=\"site-header\">
    <div class=\"site-header__inner\">
      <a class=\"brand\" href=\"../index.html\">
        <span class=\"brand__mark\">DIMA</span>
        <span>
          <strong>DIMA Publishing</strong>
          <small>Digital textbook platform prototype</small>
        </span>
      </a>
      <nav class=\"site-nav\" aria-label=\"Primary\">
        <a href=\"../index.html\">Home</a>
        <a href=\"../dashboard.html\">Dashboard</a>
        <a href=\"index.html\" aria-current=\"page\">Book</a>
        <a href=\"../labs.html\">Labs</a>
        <a href=\"../locked.html\">Access</a>
      </nav>
    </div>
  </header>
  <main id=\"main\" class=\"page-shell page-shell--reader\">
    <button class=\"sidebar-toggle\" type=\"button\" data-sidebar-toggle aria-expanded=\"false\" aria-controls=\"reader-sidebar\">Toggle chapter sidebar</button>
    <div class=\"reader-layout\">
      <aside class=\"reader-sidebar\" id=\"reader-sidebar\" data-reader-sidebar>
        <div class=\"reader-sidebar__top\">
          <p class=\"eyebrow\">Full Book</p>
          <h2>Using Data to Drive Business Performance</h2>
          <div class=\"progress-card\">
            <div class=\"progress-row\">
              <span>Chapters converted</span>
              <strong>{len(chapters)} / {len(chapters)}</strong>
            </div>
            <div class=\"progress-bar\"><span style=\"width:100%\"></span></div>
          </div>
        </div>
        <nav class=\"toc-list\" aria-label=\"Book chapters\">
          {chapter_links}
        </nav>
      </aside>
      <article class=\"reader-main\">
        <header class=\"reader-header\">
          <p class=\"eyebrow\">Static Book Output</p>
          <h1>All chapters are now turned into HTML</h1>
          <p class=\"reader-subtitle\">This folder contains actual generated HTML chapter pages from the latest main chapter drafts. Use the sidebar to move through the book.</p>
          <div class=\"reader-meta\">
            <span>{len(chapters)} chapters</span>
            <span>Sidebar navigation</span>
            <span>Progress bar included</span>
          </div>
        </header>
        <section class=\"reader-body\">
          <section class=\"reader-section\">
            <span class=\"reader-kicker\">Book Entry</span>
            <h2>Click the cover or open any chapter</h2>
            <p>The home-page cover can now act as the entry point into this generated book view. Each chapter page has a left sidebar, a progress bar, and previous or next chapter navigation.</p>
            <figure>
              <img src=\"../assets/book-cover.svg\" alt=\"Prototype cover for the BITM330 book\">
              <figcaption>The cover now links into the generated full-book HTML view.</figcaption>
            </figure>
          </section>
          <section class=\"reader-section\">
            <span class=\"reader-kicker\">Chapter List</span>
            <h2>Generated chapter pages</h2>
            <div class=\"chapter-grid\">
              {chapter_cards}
            </div>
          </section>
        </section>
      </article>
    </div>
  </main>
  <script src=\"../script.js\"></script>
</body>
</html>
"""


def _render_chapter_page(
    *,
    chapter_title: str,
    chapter_number: int,
    chapter_slug: str,
    chapters,
    progress_percent: int,
    estimated_minutes: int,
    section_links,
    section_html: str,
    previous_chapter,
    next_chapter,
    part_count: int,
) -> str:
    chapter_links = "\n".join(
    f'<a class="{_current_class(chapter.slug == chapter_slug)}" href="{chapter.slug}.html">{_html(_chapter_nav_title(chapter.number, chapter.title))}</a>'
        for chapter in chapters
    )
    toc_links = "\n".join(
        f'<a href="#{section_id}">{index + 1}. {_html(label)}</a>'
        for index, (section_id, label) in enumerate(section_links)
    )
    previous_link = (
        f'<a class="pager-card" href="{previous_chapter.slug}.html"><small>Previous</small><strong>Chapter {previous_chapter.number}: {_html(previous_chapter.title)}</strong></a>'
        if previous_chapter
        else '<a class="pager-card" href="../index.html"><small>Previous</small><strong>Home</strong></a>'
    )
    next_link = (
        f'<a class="pager-card pager-card--next" href="{next_chapter.slug}.html"><small>Next</small><strong>Chapter {next_chapter.number}: {_html(next_chapter.title)}</strong></a>'
        if next_chapter
        else '<a class="pager-card pager-card--next" href="../labs.html"><small>Next</small><strong>Labs</strong></a>'
    )
    clean_title = _remove_chapter_prefix(chapter_title)
    return f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  <title>{_html(chapter_title)} | BITM330 Prototype</title>
  <link rel=\"icon\" href=\"../../assets/favicon.svg\" type=\"image/svg+xml\">
  <link rel=\"stylesheet\" href=\"../../styles.css\">
</head>
<body data-page=\"generated-chapter\">
  <a class=\"skip-link\" href=\"#main\">Skip to content</a>
  <header class=\"site-header\">
    <div class=\"site-header__inner\">
      <a class=\"brand\" href=\"../../index.html\">
        <span class=\"brand__mark\">DIMA</span>
        <span>
          <strong>DIMA Publishing</strong>
          <small>Digital textbook platform prototype</small>
        </span>
      </a>
      <nav class=\"site-nav\" aria-label=\"Primary\">
        <a href=\"../../index.html\">Home</a>
        <a href=\"../../dashboard.html\">Dashboard</a>
        <a href=\"../index.html\">Book</a>
        <a href=\"../../labs.html\">Labs</a>
        <a href=\"../../locked.html\">Access</a>
      </nav>
    </div>
  </header>
  <main id=\"main\" class=\"page-shell page-shell--reader\">
    <button class=\"sidebar-toggle\" type=\"button\" data-sidebar-toggle aria-expanded=\"false\" aria-controls=\"reader-sidebar\">Toggle chapter sidebar</button>
    <div class=\"reader-layout\">
      <aside class=\"reader-sidebar\" id=\"reader-sidebar\" data-reader-sidebar>
        <div class=\"reader-sidebar__top\">
          <p class=\"eyebrow\">Chapter Navigation</p>
          <h2>{_html(chapter_title)}</h2>
          <div class=\"progress-card\">
            <div class=\"progress-row\">
              <span>Progress through book</span>
              <strong>{progress_percent}%</strong>
            </div>
            <div class=\"progress-bar\"><span style=\"width:{progress_percent}%\"></span></div>
          </div>
        </div>
        <nav class=\"toc-list\" aria-label=\"Chapter parts\">
          {toc_links}
        </nav>
        <div class=\"sidebar-divider\"></div>
        <div class=\"mini-catalog\">
          <p class=\"eyebrow\">All Chapters</p>
          <div class=\"mini-catalog__list\">
            {chapter_links}
          </div>
        </div>
      </aside>
      <article class=\"reader-main\">
        <header class=\"reader-header\">
          <p class=\"eyebrow\">Chapter {chapter_number}</p>
          <h1>{_html(clean_title)}</h1>
          <p class=\"reader-subtitle\">Generated from the latest available chapter draft and companion parts.</p>
          <div class=\"reader-meta\">
            <span>{estimated_minutes} min estimated reading</span>
            <span>{part_count} content areas</span>
            <span>Static HTML output</span>
          </div>
        </header>
        <section class=\"reader-body\">
          {section_html}
        </section>
        <footer class=\"reader-footer\">
          {previous_link}
          {next_link}
        </footer>
      </article>
    </div>
  </main>
  <script src=\"../../script.js\"></script>
</body>
</html>
"""


def _rewrite_content_urls(rendered_html: str, page_dir: Path) -> str:
    def replace(match: re.Match[str]) -> str:
        quote_char = match.group(1)
        repo_relative = Path(unquote(match.group(2)))
        source_path = REPO_ROOT / repo_relative
        if not source_path.exists() or not source_path.is_file():
            return match.group(0)

        destination_path = ASSETS_ROOT / repo_relative
        destination_path.parent.mkdir(parents=True, exist_ok=True)
        if not destination_path.exists():
            copy2(source_path, destination_path)

        relative_url = os.path.relpath(destination_path, page_dir).replace("\\", "/")
        encoded_url = "/".join(quote(part) for part in relative_url.split("/"))
        return f"{quote_char}{encoded_url}"

    return CONTENT_URL_RE.sub(replace, rendered_html)


def _estimate_minutes(parts) -> int:
    text = " ".join(TAG_RE.sub(" ", part.rendered_html) for part in parts)
    words = WHITESPACE_RE.sub(" ", unescape(text)).split()
    return max(5, math.ceil(len(words) / 220))


def _remove_chapter_prefix(title: str) -> str:
  return re.sub(r"^Chapter\s+\d+\s*[:\-–—]\s*", "", title).strip()


def _chapter_nav_title(chapter_number: int, chapter_title: str) -> str:
  return f"Chapter {chapter_number}: {_remove_chapter_prefix(chapter_title)}"


def _current_class(is_current: bool) -> str:
    return "is-current" if is_current else ""


def _html(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


if __name__ == "__main__":
    main()