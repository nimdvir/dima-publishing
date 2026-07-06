import { useEffect, useState } from 'react';
import { supabase, supabaseConfigError } from '../lib/supabaseClient';

interface UpdatePasswordProps {
  onDone: () => void;
}

export default function UpdatePassword({ onDone }: UpdatePasswordProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  // Opening the reset link puts a recovery token in the URL. Supabase parses it
  // and establishes a temporary session. Wait for that session before allowing
  // the password update.
  useEffect(() => {
    if (!supabase) {
      setError(supabaseConfigError ?? 'Reader login is not configured yet.');
      return;
    }
    const client = supabase;

    client.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Choose a password with at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('The two passwords do not match.');
      return;
    }
    if (!supabase) {
      setError(supabaseConfigError ?? 'Reader login is not configured yet.');
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSuccess(true);
  }

  return (
    <div className="demo-login-page">
      <div className="login-card">
        <h2>Choose a new password</h2>

        {success ? (
          <div className="login-success">
            <p>
              Your password has been updated. You can now sign in with your new
              password.
            </p>
            <button className="cta-btn cta-primary" onClick={onDone}>
              Continue to sign in
            </button>
          </div>
        ) : !ready ? (
          <>
            <p className="login-desc">
              Open this page from the password reset link in your email. If you
              arrived here directly or the link has expired, request a new reset
              link from the sign-in page.
            </p>
            {error && (
              <div
                className="login-trial-info"
                style={{ background: '#fee2e2', color: '#991b1b' }}
              >
                <p style={{ margin: 0, color: '#991b1b' }}>{error}</p>
              </div>
            )}
            <div className="login-actions">
              <button className="cta-btn cta-outline" onClick={onDone}>
                Back to sign in
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <p className="login-desc">Enter a new password for your account.</p>
            <label className="form-field" htmlFor="new-password">
              <span className="field-label">New password</span>
              <input
                id="new-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                className="field-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                disabled={loading}
              />
            </label>
            <label className="form-field" htmlFor="confirm-password">
              <span className="field-label">Confirm new password</span>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                className="field-input"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Re-enter your new password"
                required
                disabled={loading}
              />
            </label>

            {error && (
              <div
                className="login-trial-info"
                style={{ background: '#fee2e2', color: '#991b1b' }}
              >
                <p style={{ margin: 0, color: '#991b1b' }}>{error}</p>
              </div>
            )}

            <div className="login-actions">
              <button
                type="submit"
                className="cta-btn cta-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update password'}
              </button>
              <button
                type="button"
                className="cta-btn cta-outline"
                onClick={onDone}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
