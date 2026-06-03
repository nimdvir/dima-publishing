import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, MessageSquare, Send, Bot, User, Trash2, ArrowRight, HelpCircle, 
  Terminal, ShieldAlert, CheckSquare, RefreshCw, Zap
} from 'lucide-react';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const PRESET_TOPICS = [
  {
    title: "Relational Rules",
    prompt: "Explain Dr. Nimrod Dvir's Relational Integrity rules and key constraints.",
    reply: `### Relational Integrity & Constraints

In Dr. Nimrod Dvir's database curriculum, **Relational Integrity** is governed by crucial rules that guarantee data accuracy and referential protection:

1. **Entity Integrity Rule**: 
   * **Rule**: No attribute of a primary key can accept a \`NULL\` value. 
   * **Why**: The primary key uniquely identifies rows. If a primary key attribute were null, the system could not address rows uniquely, creating relational ambiguity.

2. **Referential Integrity Rule**:
   * **Rule**: If a foreign key exists in a relation, its values must either:
     * Match a primary key value in its home parent relation, or
     * Be set to \`NULL\` (provided the column isn't part of its own primary key).
   * **Why**: This prevents "orphan records" and dangling pointers from pointing to non-existent rows.

3. **Domain Integrity**:
   * Restricts attributes to a set of valid values (e.g., setting an enum range, custom format rules, or standard data types).`
  },
  {
    title: "3NF vs BCNF",
    prompt: "Explain the difference between Third Normal Form (3NF) and Boyce-Codd Normal Form (BCNF).",
    reply: `### Schema Normalization: 3NF vs BCNF

Normalization organizes relation schemas to avoid redundancy anomalies (Insert, Update, Delete anomalies). 

#### 1. Third Normal Form (3NF)
A relation is in **3NF** if:
* It is in **2NF** (no partial functional dependencies).
* There are **no transitive dependencies** of non-prime attributes on candidate keys.
* **Formal definition**: For every non-trivial functional dependency $X \\rightarrow Y$:
  * Either $X$ is a superkey, or
  * $Y$ is a prime attribute (part of *any* candidate key).

#### 2. Boyce-Codd Normal Form (BCNF)
BCNF is a stricter version of 3NF (sometimes called 3.5NF).
* **Formal definition**: For every non-trivial functional dependency $X \\rightarrow Y$, **$X$ MUST be a superkey**.
* **Key difference**: BCNF eliminates cases where a prime attribute is functionally dependent on a non-superkey (which is allowed in 3NF).

\`\`\`sql
-- Example showing BCNF violations in a database register
-- relation (Student, Subject, Tutor) where Tutor -> Subject, but Tutor is not a candidate key
SELECT tutor, subject, COUNT(*) 
FROM academic_roster 
GROUP BY tutor, subject;
\`\`\``
  },
  {
    title: "SQL Duplicate Find",
    prompt: "Write a SQL query to find duplicate email records in a database table.",
    reply: `### SQL Query: Uncovering Redundant Database Emails

To find duplicate values in a column, you utilize the **\`GROUP BY\`** clause in combination with the **\`HAVING\`** filter on aggregate counters. Here is the query and detailed explanation:

\`\`\`sql
-- Standard ANSI SQL Query to find duplicates
SELECT 
    email, 
    COUNT(email) AS occurrence_count
FROM 
    users
GROUP BY 
    email
HAVING 
    COUNT(email) > 1
ORDER BY 
    occurrence_count DESC;
\`\`\`

#### How This Query Executes:
1. **\`FROM users\`**: Targets the target table data records.
2. **\`GROUP BY email\`**: Collapses rows with identical email strings into a single bucket.
3. **\`COUNT(email)\`**: Measures how many rows are compressed into each email bucket.
4. **\`HAVING COUNT(email) > 1\`**: Filters out any groups containing only one row, leaving only duplicate groupings.
5. **\`ORDER BY\`**: Sorts findings from highest frequencies to lowest.`
  },
  {
    title: "Database Indexing",
    prompt: "How does indexing speed up select lookups? What are B-Tree indexes?",
    reply: `### Relational Database Indexing Explained

Without indexes, SQL search engines must perform a **Full Table Scan**—inspecting every row sequentially from $0$ to $N$, which has a computation complexity of $O(N)$.

#### B-Tree Index Traversal
A **B-Tree (Balanced Tree)** indexing strategy creates a separate sorted traversal tree on disk:

* **Structure**: Consists of a Root Node, Intermediate Branch Nodes, and Leaf Nodes holding pointers to the physical file coordinates.
* **Algorithm**: Traverses the node pointers in sorted logical paths, yielding logarithmic **$O(\\log N)$ lookup speeds**.
* **Leaf Chain**: Leaves in a B-Tree are linked together sequentially. This allows range query selection (e.g., \`WHERE score BETWEEN 80 AND 90\`) to retrieve matching rows instantly without climbing branches again.

#### The Cost of Indexing:
* **Writes slow down**: Whenever you execute \`INSERT\`, \`UPDATE\`, or \`DELETE\`, the DB engine must also update and re-balance the physical B-Tree index structure.
* **Storage penalty**: Indexes occupy additional storage space.`
  }
];

