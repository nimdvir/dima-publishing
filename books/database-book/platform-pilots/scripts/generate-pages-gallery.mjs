/**
 * Generates the GitHub Pages root gallery and platform-pilots.json manifest
 * from books/database-book/platform-pilots/pilots.json.
 *
 * Usage:
 *   node books/database-book/platform-pilots/scripts/generate-pages-gallery.mjs <output-dir>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pilotsPath = path.resolve(__dirname, '..', 'pilots.json');
const outputDir = path.resolve(process.argv[2] ?? 'pages');

const pilots = JSON.parse(fs.readFileSync(pilotsPath, 'utf8')).filter(
  (pilot) => pilot.pages === true,
);

const statusClass = {
  Current: 'badge--current',
  Reference: 'badge--reference',
  Alternative: 'badge--alternative',
  Archived: 'badge--archived',
  Experimental: 'badge--experimental',
  'Static Preview': 'badge--static',
};

const manifest = pilots.map((pilot) => ({
  id: pilot.folder,
  title: pilot.title,
  status: pilot.status,
  framework: pilot.framework,
  path: `./platform-pilots/${pilot.folder}/${pilot.entryQuery ?? ''}`,
}));

const cards = pilots
  .map((pilot) => {
    const href = `./platform-pilots/${pilot.folder}/${pilot.entryQuery ?? ''}`;
    const badge = statusClass[pilot.status] ?? 'badge--experimental';
    return `
      <article class="card">
        <div class="card__header">
          <h2>${escapeHtml(pilot.title)}</h2>
          <span class="badge ${badge}">${escapeHtml(pilot.status)}</span>
        </div>
        <p class="card__folder">${escapeHtml(pilot.folder)}</p>
        <p class="card__description">${escapeHtml(pilot.description)}</p>
        <p class="card__meta">${escapeHtml(pilot.framework)}</p>
        <a class="card__link" href="${href}">Open pilot</a>
      </article>`;
  })
  .join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DIMA Publishing — Database Book Platform Pilots</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #ffffff;
      --surface: #fafafa;
      --border: #e4e4e7;
      --text: #18181b;
      --muted: #71717a;
      --accent: #4f46e5;
      --focus: #2563eb;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
    }
    .wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 2.5rem 1.25rem 4rem;
    }
    header { margin-bottom: 2rem; }
    h1 { margin: 0 0 0.5rem; font-size: 2rem; }
    .intro { color: var(--muted); max-width: 52rem; }
    .grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
    .card {
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem;
      background: var(--surface);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .card__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .card h2 { margin: 0; font-size: 1.1rem; }
    .card__folder {
      margin: 0;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.85rem;
      color: var(--muted);
    }
    .card__description, .card__meta { margin: 0; color: var(--muted); }
    .card__link {
      margin-top: auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.55rem 0.9rem;
      border-radius: 8px;
      background: var(--accent);
      color: #fff;
      text-decoration: none;
      font-weight: 600;
    }
    .card__link:focus-visible {
      outline: 3px solid var(--focus);
      outline-offset: 2px;
    }
    .badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      white-space: nowrap;
      border: 1px solid var(--border);
      background: #fff;
    }
    .badge--current { border-color: #4f46e5; color: #4338ca; }
    .badge--reference { border-color: #0891b2; color: #0e7490; }
    .badge--alternative { border-color: #d97706; color: #b45309; }
    .badge--archived { border-color: #a1a1aa; color: #52525b; }
    .badge--experimental { border-color: #7c3aed; color: #6d28d9; }
    .badge--static { border-color: #059669; color: #047857; }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1>DIMA Publishing — Database Book Platform Pilots</h1>
      <p class="intro">
        Prototype interfaces for the digital edition of
        <em>Using Data to Drive Business Performance</em>.
      </p>
    </header>
    <section class="grid" aria-label="Platform pilots">
      ${cards}
    </section>
  </div>
</body>
</html>
`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
fs.writeFileSync(
  path.join(outputDir, 'platform-pilots.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
