// One-off admin script: create the shared reviewer account for the reader.
//
// Usage (PowerShell, from reader-hybrid-v1.1/):
//   $env:SUPABASE_SERVICE_ROLE_KEY = "<paste service role key>"
//   node scripts/create-reviewer-user.mjs
//   Remove-Item Env:SUPABASE_SERVICE_ROLE_KEY
//
// The service-role key comes from Supabase Dashboard -> Settings -> API.
// It is read from the environment only and is never written to disk.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://akjidhxkcuubeajsntrz.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const REVIEWER_EMAIL = 'reader@dimapublishing.com';
const REVIEWER_PASSWORD = 'ualbany';

if (!SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable.');
  console.error('Get it from Supabase Dashboard -> Settings -> API (service_role key), then:');
  console.error('  $env:SUPABASE_SERVICE_ROLE_KEY = "<key>"');
  console.error('  node scripts/create-reviewer-user.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  // 1. Create the auth user, pre-confirmed (no verification email).
  console.log(`Creating auth user ${REVIEWER_EMAIL} ...`);
  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email: REVIEWER_EMAIL,
    password: REVIEWER_PASSWORD,
    email_confirm: true,
  });

  if (createError) {
    const msg = createError.message.toLowerCase();
    if (msg.includes('already') || createError.code === 'email_exists') {
      console.log('Auth user already exists — leaving it as is.');
    } else {
      console.error('Failed to create auth user:', createError.message);
      process.exit(1);
    }
  } else {
    console.log(`Auth user created (id: ${created.user.id}), email confirmed.`);
  }

  // 2. Upsert the roster row so activate_student_trial grants access.
  console.log('Adding reviewer to allowed_emails roster ...');
  const { error: rosterError } = await supabase
    .from('allowed_emails')
    .upsert(
      {
        email: REVIEWER_EMAIL,
        netid: null,
        first_name: 'Reader',
        last_name: 'Reviewer',
      },
      { onConflict: 'email' }
    );

  if (rosterError) {
    console.error('Failed to upsert roster row:', rosterError.message);
    process.exit(1);
  }
  console.log('Roster row in place.');

  console.log('');
  console.log('Done. Share these credentials with reviewers:');
  console.log(`  Email:    ${REVIEWER_EMAIL}`);
  console.log(`  Password: ${REVIEWER_PASSWORD}`);
  console.log('');
  console.log('First sign-in will auto-activate a 180-day access grant.');
  console.log('When the review period ends, delete this user in the Supabase');
  console.log('dashboard (Authentication -> Users).');
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
