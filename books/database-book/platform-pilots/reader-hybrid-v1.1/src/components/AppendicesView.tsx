import type { BookAppendix } from "../types";
import MarkdownRenderer from "./MarkdownRenderer";

interface AppendicesViewProps {
  appendices: BookAppendix[];
  activeAppendix: BookAppendix;
  onSelectAppendix: (appendix: BookAppendix) => void;
}

const APPENDIX_SHORT: Record<string, string> = {
  "appendix-a": "A",
  "appendix-b": "B",
  "appendix-c": "C",
};

export default function AppendicesView({
  appendices,
  activeAppendix,
  onSelectAppendix,
}: AppendicesViewProps) {
  const activeIdx = appendices.findIndex((a) => a.id === activeAppendix.id);
  const hasPrev = activeIdx > 0;
  const hasNext = activeIdx < appendices.length - 1;

  return (
    <div className="labs-view">
      {/* Appendix tabs */}
      <div className="lab-tabs">
        {appendices.map((app) => (
          <button
            key={app.id}
            className={`lab-tab ${app.id === activeAppendix.id ? "active" : ""}`}
            onClick={() => onSelectAppendix(app)}
          >
            <span className="lab-tab-num">
              App {APPENDIX_SHORT[app.id] || app.id}
            </span>
            <span className="lab-tab-title">
              {app.title.replace(/^Appendix [A-C]: /, "")}
            </span>
          </button>
        ))}
      </div>

      {/* Appendix content */}
      <div className="lab-content">
        <div className="lab-header">
          <h2>{activeAppendix.title}</h2>
        </div>

        <div className="lab-body">
          <MarkdownRenderer content={activeAppendix.content} />
        </div>

        {/* Appendix nav */}
        <div className="lab-nav">
          <button
            className="cta-btn cta-outline"
            disabled={!hasPrev}
            onClick={() =>
              hasPrev && onSelectAppendix(appendices[activeIdx - 1])
            }
          >
            &#x2190; Previous Appendix
          </button>
          <button
            className="cta-btn cta-outline"
            disabled={!hasNext}
            onClick={() =>
              hasNext && onSelectAppendix(appendices[activeIdx + 1])
            }
          >
            Next Appendix &#x2192;
          </button>
        </div>
      </div>
    </div>
  );
}
