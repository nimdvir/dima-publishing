import { useState } from "react";
import type { DemoUser } from "../types";

type DemoLoginProps = {
  demoUser: DemoUser | null;
  onSubmit: (user: DemoUser) => void;
  onSignOut: () => void;
};

export function DemoLogin({ demoUser, onSubmit, onSignOut }: DemoLoginProps) {
  const [netId, setNetId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!netId.trim() || !studentId.trim()) {
      setError("Enter both NetID and Student ID.");
      return;
    }

    setError("");
    onSubmit({
      netId: netId.trim(),
      studentId: studentId.trim(),
      accessStatus: "Demo access",
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <section className="login-view">
      <div className="panel">
        <p className="eyebrow">Demo Access</p>
        <h1>Student Access Prototype</h1>
        <p>Demo only - production login will use institutional authentication or Supabase Auth.</p>

        {demoUser ? (
          <div className="demo-card">
            <strong>{demoUser.netId}</strong>
            <span>Student ID {demoUser.studentId}</span>
            <small>{demoUser.accessStatus}</small>
            <button className="button button-secondary" type="button" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              <span>NetID</span>
              <input
                type="text"
                value={netId}
                onChange={(event) => setNetId(event.target.value)}
                placeholder="example.netid"
                autoComplete="username"
              />
            </label>

            <label>
              <span>Student ID</span>
              <input
                type="text"
                value={studentId}
                onChange={(event) => setStudentId(event.target.value)}
                placeholder="10001000"
                inputMode="numeric"
              />
            </label>

            {error && <p className="form-error">{error}</p>}

            <button className="button button-primary" type="submit">
              Save Demo User
            </button>
          </form>
        )}
      </div>

      <aside className="access-note">
        <h2>Visual Only</h2>
        <p>This prototype stores the demo user only in React state and localStorage.</p>
        <ul>
          <li>No password field</li>
          <li>No payment fields</li>
          <li>No network request</li>
          <li>No production authentication</li>
        </ul>
      </aside>
    </section>
  );
}
