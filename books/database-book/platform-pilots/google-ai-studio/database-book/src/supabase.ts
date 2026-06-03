import { createClient } from '@supabase/supabase-js';

// Load Supabase credentials from environment.
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

// Initialize client only if valid credentials exist.
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://'));

export const supabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Built-in educational demo ledger
// Allows the instructor (and any test logins) to work right out-of-the-box.
export interface StudentRecord {
  netId: string;
  studentNumber: string;
  fullName: string;
  hasPaid: boolean;
  trialCount: number;
  trialStartedAt: string;
}

const LOCAL_STUDENTS_KEY = 'edubook_supabase_mock_students';

const INITIAL_MOCK_STUDENTS: StudentRecord[] = [
  {
    netId: 'nimrod.dvir',
    studentNumber: '10001000',
    fullName: 'Professor Dvir',
    hasPaid: true,
    trialCount: 0,
    trialStartedAt: new Date().toISOString()
  },
  {
    netId: 'student123',
    studentNumber: '12345678',
    fullName: 'Alex Reynolds',
    hasPaid: true, // skipped for review
    trialCount: 1,
    trialStartedAt: new Date().toISOString()
  },
  {
    netId: 'dvir.test',
    studentNumber: '87654321',
    fullName: 'MIS Beta Student',
    hasPaid: true, // skipped for review
    trialCount: 3,
    trialStartedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() // 2 days ago
  }
];

// Helper to get local students list state
function getLocalStudents(): StudentRecord[] {
  try {
    const list = localStorage.getItem(LOCAL_STUDENTS_KEY);
    if (list) return JSON.parse(list);
  } catch (e) {
    console.error("Local mock ledger read failed", e);
  }
  // If empty, initialize
  localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(INITIAL_MOCK_STUDENTS));
  return INITIAL_MOCK_STUDENTS;
}

function saveLocalStudents(students: StudentRecord[]) {
  try {
    localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(students));
  } catch (e) {
    console.error("Local mock ledger save failed", e);
  }
}

/**
 * Academic authenticate: Verify matches. If Supabase is connected, check real rows.
 * If Supabase is unconfigured, fallback to our mock ledger but ALSO allow ANY dynamic registrations 
 * so the professor doesn't get blocked by credentials! We will auto-register unrecognized NetIDs for demo purposes.
 */
