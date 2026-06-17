import { buildFeedbackUrl } from "../lib/feedback";

export function FeedbackLink() {
  const handleClick = () => {
    const feedbackUrl = buildFeedbackUrl();
    window.open(feedbackUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" className="feedback-link" onClick={handleClick}>
      Report an issue
    </button>
  );
}
