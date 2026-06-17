# Plan: Interactive Auto-Graded Assessment System for BITM330

## Overview

Build a system where 120+ students enter a NetID, answer MC/MA/open-ended/SQL questions, upload CSVs, and get instant auto-grading. All options use **Google Gemini** for LLM grading and **SQLite** (primary dialect) for query validation. Options range from zero-infrastructure Colab notebooks to a full custom web app.

---

## Best Options (Easiest → Hardest)

* **1) Google Colab notebook (easiest)**: Students enter NetID, answer MC/MA/open-ended, run SQL cells, upload CSV; one “Submit + Grade” button calls Python + Gemini and returns instant score/feedback. Fastest to launch, lowest cost, minimal infrastructure.
* **2) Gradio web app (easy)**: Single webpage with form fields + SQL editor + CSV upload; server-side Python grader + Gemini gives immediate results. Better UX/security than Colab because grading logic is hidden.
* **3) Streamlit multi-page app (medium)**: One page per quiz/lab; polished interface, immediate grading, easy deployment. Good if you want a cleaner course portal without building full backend.
* **4) FastAPI custom site (hardest)**: Full control, scalable, production-style auth and admin dashboards; best long-term but highest setup effort.

**What gets auto-graded in all options**

* MC/MA: deterministic answer-key scoring
* Open-ended: rubric-based Gemini scoring
* SQL: execute query in sandbox DB + compare output; Gemini adds qualitative feedback
* CSV upload: schema/content checks in pandas + Gemini feedback

**Best starting point for your case (120+ students, quick start):** Colab first, then move to Gradio/Streamlit once stable.
If you want, I can next provide a concrete MVP blueprint (exact pages, question schema, grading flow, and estimated weekly operating cost) without implementing anything yet.

## Shared Architecture (all options)

- **Auth**: Honor-system NetID text field at the top of each assessment
- **LLM**: Google Gemini API (`gemini-2.0-flash` for speed/cost — ~$0.10/1M input tokens = pennies for 120 students)
- **SQL grading**: Execute student SQL against a sandboxed SQLite DB, compare result sets to expected output, then optionally pass to Gemini for style/approach feedback
- **MC/MA grading**: Pure Python key-matching (no LLM needed)
- **Open-ended grading**: Gemini with a rubric prompt
- **CSV grading**: Load with pandas, run validation checks (schema, row count, value ranges), then Gemini for deeper analysis
- **Results storage**: Google Sheets via `gspread` (easiest) or Supabase Postgres (already prototyped in Supabase_Colab_Tutorial.ipynb)

---

## Option 1: Google Colab Notebooks (Easiest)

**Difficulty**: ★☆☆☆☆
**Setup time**: ~1–2 days per assessment
**Cost**: Free (Gemini free tier: 15 RPM, 1M tokens/min)

### How it works

1. Create one `.ipynb` per assessment (quiz, midterm, lab) — fits existing chapter notebook pattern
2. First cell: NetID input via `input()` or `ipywidgets.Text`
3. Question cells use `ipywidgets`: `RadioButtons` for MC, `SelectMultiple` for MA, `Textarea` for open-ended, code cells for SQL, `FileUpload` for CSVs
4. A "Submit & Grade" cell at the bottom runs a grading function that: checks MC/MA against keys, executes SQL in a sandboxed `sqlite3` connection, calls Gemini for code/text/file grading, and writes results to Google Sheets
5. Students see scores + feedback inline immediately

### File structure

```
assessments/
  quiz-01-sql-basics.ipynb
  midterm-sql.ipynb
  grading_engine.py          # shared module, pip-installed from GitHub
  rubrics/
    quiz-01-rubric.json      # answer keys + Gemini rubric prompts
```

### Pros

- Zero infrastructure — students already use Colab
- Fits existing Jupyter Book + Colab workflow
- Each notebook is self-contained
- Free hosting, free Gemini tier likely sufficient for 120 students

### Cons

- Students can read/modify grading cells (mitigated by hiding code or using external API calls)
- No enforced submission deadlines (manual cutoff in Sheets)
- UI is functional but not polished

---

## Option 2: Gradio App on HuggingFace Spaces

**Difficulty**: ★★☆☆☆
**Setup time**: ~2–3 days for the framework + ~30 min per assessment
**Cost**: Free (HF Spaces free tier) or ~$7/mo for persistent GPU

### How it works

1. Build a Python Gradio app with tabs (one per assessment or one per question set)
2. Components: `gr.Textbox` (NetID), `gr.Radio` (MC), `gr.CheckboxGroup` (MA), `gr.Textbox` (open-ended), `gr.Code` with SQL syntax highlighting, `gr.File` (CSV upload)
3. "Submit" button triggers server-side grading — all logic hidden from students
4. Results displayed in `gr.Markdown` or `gr.JSON`; simultaneously logged to Google Sheets / Supabase

### File structure

```
gradio-assessments/
  app.py                     # main Gradio app
  grading_engine.py          # shared grading logic
  assessments/
    quiz_01.py               # question definitions + answer keys
  rubrics/
    quiz_01_rubric.json
  requirements.txt
```

### Pros

- Grading logic completely hidden from students
- `gr.Code` component gives proper SQL editor with syntax highlighting
- One URL to share — no notebook setup needed
- Free hosting on HuggingFace Spaces
- Native file upload handling

### Cons

