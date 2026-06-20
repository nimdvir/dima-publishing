import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { activateStudentTrial, getMyAccess } from '../lib/courseAccess';

export default function SupabaseAccessTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);

  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function refreshUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCurrentEmail(user?.email ?? null);
  }

  useEffect(() => {
    refreshUser();

    const { data } = supabase.auth.onAuthStateChange(() => {
      refreshUser();
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function createAccount() {
    setStatus('');
    setErrorMessage('');
    setResult(null);

    const cleanEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/?authTest=1',
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (data.session) {
      setStatus('Account created and signed in.');
    } else {
      setStatus(
        'Account created. Check your email if confirmation is enabled, then sign in.'
      );
    }

    await refreshUser();
  }

  async function signIn() {
    setStatus('');
    setErrorMessage('');
    setResult(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setStatus('Signed in.');
    await refreshUser();
  }

  async function activateTrial() {
    setStatus('');
    setErrorMessage('');
    setResult(null);

    try {
      const activation = await activateStudentTrial();
      const access = await getMyAccess();

      setResult({
        activation,
        access,
      });

      if (activation.allowed) {
        setStatus(`Welcome, ${activation.first_name}. Your access is active.`);
      } else {
        setStatus(`Access check complete: ${activation.reason}`);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setCurrentEmail(null);
    setResult(null);
    setStatus('Signed out.');
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.badge}>BITM 330 Course Reader</div>

        <h1 style={styles.title}>Register for reader access</h1>

        <p style={styles.subtitle}>
          Use your university email to create an account, sign in, and activate
          your free course-reader access.
        </p>

        <div style={styles.form}>
          <label style={styles.label}>
            Email address
            <input
              type="email"
              value={email}
              placeholder="ndvir@albany.edu"
              onChange={(event) => setEmail(event.target.value)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
              style={styles.input}
            />
          </label>

          <div style={styles.buttonGrid}>
            <button type="button" onClick={createAccount} style={styles.primaryButton}>
              Create account
            </button>

            <button type="button" onClick={signIn} style={styles.secondaryButton}>
              Sign in
            </button>

            <button type="button" onClick={activateTrial} style={styles.secondaryButton}>
              Activate access
            </button>

            <button type="button" onClick={signOut} style={styles.ghostButton}>
              Sign out
            </button>
          </div>
        </div>

        <div style={styles.statusPanel}>
          <div style={styles.statusRow}>
            <span style={styles.statusLabel}>Current user</span>
            <span style={styles.statusValue}>{currentEmail || 'Not signed in'}</span>
          </div>

          {status && (
            <div style={styles.successBox}>
              <strong>Status:</strong> {status}
            </div>
          )}

          {errorMessage && (
            <div style={styles.errorBox}>
              <strong>Error:</strong> {errorMessage}
            </div>
          )}
        </div>

        {result ? (
          <details style={styles.details}>
            <summary style={styles.summary}>Technical details</summary>
            <pre style={styles.pre}>{JSON.stringify(result, null, 2)}</pre>
          </details>
        ) : null}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background:
      'linear-gradient(135deg, #eef2ff 0%, #f8fafc 45%, #ecfeff 100%)',
    color: '#0f172a',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 560,
    background: 'rgba(255, 255, 255, 0.94)',
    border: '1px solid rgba(148, 163, 184, 0.35)',
    borderRadius: 24,
    boxShadow: '0 24px 80px rgba(15, 23, 42, 0.14)',
    padding: '2rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 999,
    padding: '0.4rem 0.8rem',
    background: '#e0f2fe',
    color: '#075985',
    fontSize: '0.82rem',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    lineHeight: 1.1,
    margin: 0,
    letterSpacing: '-0.04em',
  },
  subtitle: {
    marginTop: '0.75rem',
    marginBottom: '1.5rem',
    color: '#475569',
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  form: {
    display: 'grid',
    gap: '1rem',
  },
  label: {
    display: 'grid',
    gap: '0.4rem',
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#334155',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #cbd5e1',
    borderRadius: 12,
    padding: '0.8rem 0.9rem',
    fontSize: '1rem',
    outline: 'none',
    background: '#ffffff',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
    marginTop: '0.25rem',
  },
  primaryButton: {
    border: 0,
    borderRadius: 12,
    padding: '0.85rem 1rem',
    background: '#2563eb',
    color: '#ffffff',
    fontWeight: 800,
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  secondaryButton: {
    border: '1px solid #cbd5e1',
    borderRadius: 12,
    padding: '0.85rem 1rem',
    background: '#ffffff',
    color: '#0f172a',
    fontWeight: 800,
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  ghostButton: {
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: '0.85rem 1rem',
    background: '#f8fafc',
    color: '#475569',
    fontWeight: 800,
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  statusPanel: {
    marginTop: '1.5rem',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '1rem',
    display: 'grid',
    gap: '0.75rem',
  },
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.85rem 1rem',
    borderRadius: 14,
    background: '#f8fafc',
  },
  statusLabel: {
    color: '#64748b',
    fontWeight: 700,
  },
  statusValue: {
    color: '#0f172a',
    fontWeight: 800,
  },
  successBox: {
    borderRadius: 14,
    padding: '0.9rem 1rem',
    background: '#dcfce7',
    color: '#166534',
    lineHeight: 1.4,
  },
  errorBox: {
    borderRadius: 14,
    padding: '0.9rem 1rem',
    background: '#fee2e2',
    color: '#991b1b',
    lineHeight: 1.4,
  },
  details: {
    marginTop: '1rem',
    borderRadius: 14,
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    padding: '0.9rem 1rem',
  },
  summary: {
    cursor: 'pointer',
    fontWeight: 800,
    color: '#334155',
  },
  pre: {
    marginTop: '1rem',
    maxHeight: 280,
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    fontSize: '0.8rem',
    lineHeight: 1.45,
    color: '#334155',
  },
};
