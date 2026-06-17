import type { BookLab } from "../types";
import MarkdownRenderer from "./MarkdownRenderer";

interface LabsViewProps {
  labs: BookLab[];
  activeLab: BookLab;
  onSelectLab: (lab: BookLab) => void;
}

export default function LabsView({
  labs,
  activeLab,
  onSelectLab,
}: LabsViewProps) {
  const activeIdx = labs.findIndex((l) => l.id === activeLab.id);
  const hasPrev = activeIdx > 0;
  const hasNext = activeIdx < labs.length - 1;

  // Derive chapter ID from lab ID (lab-01 → ch01, etc.)
  const chapterId = activeLab.id.replace("lab-", "ch");
  const chapterLabel = chapterId.toUpperCase();

  return (
    <div className="labs-view">
      {/* Lab tabs */}
      <div className="lab-tabs">
        {labs.map((lab) => (
          <button
            key={lab.id}
            className={`lab-tab ${lab.id === activeLab.id ? "active" : ""}`}
            onClick={() => onSelectLab(lab)}
          >
            <span className="lab-tab-num">
              {lab.id.replace("lab-", "Lab ")}
            </span>
            <span className="lab-tab-title">{lab.title}</span>
          </button>
        ))}
      </div>

      {/* Lab content */}
      <div className="lab-content">
        <div className="lab-header">
          <h2>{activeLab.title}</h2>
        </div>

        <div className="lab-chapter-link">
          🧪 <strong>{activeLab.title}</strong> extends the{" "}
          <a href={`/book/${chapterId}/lets-build/1`}>
            {chapterLabel} Let's Build
          </a>{" "}
          section. Complete the Let's Build activities first, then apply what
          you learned in this PetVax Veterinary Clinic project.
        </div>

        <div className="lab-body">
          <MarkdownRenderer content={activeLab.content} />
        </div>

        {/* Lab nav */}
        <div className="lab-nav">
          <button
            className="cta-btn cta-outline"
            disabled={!hasPrev}
            onClick={() => hasPrev && onSelectLab(labs[activeIdx - 1])}
          >
            &#x2190; Previous Lab
          </button>
          <button
            className="cta-btn cta-outline"
            disabled={!hasNext}
            onClick={() => hasNext && onSelectLab(labs[activeIdx + 1])}
          >
            Next Lab &#x2192;
          </button>
        </div>

        <div className="lab-notice">
          Labs are for hands-on practice — not submission-enabled.
        </div>
      </div>
    </div>
  );
}
