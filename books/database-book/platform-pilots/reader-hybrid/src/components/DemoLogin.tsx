import { useState } from 'react';

interface DemoLoginProps {
  onLogin: (netId: string, studentId: string) => void;
  onCancel: () => void;
}

export default function DemoLogin({ onLogin, onCancel }: DemoLoginProps) {
  const [netId, setNetId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (netId.trim() && studentId.trim()) {
      onLogin(netId.trim(), studentId.trim());
      setSubmitted(true);
    }
  };

  return (
    <div className="demo-login-page">
      <div className="login-card">
        <h2>Demo Login / Access</h2>
        <p className="login-desc">
          This is a visual demonstration only. No real authentication is performed.
        </p>

        {submitted ? (
          <div className="login-success">
            <p>&#x2705; Signed in as <strong>{netId}</strong>. You can now explore the reader.</p>
            <button className="cta-btn cta-primary" onClick={onCancel}>
              Continue to Reader
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <label className="form-field">
              <span className="field-label">NetID</span>
              <input
                type="text"
                className="field-input"
                value={netId}
                onChange={e => setNetId(e.target.value)}
                placeholder="e.g. jdoe"
                required
              />
            </label>
            <label className="form-field">
              <span className="field-label">Student ID</span>
              <input
                type="text"
                className="field-input"
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                placeholder="e.g. 00123456"
                required
              />
            </label>
            <div className="login-actions">
              <button type="submit" className="cta-btn cta-primary">
                Continue
              </button>
              <button type="button" className="cta-btn cta-outline" onClick={onCancel}>
                Back
              </button>
            </div>
          </form>
        )}

        <div className="login-trial-info">
          <h3>Trial Access</h3>
          <p>This prototype simulates trial access. No payment or password is required.</p>
        </div>

        <p className="login-disclaimer">
          Demo only &mdash; production login will use institutional authentication or Supabase Auth.
          No passwords, card numbers, or payment info are collected.
        </p>
      </div>
    </div>
  );
}
