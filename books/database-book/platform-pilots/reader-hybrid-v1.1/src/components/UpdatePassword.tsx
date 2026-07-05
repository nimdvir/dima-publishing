import { useState } from 'react';
import { supabase, supabaseConfigError } from '../lib/supabaseClient';

interface UpdatePasswordProps {
  onDone: () => void;
}

export default function UpdatePassword({ onDone }: UpdatePasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!supabase) {
      setAuthError(supabaseConfigError ?? 'Reader login is not configured yet.');
      return;
    }

    if (password.length < 8) {
      setAuthError('Please choose a password with at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setAuthError(
        'This reset link may have expired or already been used. Please request a new password reset email.'
      );
      return;
    }

    setPassword('');
    setConfirmPassword('');
    setAuthSuccess('Your password has been updated. You can now sign in.');
  }

  return (
    <div className="demo-login-page">
      <div className="login-card">
        <h2>Choose a new password</h2>
        <p className="login-desc">
          Enter a new password for your DIMA Publishing reader account.
        </p>

        {authSuccess ? (
          <div className="login-success">
            <p>{authSuccess}</p>
            <button className="cta-btn cta-primary" onClick={onDone}>
              Back to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <label className="form-field">
              <span className="field-label">New password</span>
              <input
                type="password"
                className="field-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                disabled={loading}
                minLength={8}
              />
            </label>
            <label className="form-field">
              <span className="field-label">Confirm new password</span>
              <input
                type="password"
                className="field-input"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                disabled={loading}
                minLength={8}
              />
            </label>

            {authError && (
              <div className="login-trial-info" style={{ background: '#fee2e2', color: '#991b1b' }}>
                <p style={{ margin: 0, color: '#991b1b' }}>{authError}</p>
              </div>
            )}

            <div className="login-actions">
              <button type="submit" className="cta-btn cta-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update password'}
              </button>
              <button
                type="button"
                className="cta-btn cta-outline"
                onClick={onDone}
                disabled={loading}
              >
                Back to sign in
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
