import { useState } from "react";
import type { BookPage } from "../types";

type Message = {
  role: "student" | "assistant";
  content: string;
};

type AiAssistantProps = {
  activePage: BookPage | null;
};

const SUGGESTED_PROMPTS = [
  "Explain this page in simpler language.",
  "Give me a business example.",
  "Quiz me on this section.",
  "Summarize the key concepts.",
  "Help me understand the SQL example.",
  "Connect this idea to the lab.",
];

export function AiAssistant({ activePage }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Prototype only - AI responses are simulated in this build.",
    },
  ]);
  const [prompt, setPrompt] = useState("");

  function submitPrompt(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "student", content: trimmed },
      {
        role: "assistant",
        content:
          "This is a prototype response. In the production version, this assistant will use the current page context.",
      },
    ]);
    setPrompt("");
  }

  return (
    <section className="ai-view">
      <header className="reader-header">
        <p className="eyebrow">Study Assistant</p>
        <h1>Simulated AI Tutor</h1>
        <div className="reader-meta">
          <span>Prototype only</span>
          {activePage && <span>{activePage.chapterId.toUpperCase()}</span>}
          {activePage && <span>{activePage.sectionTitle}</span>}
          {activePage && <span>Page {activePage.pageNumber}</span>}
        </div>
      </header>

      <div className="suggested-prompts" aria-label="Suggested prompts">
        {SUGGESTED_PROMPTS.map((item) => (
          <button type="button" key={item} onClick={() => submitPrompt(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="chat-panel" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`message message-${message.role}`} key={`${message.role}-${index}`}>
            <strong>{message.role === "student" ? "You" : "Assistant"}</strong>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          submitPrompt(prompt);
        }}
      >
        <label htmlFor="assistant-prompt">Prompt</label>
        <input
          id="assistant-prompt"
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask a study question..."
        />
        <button className="button button-primary" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}
