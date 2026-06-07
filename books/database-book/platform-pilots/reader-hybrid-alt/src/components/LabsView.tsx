import { useMemo } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { BookLab } from "../types";

type LabsViewProps = {
  labs: BookLab[];
  activeLab: BookLab;
  onNavigateLab: (labId: string) => void;
};

export function LabsView({ labs, activeLab, onNavigateLab }: LabsViewProps) {
  const activeIndex = labs.findIndex((lab) => lab.id === activeLab.id);
  const previousLab = activeIndex > 0 ? labs[activeIndex - 1] : null;
  const nextLab = activeIndex >= 0 && activeIndex < labs.length - 1 ? labs[activeIndex + 1] : null;

  const labList = useMemo(
    () =>
      labs.map((lab) => (
        <button
          className={lab.id === activeLab.id ? "active" : ""}
          type="button"
          key={lab.id}
          onClick={() => onNavigateLab(lab.id)}
        >
          <strong>{lab.title}</strong>
          <small>{lab.sourceType}</small>
        </button>
      )),
    [activeLab.id, labs, onNavigateLab],
  );

  return (
    <section className="labs-view">
      <aside className="labs-list" aria-label="Labs">
        <p className="eyebrow">Database Labs</p>
        {labList}
      </aside>

      <article className="labs-content">
        <header className="reader-header">
          <p className="eyebrow">Prototype Labs</p>
          <h1>{activeLab.title}</h1>
          <div className="reader-meta">
            <span className={`source-pill source-${activeLab.sourceType}`}>{activeLab.sourceType}</span>
            <span>{activeLab.exists ? activeLab.sourceFile : "placeholder"}</span>
          </div>
        </header>

        <div className="prototype-note">
          Labs are prototype-only in this build. Empty lab folders fall back to chapter lab question files when available.
        </div>

        <MarkdownRenderer content={activeLab.content} />

        <BottomNavigation
          previous={previousLab ? { id: previousLab.id, title: previousLab.title, eyebrow: "Previous lab" } : null}
          next={nextLab ? { id: nextLab.id, title: nextLab.title, eyebrow: "Next lab" } : null}
          onNavigate={onNavigateLab}
        />
      </article>
    </section>
  );
}