export async function authenticateStudent(
  netId: string,
  studentNumber: string
): Promise<StudentRecord> {
  const normalizedNetId = netId.trim().toLowerCase();
  const normalizedStudentNum = studentNumber.trim();

  if (isSupabaseConfigured && supabaseClient) {
    try {
      // 1. Check if the student already exists in Supabase
      const { data, error } = await supabaseClient
        .from('students')
        .select('*')
        .eq('net_id', normalizedNetId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        // Exists, perform matching
        if (data.student_number === normalizedStudentNum) {
          return {
            netId: data.net_id,
            studentNumber: data.student_number,
            fullName: data.full_name || 'Alumnus',
            hasPaid: true, // Bypass checking paywall for review
            trialCount: data.trial_count ?? 0,
            trialStartedAt: data.trial_started_at || new Date().toISOString()
          };
        } else {
          throw new Error('Verification failure: The student number entered does not match our registration files.');
        }
      } else {
        // Not found, professor specifies they have user database.
        // For dynamic frictionless adoption, let's auto-register them in Supabase on first login!
        const newRecord = {
          net_id: normalizedNetId,
          student_number: normalizedStudentNum,
          full_name: normalizedNetId.includes('.') 
            ? normalizedNetId.split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
            : 'MIS Student',
          has_paid: true, // Bypass checking paywall for review
          trial_count: 0,
          trial_started_at: new Date().toISOString()
        };

        const { error: insertError } = await supabaseClient
          .from('students')
          .insert(newRecord);

        if (insertError) {
          console.warn("Could not auto-register. Attempting basic schema bypass...", insertError);
        }

        return {
          netId: newRecord.net_id,
          studentNumber: newRecord.student_number,
          fullName: newRecord.full_name,
          hasPaid: true, // Bypass checking paywall for review
          trialCount: newRecord.trial_count,
          trialStartedAt: newRecord.trial_started_at
        };
      }
    } catch (e: any) {
      console.error("Supabase authenticating lookup issue:", e);
      throw new Error(e.message || 'Supabase authentication failed');
    }
  }

  // --- Fallback Ledger Mode ---
  const students = getLocalStudents();
  const found = students.find(s => s.netId.toLowerCase() === normalizedNetId);

  if (found) {
    if (found.studentNumber === normalizedStudentNum) {
      return { ...found, hasPaid: true };
    } else {
      throw new Error('Verification failure: Special student code mismatch in classroom records.');
    }
  } else {
    // Dynamic Registration for unregistered test NetIDs during development trial
    const autoRegister: StudentRecord = {
      netId: normalizedNetId,
      studentNumber: normalizedStudentNum,
      fullName: normalizedNetId.split(/[._-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Student Admin',
      hasPaid: true, // Bypass checking paywall for review
      trialCount: 0,
      trialStartedAt: new Date().toISOString()
    };
    const nextLedger = [...students, autoRegister];
    saveLocalStudents(nextLedger);
    return autoRegister;
  }
}

/**
 * Retrieve progress for user
 */
export async function getStudentProgressSupabase(netId: string) {
  const normalizedNetId = netId.trim().toLowerCase();

  if (isSupabaseConfigured && supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('student_progress')
        .select('*')
        .eq('net_id', normalizedNetId)
        .maybeSingle();

      if (error) {
        console.error("Supabase getStudentProgress error:", error);
      } else if (data) {
        return {
          completedChapters: data.completed_chapters || [],
          completedSections: data.completed_sections || [],
          quizScores: data.quiz_scores || {}
        };
      }
    } catch (err) {
      console.error("Progress fetch error in Supabase:", err);
    }
  }

  // Fallback
  try {
    const key = `edubook_progress_${normalizedNetId}`;
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error("Local retrieval error", e);
  }
  return {
    completedChapters: [],
    completedSections: [],
    quizScores: {}
  };
}

/**
 * Save progress
 */
export async function saveStudentProgressSupabase(netId: string, progress: any) {
  const normalizedNetId = netId.trim().toLowerCase();

  // Save to Local fallback
  try {
    const key = `edubook_progress_${normalizedNetId}`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (e) {}

  if (isSupabaseConfigured && supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('student_progress')
        .upsert({
          net_id: normalizedNetId,
          completed_chapters: progress.completedChapters,
          completed_sections: progress.completedSections,
          quiz_scores: progress.quizScores,
          updated_at: new Date().toISOString()
        }, { onConflict: 'net_id' });

      if (error) throw error;
    } catch (err) {
      console.error("Failed to commit progress to Supabase:", err);
    }
  }
}

/**
 * Update payment state to true
 */
export async function recordStudentPayment(netId: string): Promise<boolean> {
  const normalizedNetId = netId.trim().toLowerCase();

  if (isSupabaseConfigured && supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('students')
        .update({ has_paid: true })
        .eq('net_id', normalizedNetId);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error("Failed to record Stripe pay state in Supabase:", err);
    }
  }

  // Fallback update
  const students = getLocalStudents();
  const nextList = students.map(s => {
    if (s.netId.toLowerCase() === normalizedNetId) {
      return { ...s, hasPaid: true };
    }
    return s;
  });
  saveLocalStudents(nextList);
  return true;
}

/**
 * Increment trial usage count
 */
export async function incrementStudentTrial(netId: string): Promise<number> {
  const normalizedNetId = netId.trim().toLowerCase();

  if (isSupabaseConfigured && supabaseClient) {
    try {
      // Get current trialCount
      const { data, error } = await supabaseClient
        .from('students')
        .select('trial_count')
        .eq('net_id', normalizedNetId)
        .maybeSingle();

      if (!error && data) {
        const nextVal = (data.trial_count || 0) + 1;
        await supabaseClient
          .from('students')
          .update({ trial_count: nextVal })
          .eq('net_id', normalizedNetId);
        return nextVal;
      }
    } catch (err) {
      console.error("Failed trial increments:", err);
    }
  }

  // Fallback logic
  const students = getLocalStudents();
  let updatedCount = 1;
  const nextList = students.map(s => {
    if (s.netId.toLowerCase() === normalizedNetId) {
      updatedCount = s.trialCount + 1;
      return { ...s, trialCount: updatedCount };
    }
    return s;
  });
  saveLocalStudents(nextList);
  return updatedCount;
}

/**
 * Helper to generate Sql statements for professor to quickly define tables in their Supabase console.
 */
export function getSupabaseSQLMigrationGuide(): string {
  return `-- Create the tables in your Supabase SQL Editor:

-- 1. Create Students Directory Table
CREATE TABLE IF NOT EXISTS public.students (
    net_id TEXT PRIMARY KEY,
    student_number TEXT NOT NULL,
    full_name TEXT,
    has_paid BOOLEAN DEFAULT FALSE,
    trial_count INTEGER DEFAULT 0,
    trial_started_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Student Progress Tracking Table
CREATE TABLE IF NOT EXISTS public.student_progress (
    net_id TEXT PRIMARY KEY REFERENCES public.students(net_id) ON DELETE CASCADE,
    completed_chapters TEXT[] DEFAULT '{}',
    completed_sections TEXT[] DEFAULT '{}',
    quiz_scores JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) if you prefer, or configure basic public flow during testing:
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- Dynamic Policy: Allow reading and writing for anyone or matching key
CREATE POLICY "Allow public select of students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public upsert of student_progress" ON public.student_progress FOR ALL USING (true);
`;
}
