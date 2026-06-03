import React from 'react';
import { motion } from 'motion/react';
import { 
  LogIn, BookOpen, Database, Award, ArrowRight, ShieldCheck, 
  HelpCircle, Notebook, Sparkles, CheckCircle, Search, Layers, UserCheck
} from 'lucide-react';
import { useAuth } from '../AuthContext';

interface BookCoverPageProps {
  onEnterReader: () => void;
}

export function BookCoverPage({ onEnterReader }: BookCoverPageProps) {
  const { user, signIn, loading } = useAuth();

  const handleGuestEnter = () => {
    // Simply enter reader mode (progress fallback is localStorage which is already in AuthContext)
    onEnterReader();
  };



  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 via-zinc-100 to-zinc-200/50 text-zinc-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Interactive 3D Book Cover Cover Mockup */}
        <div className="lg:col-span-5 flex justify-center [perspective:1000px] z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: 15 }}
            animate={{ opacity: 1, y: 0, rotateY: -12, rotateX: 5 }}
            whileHover={{ rotateY: -4, rotateX: 2, scale: 1.03, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="w-full max-w-[380px] aspect-[3/4] bg-white rounded-r-3xl shadow-[25px_30px_50px_-15px_rgba(24,24,35,0.22)] relative flex flex-col justify-between overflow-hidden cursor-pointer select-none border-l-8 border-zinc-950/25 border-y border-r border-[#E9E4DB]/50"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Book Page Edge Glimmer Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-linear-to-r from-transparent via-[#E1DDD4]/30 to-[#CDC8BD]/50 z-20 pointer-events-none" />
            
            {/* Soft Paper Grain Texture Background */}
            <div className="absolute inset-0 bg-[#F9F7F2] opacity-95 mix-blend-multiply z-0 pointer-events-none" />
            
            {/* Inner Cover Borders */}
            <div className="absolute inset-4 border border-zinc-200/50 pointer-events-none z-10" />

            {/* Cover Content layout */}
            <div className="p-8 pb-3 flex-1 flex flex-col justify-between relative z-10">
              
              {/* Header Elements */}
              <div className="text-center pt-2">
                <div className="w-8 h-1 bg-zinc-400 mx-auto mb-5 rounded-full opacity-60" />
                <h1 className="font-serif text-[#1e293b] font-medium tracking-normal text-2xl sm:text-3.5xl leading-tight select-none">
                  <span className="block text-xl md:text-2xl font-light text-zinc-500 italic font-serif mb-1.5">Using Data to</span>
                  Drive Business Performance
                </h1>
                
                <h2 className="font-serif italic text-indigo-950/80 font-medium text-xs md:text-sm mt-3 tracking-wide bg-indigo-50/50 py-1.5 px-3 rounded-full border border-indigo-100/40 inline-block">
                  Databases and Management Information Systems
                </h2>
              </div>

              {/* Majestic Adaptive Vector Artwork (Spline waves, funnel, spreadsheet, network) */}
              <div className="relative h-44 my-2 flex items-center justify-center">
                {/* Flowing background curves block */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Subtle vector background grid */}
                  <defs>
                    <linearGradient id="waveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#0f172a" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#030712" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>

                  {/* Flow Wave 1 */}
                  <path d="M 10 130 C 80 150, 110 80, 180 90 C 240 100, 250 30, 280 20" stroke="url(#waveGrad)" strokeWidth="34" strokeLinecap="round" opacity="0.9" />
                  
                  {/* Slim Flow Accent Path Gold */}
                  <path d="M 0 145 C 90 155, 120 75, 190 75 C 240 75, 255 15, 275 8" stroke="url(#goldGrad)" strokeWidth="2.5" strokeDasharray="3,3" />
                  
                  {/* Thin Flow Waves in Silver */}
                  <path d="M 30 160 C 110 160, 120 100, 200 105 C 250 110, 270 50, 290 40" stroke="#94a3b8" strokeWidth="1" opacity="0.6" />
                  <path d="M 0 110 C 70 120, 100 60, 170 70" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4" />

                  {/* Decorative Rising Gold Arrows */}
                  <path d="M 283 25 L 290 8 L 273 15 Z" fill="url(#goldGrad)" />
                  <path d="M 276 13 L 280 1 L 268 6 Z" fill="#64748b" />
                  <path d="M 292 35 L 296 22 L 284 27 Z" fill="#94a3b8" opacity="0.7" />
                </svg>

                {/* Dashboard grid/spreadsheet widget */}
                <div className="absolute left-6 bottom-10 bg-white shadow-md border border-zinc-200 rounded p-1.5 select-none opacity-90 scale-90">
                  <div className="grid grid-cols-4 gap-0.5 w-14">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-xs ${i < 4 ? 'bg-indigo-600/30' : 'bg-zinc-200'}`} />
                    ))}
                  </div>
                </div>

                {/* Database relational network overlaid */}
                <div className="absolute left-10 top-12 opacity-85 scale-85">
                  <svg className="w-24 h-20" viewBox="0 0 100 80" fill="none">
                    {/* Relational connectors */}
                    <line x1="20" y1="60" x2="50" y2="25" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="1,1" />
                    <line x1="50" y1="25" x2="80" y2="40" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="20" y1="60" x2="80" y2="40" stroke="#f59e0b" strokeWidth="0.75" />
                    <line x1="50" y1="25" x2="35" y2="10" stroke="#94a3b8" strokeWidth="0.75" />
                    
                    {/* Glowing nodes */}
                    <circle cx="20" cy="60" r="4.5" fill="#f59e0b" opacity="0.9" className="animate-pulse" />
                    <circle cx="50" cy="25" r="5.5" fill="#f59e0b" />
                    <circle cx="80" cy="40" r="4" fill="#a1a1aa" />
                    <circle cx="35" cy="10" r="3" fill="#e4e4e7" />
                  </svg>
                </div>

                {/* Floating funnel symbol representation */}
                <div className="absolute right-12 bottom-6 bg-[#0f172a] text-amber-400 p-2 rounded-xl shadow-lg border border-amber-400/20 flex flex-col items-center justify-center scale-90">
                  <div className="w-5 h-5 flex flex-col justify-between items-center opacity-90">
                    <div className="w-5 h-1 bg-amber-400 rounded-full" />
                    <div className="w-3.5 h-1 bg-amber-400 rounded-full" />
                    <div className="w-2 h-1 bg-amber-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Footer Author Elements */}
              <div className="text-center pb-3">
                <span className="text-[10px] tracking-wider uppercase font-extrabold text-zinc-400 font-sans block mb-0.5">Author Edition</span>
                <p className="font-serif text-[#111e2e] font-serif font-semibold text-sm md:text-base tracking-wide select-none">
                  Dr. Nimrod Dvir
                </p>
                <div className="w-5 h-[2px] bg-indigo-500/55 mx-auto mt-2" />
              </div>

            </div>
          </motion.div>
        </div>

        {/* Right Column: Educational Metadata & Authenticated CTA Entry options */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase font-extrabold text-indigo-700 bg-indigo-100/70 border border-indigo-200/50 rounded-full tracking-wider shadow-inner">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Student Edition
            </span>
            <h2 className="text-3xl sm:text-4.5xl font-serif text-zinc-900 font-bold tracking-tight leading-tight">
              Using Data to Drive Business Performance
            </h2>
            <p className="text-base text-zinc-500 font-medium font-serif italic border-l-2 border-indigo-500/40 pl-3">
              Databases and Management Information Systems — Comprehensive Textbook
            </p>
          </div>

          <div className="text-sm text-zinc-650 leading-relaxed max-w-xl">
            <p className="mb-4">
              In modern enterprise contexts, high-performance execution hinges on robust management information systems. 
              This interactive academic portal integrates Dr. Nimrod Dvir's complete textbook curricula in a feature-rich, 
              online educational environment engineered to elevate retention and study productivity.
            </p>
          </div>

          {/* Interactive core utilities preview dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
            {[
              {
                icon: BookOpen,
                label: "16 Curricula Chapters",
                desc: "Complete lectures covering web standards, SQLite database, relational design rules and cloud servers."
              },
              {
                icon: Award,
                label: "Compete in end-chapter RATs",
                desc: "Gauge command comprehension via rigorous Reading Assessment Tests and log permanent grades."
              },
              {
                icon: Notebook,
                label: "Highlighter Notes Notebook",
                desc: "Highlight textbook terms in multiple hues and attach custom annotations to compile study outlines."
              },
              {
                icon: Search,
                label: "Global Semantic Search",
                desc: "Scan all textbook scripts, chapter summaries, terms, glossaries, and lesson paragraphs in real-time."
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex gap-2.5 p-3 rounded-xl border border-zinc-200/60 bg-white/45 backdrop-blur-xs">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                    <Icon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800">{feature.label}</h4>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to action panel container with authorization choices */}
          <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-zinc-200 shadow-md p-6 max-w-xl flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl pointer-events-none -z-10" />
            
            {loading ? (
              <div className="py-6 flex flex-col items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-none">Syncing student database permissions...</span>
              </div>
            ) : user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/50">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 shrink-0">
                    <UserCheck className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest leading-none mb-1">Student Verified</p>
                    <p className="text-xs text-emerald-700 font-bold">{user.fullName}</p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">NetID: {user.netId} • Status: {user.hasPaid ? "✅ Unified Active" : "🕒 Trial Active"}</p>
                  </div>
                </div>
                
                <button
                  onClick={onEnterReader}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer hover:-translate-y-0.5 group"
                >
                  Enter Textbook Reader
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <StudentSignInForm onSignInSuccess={onEnterReader} />
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

// Student custom login credentials form
interface StudentSignInFormProps {
  onSignInSuccess: () => void;
}

function StudentSignInForm({ onSignInSuccess }: StudentSignInFormProps) {
  const { signIn } = useAuth();
  const [netId, setNetId] = React.useState('');
  const [studentNumber, setStudentNumber] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [showDemoLoging, setShowDemoLogin] = React.useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!netId.trim() || !studentNumber.trim()) {
      setErrorMsg('Please enter both your course NetID and Student Number.');
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);

    try {
      await signIn(netId.trim(), studentNumber.trim());
      onSignInSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification failed. Please check your credentials or contact professor.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplyDemo = (demoNetId: string, demoNum: string) => {
    setNetId(demoNetId);
    setStudentNumber(demoNum);
    setErrorMsg(null);
  };

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      <div className="space-y-1">
        <h3 className="text-xs font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> University Course Gateway
        </h3>
        <p className="text-[11px] text-zinc-500">
          Enter your NetID and Student Identification Number to connect to your academic database profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {errorMsg && (
          <div className="p-3 text-[11px] rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider mb-1">NetID</label>
            <input
              type="text"
              required
              placeholder="e.g. nimrod.dvir"
              value={netId}
              onChange={(e) => setNetId(e.target.value)}
              className="w-full bg-zinc-50 text-xs px-3 py-2.5 rounded-xl border border-zinc-200 outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-zinc-800 placeholder-zinc-350"
            />
          </div>
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider mb-1">Student Number</label>
            <input
              type="password"
              required
              placeholder="e.g. 10001000"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              className="w-full bg-zinc-50 text-xs px-3 py-2.5 rounded-xl border border-zinc-200 outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-zinc-800 placeholder-zinc-350"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          {submitting ? (
            <span>Verifying course database...</span>
          ) : (
            <>
              <LogIn className="w-3.5 h-3.5 text-indigo-400" />
              <span>Verify & Access Syllabus</span>
            </>
          )}
        </button>
      </form>

      {/* Classroom Sandbox Demo Credentials */}
      <div className="border border-indigo-100 rounded-xl bg-indigo-50/25 p-3.5 mt-2">
        <button
          onClick={() => setShowDemoLogin(!showDemoLoging)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick testing accounts (Supabase fallback)
          </span>
          <span className="text-[10px] text-indigo-500 underline font-bold">{showDemoLoging ? "Mute" : "Expand"}</span>
        </button>

        {showDemoLoging && (
          <div className="space-y-2 mt-2.5 animate-fadeIn">
            <p className="text-[10px] text-zinc-500 select-none">
              Click any profile to instantly prefill student credentials and view separate subscription/trial behaviors:
            </p>
            <div className="grid grid-cols-1 gap-1.5 pt-1">
              {[
                { label: "Professor Account (Paid)", net: "nimrod.dvir", num: "10001000", desc: "Permanent full access to all sections" },
                { label: "Trial Demo Student", net: "student123", num: "12345678", desc: "Trial usage limit demo" },
                { label: "Expired Trial (Stripe Blocked)", net: "dvir.test", num: "87654321", desc: "Forces Stripe Paywall instantly" }
              ].map((studentObj, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyDemo(studentObj.net, studentObj.num)}
                  type="button"
                  className="w-full flex items-center justify-between px-2.5 py-1.5 bg-white hover:bg-indigo-50 border border-zinc-200/60 rounded-lg text-left transition-all cursor-pointer hover:border-indigo-300"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold text-[#111e2e] block">{studentObj.label}</span>
                    <span className="text-[9px] text-zinc-400 truncate block">NetID: {studentObj.net} | Pass: {studentObj.num}</span>
                  </div>
                  <span className="text-[8px] font-mono text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded shrink-0 border border-indigo-105">
                    Prefill
                  </span>
                </button>
              ))}
            </div>
            
            <p className="text-[9px] text-zinc-405 leading-relaxed mt-1.5 border-t border-indigo-100/40 pt-1.5">
              💡 <em>Note:</em> unrecognized custom NetIDs entered will be dynamically registered to simulate a real classroom rollout.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 justify-center text-[10px] text-zinc-400 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        <span>Syncing grades and payments live with Supabase Relational Database.</span>
      </div>
    </div>
  );
}