- Slightly more setup than Colab
- HF free tier can be slow under load (120+ concurrent users)
- Need to learn Gradio (though it's very simple Python)

---

## Option 3: Streamlit Multi-Page App

**Difficulty**: ★★★☆☆
**Setup time**: ~3–4 days for the framework + ~30 min per assessment
**Cost**: Free (Streamlit Community Cloud) or ~$5/mo on Railway

### How it works

1. Multi-page Streamlit app — each page is one assessment
2. Components: `st.text_input` (NetID), `st.radio` (MC), `st.multiselect` (MA), `st.text_area` (open-ended), `st.code` or `streamlit-ace` (SQL editor with highlighting), `st.file_uploader` (CSV)
3. `st.session_state` tracks answers; "Submit" button grades everything server-side
4. Results shown with `st.success`/`st.error`/`st.metric` widgets; logged to Sheets/Supabase
5. Can add `st.expander` for detailed Gemini feedback

### File structure

```
streamlit-assessments/
  app.py                     # home page
  pages/
    1_Quiz_01_SQL_Basics.py
    2_Midterm.py
  grading_engine.py
  rubrics/
  requirements.txt
```

### Pros

- Best-looking UI of all options — professional feel
- Multi-page structure maps naturally to multiple assessments
- Free hosting on Streamlit Cloud (with GitHub repo)
- Rich widgets: progress bars, metrics, expandable feedback sections
- Grading logic hidden server-side

### Cons

- Streamlit's rerun model requires careful `session_state` management
- No built-in code editor with execution (need `streamlit-ace` or similar)
- Community Cloud has resource limits (may need paid tier for 120+ users)

---

## Option 4: Custom FastAPI + Jinja2/HTMX Web App

**Difficulty**: ★★★★★
**Setup time**: ~1–2 weeks
**Cost**: ~$5–20/mo on Railway / Render / Fly.io

### How it works

1. FastAPI backend with Jinja2 templates (or a React/Vue frontend if preferred)
2. CodeMirror or Monaco editor for SQL input with syntax highlighting
3. Full form handling: radio, checkbox, textarea, file upload
4. Server-side grading pipeline: validate → execute SQL → call Gemini → store results → return JSON
5. Results stored in Supabase Postgres; admin dashboard for instructor to review

### File structure

```
assessment-app/
  main.py                    # FastAPI app
  routers/
    assessments.py
    grading.py
  templates/
    base.html
    quiz.html
  static/
  grading_engine.py
  models.py                  # Pydantic models
  database.py                # Supabase/SQLite connection
  rubrics/
  requirements.txt
```

### Pros

- Most flexible and scalable
- Professional web application
- Can add real auth later (university SSO)
- Admin dashboard for grade review
- Handles 120+ concurrent users easily

### Cons

- Significantly more development time
- Requires web development knowledge (HTML/CSS/JS)
- Needs hosting and deployment pipeline
- Overkill if simpler options suffice

---

## Comparison Matrix


| Feature                    | Colab           | Gradio           | Streamlit        | FastAPI          |
| -------------------------- | --------------- | ---------------- | ---------------- | ---------------- |
| **Setup effort**           | 1–2 days       | 2–3 days        | 3–4 days        | 1–2 weeks       |
| **Cost**                   | Free            | Free             | Free–$5/mo      | $5–20/mo        |
| **SQL editor quality**     | Basic code cell | Good (gr.Code)   | Good (ace)       | Best (Monaco)    |
| **File upload**            | ✅              | ✅               | ✅               | ✅               |
| **Grading logic hidden**   | ❌              | ✅               | ✅               | ✅               |
| **Handles 120+ users**     | ✅ (individual) | ⚠️ (free tier) | ⚠️ (free tier) | ✅               |
| **Fits existing workflow** | ⭐ Perfect      | Good             | Good             | Separate         |
| **LLM integration**        | Easy            | Easy             | Easy             | Easy             |
| **Admin grade view**       | Google Sheets   | Google Sheets    | Google Sheets    | Custom dashboard |

---

## Recommendation

For the BITM330 context (120+ students, SQLite-based SQL course, existing Colab workflow, Gemini, honor-system auth):

- **Start with Option 1 (Colab)** for immediate use — you can build a working assessment notebook in a day, and it slots directly into the Jupyter Book chapter structure
- **Graduate to Option 2 (Gradio) or 3 (Streamlit)** when you want hidden grading logic and a cleaner student experience — both can be built in a few days and hosted free
- **Option 4 (FastAPI)** only if you need a permanent, scalable platform with admin tools

All options share the same `grading_engine.py` core, so migration between them is straightforward — you're mostly swapping the UI layer.

---

## Grading Engine Design (shared across all options)

### Pipeline Steps

1. **Define assessment schema** in JSON: question type, text, options, answer key, points, Gemini rubric prompt
2. **MC/MA grader**: pure dict lookup, instant
3. **SQL grader**: execute student query in sandboxed `sqlite3` in-memory DB (loaded from existing `.db` files), compare `DataFrame` output to expected result, score on correctness + optionally pass to Gemini for style feedback
4. **Open-ended grader**: send student response + rubric to `gemini-2.0-flash`, parse structured JSON score + feedback
5. **CSV grader**: `pd.read_csv()` → validate schema, row counts, value checks → optionally Gemini for deeper analysis
6. **Results writer**: append `{netid, assessment_id, question_id, score, feedback, timestamp}` to Google Sheets or Supabase

### Verification Checklist

- Unit test the grading engine against known-good and known-bad answers
- Test Gemini grading consistency by running the same response 3× and checking score variance
- Load test with 120 simulated NetIDs to verify Google Sheets / Supabase write throughput
- Verify Gemini free tier rate limits (15 requests/minute) — may need batching or `flash` model for 120+ students submitting simultaneously
