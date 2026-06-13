import { useState } from 'react';

interface DemoLoginProps {
  onLogin: (netId: string, studentId: string) => void;
  onCancel: () => void;
}

type AuthMode = 'sign-in' | 'create-account';

export default function DemoLogin({ onLogin, onCancel }: DemoLoginProps) {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [identifier, setIdentifier] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim() && accessCode.trim()) {
      onLogin(identifier.trim(), accessCode.trim());
      setSubmitted(true);
    }
  };

  const submitLabel = mode === 'sign-in' ? 'Sign in' : 'Create account';

  return (
    <div className="demo-login-page">
      <div className="login-card">
        <h2>Sign in to DIMA Publishing</h2>
        <p className="login-desc">
          Use your course access details to continue reading and keep your work organized.
        </p>

        <div className="login-mode-toggle" role="tablist" aria-label="Account mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'sign-in'}
            className={`login-mode-btn ${mode === 'sign-in' ? 'active' : ''}`}
            onClick={() => setMode('sign-in')}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'create-account'}
            className={`login-mode-btn ${mode === 'create-account' ? 'active' : ''}`}
            onClick={() => setMode('create-account')}
          >
            Create account
          </button>
        </div>

        {submitted ? (
          <div className="login-success">
            <p>Signed in as <strong>{identifier}</strong>. You can now continue to the reader.</p>
            <button className="cta-btn cta-primary" onClick={onCancel}>
              Return home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <label className="form-field">
              <span className="field-label">Email or NetID</span>
              <input
                type="text"
                className="field-input"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </label>
            <label className="form-field">
              <span className="field-label">Student ID or access code</span>
              <input
                type="text"
                className="field-input"
                value={accessCode}
                onChange={e => setAccessCode(e.target.value)}
                placeholder="e.g. 00123456"
                required
              />
            </label>
            <div className="login-actions">
              <button type="submit" className="cta-btn cta-primary">
                {submitLabel}
              </button>
              <button type="button" className="cta-btn cta-outline" onClick={onCancel}>
                Back
              </button>
            </div>
          </form>
        )}

        <div className="login-trial-info">
          <h3>Reader account</h3>
          <p>
            Account authentication is not connected yet. Preview access is stored locally in this browser.
          </p>
        </div>
      </div>
    </div>
  );
}
