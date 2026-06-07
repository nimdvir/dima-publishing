import { type HeadingTocItem } from '../utils/headings';

interface OnThisPageProps {
  headings: HeadingTocItem[];
}

/** Scroll to a heading by ID using smooth (or instant for reduced-motion). */
function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}

/** Right-side sticky rail listing H2/H3 headings for in-page navigation. */
export default function OnThisPage({ headings }: OnThisPageProps) {
  if (headings.length === 0) {
    return (
      <aside className="on-this-page" aria-label="On this page">
        <h4 className="otp-title">On this page</h4>
        <p className="otp-empty">No subheadings on this page.</p>
      </aside>
    );
  }

  return (
    <aside className="on-this-page" aria-label="On this page">
      <h4 className="otp-title">On this page</h4>
      <nav>
        <ul className="otp-list">
          {headings.map(h => (
            <li key={h.id} className={`otp-item otp-h${h.level}`}>
              <a
                href={`#${h.id}`}
                className="otp-link"
                onClick={e => {
                  e.preventDefault();
                  scrollToHeading(h.id);
                  // Update URL hash without page jump (scrollToHeading handles the jump)
                  history.replaceState(null, '', `#${h.id}`);
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

/**
 * Mobile-only collapsible "On this page" block rendered above the article.
 * Uses <details>/<summary> for expand/collapse behavior.
 */
export function OnThisPageMobile({ headings }: OnThisPageProps) {
  if (headings.length === 0) return null;

  return (
    <details className="otp-mobile" aria-label="On this page">
      <summary className="otp-mobile-summary">On this page</summary>
      <nav className="otp-mobile-nav">
        <ul className="otp-list">
          {headings.map(h => (
            <li key={h.id} className={`otp-item otp-h${h.level}`}>
              <a
                href={`#${h.id}`}
                className="otp-link"
                onClick={e => {
                  e.preventDefault();
                  scrollToHeading(h.id);
                  history.replaceState(null, '', `#${h.id}`);
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
