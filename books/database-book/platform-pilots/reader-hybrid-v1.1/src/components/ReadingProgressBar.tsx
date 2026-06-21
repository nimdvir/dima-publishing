import { useEffect, useState } from "react";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { getAllProgress, type ChapterProgress } from "../lib/readingProgress";

interface ReadingProgressBarProps {
  /** If provided, shows per-chapter progress in compact mode. */
  chapterId?: string;
  /** Compact mode: just a single progress pill. */
  compact?: boolean;
  className?: string;
}

export default function ReadingProgressBar({
  chapterId,
  compact = false,
  className = "",
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState<ChapterProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProgress()
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <span
        className={`reading-progress-bar reading-progress-loading ${className}`}
      >
        <Loader2 size={12} className="spinner" />
      </span>
    );
  }

  if (compact) {
    // Compact mode: show "3/15 completed" style pill
    const completed = progress.filter((p) => p.status === "completed").length;
    const inProgress = progress.filter(
      (p) => p.status === "in_progress",
    ).length;
    const total = completed + inProgress;
    if (total === 0) return null;

    return (
      <span
        className={`reading-progress-bar reading-progress-compact ${className}`}
      >
        <CheckCircle size={12} />
        <span className="progress-label">
          {completed}/{total} done
        </span>
      </span>
    );
  }

  // Chapter mode: show status icon for a specific chapter
  if (chapterId) {
    const chapterProgress = progress.find((p) => p.chapter_id === chapterId);
    if (!chapterProgress) return null;

    if (chapterProgress.status === "completed") {
      return (
        <span
          className={`reading-progress-bar reading-progress-done ${className}`}
        >
          <CheckCircle size={14} className="progress-icon-done" />
        </span>
      );
    }

    return (
      <span
        className={`reading-progress-bar reading-progress-active ${className}`}
      >
        <Circle size={14} className="progress-icon-active" />
      </span>
    );
  }

  return null;
}
