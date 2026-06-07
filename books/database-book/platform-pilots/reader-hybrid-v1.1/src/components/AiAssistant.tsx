import { useState, useRef, useEffect } from 'react';
import type { BookPage, ChatMessage } from '../types';

const SUGGESTED_PROMPTS = [
  'Explain this page in simpler language.',
  'Give me a business example.',
  'Quiz me on this section.',
  'Summarize the key concepts.',
  'Help me understand the SQL example.',
  'Connect this idea to the lab.',
];

interface AiAssistantProps {
  currentPage: BookPage | null;
}

export default function AiAssistant({ currentPage }: AiAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (role: 'user' | 'assistant', text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role,
        text,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addMessage('user', trimmed);
    setInput('');

    // Simulated response
    setTimeout(() => {
      addMessage(
        'assistant',
        'This is a prototype response. In the production version, this assistant will use the current page context to provide helpful, accurate answers.'
      );
    }, 600);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    addMessage('user', prompt);
    setTimeout(() => {
      addMessage(
        'assistant',
        'This is a prototype response. In the production version, this assistant will use the current page context to provide helpful, accurate answers.'
      );
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-assistant">
      <div className="ai-header">
        <h2>AI Assistant</h2>
        <p className="ai-disclaimer">
          Prototype only &mdash; AI responses are simulated in this build.
        </p>
      </div>

      {/* Context chips */}
      {currentPage && (
        <div className="ai-context">
          <span className="context-chip">
            {currentPage.chapterId.toUpperCase()}
          </span>
          <span className="context-chip">
            {currentPage.sectionTitle}
          </span>
          {currentPage.totalPages > 1 && (
            <span className="context-chip">
              Page {currentPage.pageNumber}/{currentPage.totalPages}
            </span>
          )}
        </div>
      )}

      {/* Chat area */}
      <div className="ai-chat">
        {messages.length === 0 && (
          <div className="ai-welcome">
            <p>Ask me anything about the current chapter or section.</p>
            <div className="ai-suggestions">
              {SUGGESTED_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  className="suggestion-chip"
                  onClick={() => handleSuggestedPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`chat-message chat-${msg.role}`}>
            <div className="chat-avatar">
              {msg.role === 'user' ? '\u{1F464}' : '\u{1F916}'}
            </div>
            <div className="chat-bubble">
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="ai-input-area">
        <textarea
          className="ai-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about this section..."
          rows={2}
        />
        <button
          className="cta-btn cta-primary ai-send-btn"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
