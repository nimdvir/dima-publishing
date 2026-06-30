import { useState, useEffect, useCallback } from 'react';
import type {
  StudentProgress,
  ChapterProgress,
  ReadingSession,
} from '../lib/adminApi';
import {
  checkIsAdmin,
  fetchAllStudentProgress,
  fetchAllChapterProgress,
  fetchAllReadingSessions,
} from '../lib/adminApi';
import { BOOK_CHAPTERS } from '../generated/bookData';
import { formatDuration } from '../lib/readingTime';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [chapterProgress, setChapterProgress] = useState<ChapterProgress[]>([]);
  const [sessions, setSessions] = useState<ReadingSession[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'chapters' | 'sessions'>('overview');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const admin = await checkIsAdmin();
      setIsAdmin(admin);
      if (!admin) return;

      const [s, cp, rs] = await Promise.all([
        fetchAllStudentProgress(),
        fetchAllChapterProgress(),
        fetchAllReadingSessions(),
      ]);
      setStudents(s);
      setChapterProgress(cp);
      setSessions(rs);
    } catch (err) {
      console.error('Admin dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="admin-dashboard">
        <h1>Access Denied</h1>
        <p>You must be logged in as an enrolled instructor to view this page.</p>
      </div>
    );
  }

  const totalReadingTime = students.reduce((sum, s) => sum + s.total_reading_seconds, 0);
  const totalEvents = students.reduce((sum, s) => sum + s.total_events, 0);
  const activeStudents = students.filter(s => s.last_activity !== null).length;
  const registeredStudents = students.filter(s => s.registered_at !== null).length;

  // Build chapter progress matrix
  const chapterIds = BOOK_CHAPTERS.map(c => c.id);
  const studentChapterMatrix = new Map<string, Map<string, string>>();
  for (const cp of chapterProgress) {
    if (!studentChapterMatrix.has(cp.email)) {
      studentChapterMatrix.set(cp.email, new Map());
    }
    studentChapterMatrix.get(cp.email)!.set(cp.chapter_id, cp.status);
  }

  const statusEmoji: Record<string, string> = {
    'completed': '✅',
    'in_progress': '📖',
    'opened': '👁️',
  };

  return (
    <div className="admin-dashboard">
      <h1>📊 BITM330 Reader Admin</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        {students.length} students in roster · {registeredStudents} registered · {activeStudents} active
      </p>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="admin-card">
          <div className="admin-card-number">{registeredStudents}</div>
          <div className="admin-card-label">Registered</div>
        </div>
        <div className="admin-card">
          <div className="admin-card-number">{activeStudents}</div>
          <div className="admin-card-label">Active Readers</div>
        </div>
        <div className="admin-card">
          <div className="admin-card-number">{formatDuration(totalReadingTime)}</div>
          <div className="admin-card-label">Total Reading</div>
        </div>
        <div className="admin-card">
          <div className="admin-card-number">{totalEvents}</div>
          <div className="admin-card-label">Page Views</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {(['overview', 'chapters', 'sessions'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.5rem 1.25rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? '#2563eb' : '#64748b',
              borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
              marginBottom: '-2px',
              textTransform: 'capitalize',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview tab: student list */}
      {activeTab === 'overview' && (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>NetID</th>
                <th>Registered</th>
                <th>Last Active</th>
                <th>Chapters</th>
                <th>Reading Time</th>
                <th>Events</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.email}>
                  <td>
                    <strong>{s.first_name} {s.last_name}</strong>
                    <br /><small style={{ color: '#94a3b8' }}>{s.email}</small>
                  </td>
                  <td><code>{s.netid || '—'}</code></td>
                  <td>{s.registered_at ? new Date(s.registered_at).toLocaleDateString() : '—'}</td>
                  <td>{s.last_activity ? new Date(s.last_activity).toLocaleDateString() : '—'}</td>
                  <td>
                    <span title="Chapters completed" style={{ marginRight: '0.5rem' }}>✅ {s.chapters_completed}</span>
                    <span title="Chapters opened">📖 {s.chapters_opened}</span>
                  </td>
                  <td>{formatDuration(s.total_reading_seconds)}</td>
                  <td>{s.total_events}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chapters tab: chapter-by-chapter progress grid */}
      {activeTab === 'chapters' && (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table" style={{ fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th>Student</th>
                {chapterIds.map(cid => (
                  <th key={cid} style={{ writingMode: 'vertical-rl', minWidth: '2rem', padding: '0.25rem' }}>
                    {cid}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const smap = studentChapterMatrix.get(s.email);
                return (
                  <tr key={s.email}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {s.first_name} {s.last_name?.charAt(0)}.
                    </td>
                    {chapterIds.map(cid => {
                      const status = smap?.get(cid);
                      return (
                        <td key={cid} style={{ textAlign: 'center' }} title={status || 'not started'}>
                          {status ? (statusEmoji[status] || '👁️') : '·'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Sessions tab: recent reading sessions */}
      {activeTab === 'sessions' && (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Chapter</th>
                <th>Section</th>
                <th>Started</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {sessions.slice(0, 100).map((rs, i) => (
                <tr key={i}>
                  <td>
                    {rs.first_name} {rs.last_name}
                    <br /><small style={{ color: '#94a3b8' }}>{rs.email}</small>
                  </td>
                  <td>{rs.chapter_id}</td>
                  <td>{rs.section_id || '—'}</td>
                  <td>{new Date(rs.started_at).toLocaleString()}</td>
                  <td>{rs.duration_seconds ? formatDuration(rs.duration_seconds) : 'ongoing'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .admin-dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .admin-dashboard h1 {
          font-size: 1.75rem;
          margin-bottom: 0.25rem;
          color: #1e293b;
        }
        .admin-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.25rem;
          text-align: center;
        }
        .admin-card-number {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
        }
        .admin-card-label {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        .admin-table th {
          background: #f1f5f9;
          padding: 0.5rem 0.75rem;
          text-align: left;
          font-weight: 600;
          color: #475569;
          border-bottom: 2px solid #e2e8f0;
          white-space: nowrap;
        }
        .admin-table td {
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
        }
        .admin-table tr:hover td {
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
}
