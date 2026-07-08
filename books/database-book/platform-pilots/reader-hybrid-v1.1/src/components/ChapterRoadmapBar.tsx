import { useState, useEffect, useRef } from "react";
import type { RoadmapItem } from "../types";
import { ListTree } from "lucide-react";

interface ChapterRoadmapBarProps {
  items: RoadmapItem[];
  onTopicClick: (anchor: string) => void;
  /** When true, renders as an always-visible inline TOC grid instead of a dropdown. */
  inline?: boolean;
}

export default function ChapterRoadmapBar({
  items,
  onTopicClick,
  inline = false,
}: ChapterRoadmapBarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click (dropdown mode only)
  useEffect(() => {
    if (!open || inline) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, inline]);

  if (!items || items.length === 0) return null;

  // ── Inline mode: collapsible TOC grid (collapsed by default) ──
  if (inline) {
    return (
      <details className="roadmap-inline">
        <summary className="roadmap-inline-heading">
          <ListTree size={16} />
          <span>Chapter Roadmap</span>
          <span className="roadmap-inline-count">{items.length} topics</span>
        </summary>
        <div className="roadmap-inline-grid">
          {items.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              className="roadmap-inline-card"
              onClick={(e) => {
                e.preventDefault();
                onTopicClick(item.anchor);
              }}
            >
              <span className="roadmap-inline-topic">{item.topic}</span>
              <span className="roadmap-inline-why">{item.whyItMatters}</span>
            </a>
          ))}
        </div>
      </details>
    );
  }

  // ── Dropdown mode (existing) ──
  return (
    <div className="roadmap-dropdown" ref={ref}>
      <button
        className="roadmap-dropdown-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Roadmap {open ? "\u25B2" : "\u25BC"}
      </button>
      {open && (
        <div className="roadmap-dropdown-menu">
          {items.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              className="roadmap-dropdown-link"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                onTopicClick(item.anchor);
              }}
            >
              <span className="roadmap-topic">{item.topic}</span>
              <span className="roadmap-why">{item.whyItMatters}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
