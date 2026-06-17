import { buildFeedbackUrl } from "../lib/feedback";

export function FeedbackLink() {
  const handleClick = () => {
    const feedbackUrl = buildFeedbackUrl();
    const width = 640;
    const height = 800;
    const left = window.screenX + window.outerWidth - width - 24;
    const top = window.screenY + 80;
    const features = [
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`,
      "noopener",
      "noreferrer",
    ].join(",");
    window.open(feedbackUrl, "reader-feedback", features);
  };

  return (
    <button type="button" className="floating-feedback-link" onClick={handleClick}>
      <span aria-hidden="true">💬</span> Report issue
    </button>
  );
}