export function AiChatCompanion() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "👋 **Welcome MIS Scholar!** I am your **Interactive AI Syllabus Assistant** calibrated for your Databases and Management Information Systems curriculum.\n\nAsk me any syllabus question—like *relational integrity rules, Boyce-Codd normal forms, complex SQL grouping, or system indexing rules!*",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsTyping(true);

    // Look for matching presets
    const match = PRESET_TOPICS.find(topic => 
      text.toLowerCase().includes(topic.title.toLowerCase()) || 
      text.toLowerCase().includes(topic.prompt.toLowerCase().substring(0, 15))
    );

    setTimeout(() => {
      let botResponseText = "";
      if (match) {
        botResponseText = match.reply;
      } else {
        // Dynamic contextual fallback response
        botResponseText = `### Academic Answer: ${text}

Thank you for your curriculum query regarding database information systems! 

Here is a conceptual breakdown as outlined in the syllabus of Dr. Nimrod Dvir:

1. **Academic Overview**: Your query is highly applicable to the core tenets of relational database engineering and management systems.
2. **Key Tenet**: When considering this topic, keep in mind how relationships enforce schema safety (e.g. key constraints, data consistency, and transactional locking).
3. **Structured Context**:
   * Relational structures require robust modeling (using Entity-Relationship Diagrams) before writing queries.
   * Operations on these datasets always prioritize ACID principles for write durability.

*Would you like me to write a custom sample SQL query or explain a specific normalization schema related to this topic?*`;
      }

      // Stream response with Typewriter speed effect
      const responseMsgId = `bot_${Date.now()}`;
      const streamTarget = botResponseText;
      let curIndex = 0;
      
      const botMsg: Message = {
        id: responseMsgId,
        sender: 'bot',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      const interval = setInterval(() => {
        curIndex += 8; // Stream 8 chars at a time for swift responsive feeling
        if (curIndex >= streamTarget.length) {
          setMessages(prev => prev.map(m => m.id === responseMsgId ? { ...m, text: streamTarget } : m));
          clearInterval(interval);
        } else {
          setMessages(prev => prev.map(m => m.id === responseMsgId ? { ...m, text: streamTarget.substring(0, curIndex) } : m));
        }
      }, 15);

    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Conversation cleared! Ask me anything about database tables, SQL join statements, constraints, or normalization styles.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-50 overflow-hidden animate-fadeIn font-sans">
      {/* Header Panel */}
      <div className="px-6 py-5 border-b border-zinc-150 bg-white shadow-xs shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-600">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-widest leading-none bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                ⭐ Student Pro Feature
              </span>
            </div>
            <h1 className="text-base font-extrabold text-zinc-800 pt-1 leading-none">AI Syllabus Study Tutor</h1>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 p-2 rounded-xl border border-zinc-200 transition-all flex items-center gap-1 text-[11px] font-bold cursor-pointer"
          title="Clear Study Session Chat History"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Workspace</span>
        </button>
      </div>

      {/* Main Core Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Chat History Core Pane */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white/40">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'justify-end ml-auto' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-sm border border-amber-400">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                
                <div className={`flex flex-col gap-1 max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4.5 py-3 rounded-2xl text-xs leading-relaxed select-text shadow-xs ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-900 border border-zinc-850 text-white rounded-br-none' 
                      : 'bg-white border border-zinc-200 text-zinc-850 rounded-bl-none'
                  }`}>
                    <div className="markdown-body">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-zinc-400 font-sans px-1">
                    {msg.sender === 'user' ? 'You' : 'Dvir AI Tutor'} • {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-100 shrink-0 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-sm border border-amber-400 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <div className="px-4.5 py-3 rounded-2xl bg-white border border-zinc-150 text-zinc-555 text-xs rounded-bl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[9px] text-zinc-400 font-bold font-sans px-1">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} className="h-4" />
          </div>

          {/* Interactive Chat Input Area */}
          <div className="p-4 border-t border-zinc-150 bg-white/70 backdrop-blur-md shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(userInput);
              }}
              className="flex gap-2 max-w-4xl mx-auto"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask your tutor models questions (e.g. 'explain relational constraints')..."
                className="flex-1 bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-xl text-xs text-zinc-850 placeholder-zinc-400 focus:outline-hidden focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-200 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || isTyping}
                className="px-4 py-2.5 bg-amber-550 hover:bg-amber-600 disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Suggested presets sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-zinc-150 bg-zinc-50 p-5 space-y-4 shrink-0 overflow-y-auto">
          <div>
            <h2 className="text-xs font-black uppercase text-zinc-800 tracking-wider">Suggested Study Topics</h2>
            <p className="text-[10px] text-zinc-400 pt-0.5 leading-relaxed">
              Click any syllabus question below to trigger deep relational guidance instantly:
            </p>
          </div>

          <div className="space-y-2.5">
            {PRESET_TOPICS.map((topic, tIdx) => (
              <button
                key={tIdx}
                onClick={() => handleSendMessage(topic.prompt)}
                className="w-full text-left p-3.5 bg-white hover:bg-amber-50/20 border border-zinc-150 hover:border-amber-200 rounded-xl transition-all shadow-xs flex flex-col gap-2.5 group cursor-pointer"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-mono text-amber-600 font-extrabold uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-100 leading-none">
                    {topic.title}
                  </span>
                  <Zap className="w-3.5 h-3.5 text-zinc-300 group-hover:text-amber-500 transition-colors" />
                </div>
                <p className="text-xs font-bold text-zinc-700 leading-snug group-hover:text-zinc-950 transition-colors">
                  "{topic.prompt}"
                </p>
              </button>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4.5 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">Course Grader Bypass</span>
            <p className="text-[10px] text-zinc-600 leading-relaxed">
              Upgraded with unlimited model capabilities. Answer outlines derived perfectly from Dr. Dvir's DBMS syllabus models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
