import { buildFeedbackUrl } from "../lib/feedback";

export function FeedbackLink() {
  const handleClick = () => {
    const feedbackUrl = buildFeedbackUrl();
    window.open(feedbackUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" className="floating-feedback-link" onClick={handleClick}>
      <span aria-hidden="true">💬</span> Report issue
    </button>
  );
}
