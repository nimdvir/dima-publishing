import type { BookLab } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface LabsViewProps {
  labs: BookLab[];
  activeLab: BookLab;
  onSelectLab: (lab: BookLab) => void;
}

export default function LabsView({ labs, activeLab, onSelectLab }: LabsViewProps) {
  const activeIdx = labs.findIndex(l => l.id === activeLab.id);
  const hasPrev = activeIdx > 0;
  const hasNext = activeIdx < labs.length - 1;

  return (
    <div className="labs-view">
      {/* Lab tabs */}
      <div className="lab-tabs">
        {labs.map(lab => (
          <button
            key={lab.id}
            className={`lab-tab ${lab.id === activeLab.id ? 'active' : ''}`}
            onClick={() => onSelectLab(lab)}
          >
            <span className="lab-tab-num">{lab.id.replace('lab-', 'Lab ')}</span>
            <span className="lab-tab-title">{lab.title}</span>
            <span className={`source-badge source-${lab.sourceType}`}>
              {lab.sourceType}
            </span>
          </button>
        ))}
      </div>

      {/* Lab content */}
      <div className="lab-content">
        <div className="lab-header">
          <h2>{activeLab.title}</h2>
          <div className="lab-meta">
            <span className={`source-badge source-${activeLab.sourceType}`}>
              {activeLab.sourceType}
            </span>
          </div>
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
          Labs are prototype-only and not submission-enabled. No login required.
        </div>
      </div>
    </div>
  );
}
