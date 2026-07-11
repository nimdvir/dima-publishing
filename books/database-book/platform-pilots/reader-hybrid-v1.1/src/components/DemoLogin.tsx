import { useState } from 'react';
import { supabase, supabaseConfigError } from '../lib/supabaseClient';
import {
  activateStudentTrial,
  getMyAccess,
  type AccessStatus,
} from '../lib/courseAccess';

interface DemoLoginProps {
  onLogin: (email: string) => void;
  onCancel: () => void;
}

type AuthMode = 'sign-in' | 'create-account' | 'forgot-password';

export default function DemoLogin({ onLogin, onCancel }: DemoLoginProps) {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [accessDetails, setAccessDetails] = useState<AccessStatus | null>(null);

  async function handleAuth(action: 'sign-in' | 'create-account') {
    setLoading(true);
    setAuthError('');
    setAuthSuccess('');
    setAccessDetails(null);

    const cleanEmail = email.trim().toLowerCase();

    try {
      if (!supabase) {
        setAuthError(supabaseConfigError ?? 'Reader login is not configured yet.');
        setLoading(false);
        return;
      }

      let result;

      if (action === 'create-account') {
        result = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
      }

      if (result.error) {
        setAuthError(result.error.message);
        setLoading(false);
        return;
      }

      // If email confirmation is required (no session yet)
      if (!result.data.session) {
        setAuthSuccess(
          'Account created. Check your email if confirmation is enabled, then sign in.'
        );
        setLoading(false);
        return;
      }

      // Try roster check and trial activation
      try {
        const activation = await activateStudentTrial();
        const access = await getMyAccess();
        setAccessDetails(access);

        if (activation.allowed) {
          const expireMsg = activation.free_until
            ? ` through ${new Date(activation.free_until).toLocaleDateString()}`
            : '';
          setAuthSuccess(
            `Welcome, ${activation.first_name}. Your reader access is active${expireMsg}.`
          );
          onLogin(cleanEmail);
        } else if (activation.reason === 'email_not_on_roster') {
          setAuthError(
            'This email is not on the course roster. Please contact Prof. Dvir.'
          );
        } else {
          setAuthError(`Access check: ${activation.reason}`);
        }
      } catch (accessError) {
        setAuthError(
          accessError instanceof Error ? accessError.message : String(accessError)
        );
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : String(err));
    }

    setLoading(false);
  }

  async function handleForgotPassword() {
    setLoading(true);
    setAuthError('');
    setAuthSuccess('');

    const cleanEmail = email.trim().toLowerCase();

    try {
      if (!supabase) {
        setAuthError(supabaseConfigError ?? 'Reader login is not configured yet.');
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/account/update-password`,
      });

      if (error) {
        setAuthError(error.message);
      } else {
        // Generic message avoids revealing whether an account exists.
        setAuthSuccess(
          'If an account exists for that email, a password reset link is on its way. Open the link in your inbox to choose a new password.'
        );
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : String(err));
    }

    setLoading(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot-password') {
      if (!email.trim()) return;
      handleForgotPassword();
      return;
    }
    if (!email.trim() || !password.trim()) return;
    handleAuth(mode);
  };

  const submitLabel = loading
    ? mode === 'forgot-password'
      ? 'Sending...'
      : 'Signing in...'
    : mode === 'sign-in'
      ? 'Sign in'
      : mode === 'create-account'
        ? 'Create account'
        : 'Send reset link';

  const hasAuthFeedback = !!authSuccess;
  const hasReaderAccess = !!accessDetails;

  return (
    <div className="demo-login-page">
      <div className="login-card">
        <h2>Sign in to DIMA Publishing</h2>
        <p className="login-desc">
          Access the BITM 330 Course Reader with your university account.
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

        {hasAuthFeedback ? (
          <div className="login-success">
            <p>{authSuccess}</p>
            {hasReaderAccess ? (
              <button className="cta-btn cta-primary" onClick={onCancel}>
                Continue to reader
              </button>
            ) : (
              <button
                type="button"
                className="cta-btn cta-outline"
                onClick={() => {
                  setMode('sign-in');
                  setAuthSuccess('');
                }}
              >
                Back to sign in
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <label className="form-field" htmlFor="login-email">
              <span className="field-label">Email address</span>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="username"
                className="field-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ndvir@albany.edu"
                required
                disabled={loading}
              />
            </label>
            {mode !== 'forgot-password' && (
              <label className="form-field" htmlFor="login-password">
                <span className="field-label">Password</span>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete={mode === 'create-account' ? 'new-password' : 'current-password'}
                  className="field-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </label>
            )}

            {authError && (
              <div className="login-trial-info" style={{ background: '#fee2e2', color: '#991b1b' }}>
                <p style={{ margin: 0, color: '#991b1b' }}>{authError}</p>
              </div>
            )}

            <div className="login-actions">
              <button type="submit" className="cta-btn cta-primary" disabled={loading}>
                {submitLabel}
              </button>
              <button
                type="button"
                className="cta-btn cta-outline"
                onClick={onCancel}
                disabled={loading}
              >
                Back
              </button>
            </div>

            {mode === 'sign-in' && (
              <button
                type="button"
                className="login-forgot-link"
                onClick={() => {
                  setMode('forgot-password');
                  setAuthError('');
                  setAuthSuccess('');
                }}
                disabled={loading}
              >
                Forgot password?
              </button>
            )}
            {mode === 'forgot-password' && (
              <button
                type="button"
                className="login-forgot-link"
                onClick={() => {
                  setMode('sign-in');
                  setAuthError('');
                  setAuthSuccess('');
                }}
                disabled={loading}
              >
                Back to sign in
              </button>
            )}
          </form>
        )}

        {!hasAuthFeedback && !authError && (
          <div className="login-trial-info">
            <h3>Course reader access</h3>
            <p>
              Create an account with your university email. Eligible students
              receive free access during the first week.
            </p>
          </div>
        )}

        <p className="login-disclaimer">
          Account authentication is not connected yet. Preview access is stored locally in this browser.
        </p>
      </div>
    </div>
  );
}
