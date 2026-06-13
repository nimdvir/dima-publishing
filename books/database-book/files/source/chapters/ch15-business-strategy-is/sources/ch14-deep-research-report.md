<!-- metadata: date="2026-06-11"; chapter="15"; type="source"; title="Source: Deep Research Report" -->

# Business Strategy and Information Systems

## From insight to strategy

This chapter is a deliberate pivot from *how systems work* to *why systems matter*. In earlier chapters, students built competence in data fundamentals, relational modeling, normalization, constraints, database administration, advanced SQL, and Business Intelligence (BI). Here, those technical capabilities become strategic levers: the design of a database schema, the correctness of an aggregation query, and the governance of an ETL pipeline are not merely “IT choices”—they shape managerial attention, organizational behavior, and competitive outcomes. This framing is consistent with mainstream MIS teaching that positions information systems as instruments for operational excellence, improved decision-making, and competitive advantage. citeturn26view0

Two themes anchor the chapter:

First, **strategy is a discipline of choices**—including trade-offs and “fit” across activities—rather than a loose aspiration. Classic strategy work emphasizes that competitive advantage emerges from *how activities reinforce each other*, not from isolated best practices, and that operational effectiveness is necessary but insufficient for strategy. citeturn23view0turn13search1

Second, **those choices are executed through information**. The practical reality of strategy is measurement, feedback, accountability, and learning—precisely the domains where databases, SQL, BI, and governance operate. Evidence-based management work similarly argues that organizations perform better when decisions are driven by systematically gathered evidence rather than fashionable “common wisdom.” citeturn4search1turn4search4

### Learning objectives

By the end of this chapter, students should be able to:

- Explain how information systems (IS) support business strategy and competitive advantage. citeturn26view0turn18search0  
- Diagnose strategic trade-offs that are **enabled or constrained** by data and system design decisions. citeturn23view0turn13search7  
- Connect databases, advanced SQL, and BI artifacts (ETL rules, dimensional models, dashboards) to strategy execution and risk management. citeturn24view1turn25view1turn24view3  
- Evaluate alignment among business strategy, information strategy, and technology strategy. citeturn23view4turn12search1  
- Identify strategic risks from poor information strategy—misleading dashboards, KPI gaming, and false confidence. citeturn23view5turn1search2  

The **Grading Database** remains the running example. The instructional twist: treat it not as a technical artifact (tables, keys, joins), but as a strategic system that structures incentives, transparency, and feedback—i.e., it shapes behavior. citeturn23view5turn24view0  

## Strategy as managerial choice and information discipline

### Strategy as choice and trade-off

**Section 14.1—What is business strategy?**  
Business strategy is fundamentally about choosing **where to compete**, **how to compete**, and—uncomfortably but critically—**what not to do**. In classic strategy writing, sustainable advantage comes from a coherent activity system that “fits” together; this is why copying isolated “best practices” rarely produces durable differentiation. citeturn23view0turn13search7

A useful teaching distinction is:

- **Operational effectiveness:** doing similar activities better than rivals (speed, fewer errors, lower waste).  
- **Strategic positioning:** doing *different* activities, or doing similar activities in a *different configuration*, to deliver unique value. citeturn23view0

In classroom terms: operational effectiveness is your database being “fast.” Strategy is deciding *what questions your organization must answer*, *how those answers should be trusted*, and *how the answers change behavior*. (Yes, that is both inspiring and annoyingly concrete—welcome to strategy.)

### Why strategy depends on information

**Section 14.1—Why strategy depends on information.**  
At scale, strategy execution becomes an information problem. Managers need (a) measurement, (b) feedback, and (c) accountability to translate a strategy statement into operating reality. Modern evidence-based management emphasizes using organizational data, professional expertise, stakeholder values, and external research to reduce decision error, resist fads, and learn systematically. citeturn4search4turn4search1

This is why “intuition” becomes unreliable as organizations grow: intuitive judgments don’t scale well, don’t audit well, and don’t transmit well across layers. Evidence-based management arguments stress that organizations often overestimate how much they “know” and underestimate how often decisions are driven by untested beliefs. citeturn4search1turn4search2

**Connection to earlier chapters:** If earlier chapters taught DIKW/READ-like distinctions (data → information → knowledge → action), this chapter’s move is to show that strategy lives in the transitions: the rules for transforming data into decisions. That transformation is implemented in schemas, constraints, SQL logic, and BI layers. citeturn24view1turn25view1  

## Information systems as strategic infrastructure

### From tools to systems

**Section 14.2—Information systems as strategic infrastructure.**  
One spreadsheet can *answer a question*. A well-designed information system can *institutionalize how questions are asked and answered*. That difference matters strategically because systems are:

- **Integrated:** data and processes connect across functions instead of living in local silos. citeturn26view0turn25view0  
- **Repeatable:** queries and pipelines can be executed consistently, not “rebuilt” ad hoc. citeturn25view1turn24view3  
- **Governed:** definitions, access, and quality controls are managed rather than assumed. citeturn25view0  

Mainstream MIS texts explicitly frame information systems as tools for achieving competitive advantage, not merely “back-office utilities.” citeturn26view0turn18search3

A useful counterpoint is the commoditization argument: some technology infrastructure becomes widely available and thus less differentiating by itself. Under this view, advantage shifts toward *how* the organization uses technology—especially through processes, governance, and managerial capability—rather than owning the tech. citeturn24view4turn2search1  

### Strategic capabilities enabled by IS

Your outline proposes four “strategic capabilities” enabled by IS. They are instructor-friendly because they translate abstract strategy into system qualities students already understand:

**Visibility:** knowing what is happening (reliable operational truth). Data governance frameworks treat data as an enterprise asset and emphasize quality, metadata, and stewardship as prerequisites for trustworthy visibility. citeturn25view0

**Velocity:** how quickly feedback occurs (cycle time from event → insight → action). BI and data warehousing practice emphasizes delivering cleaned and modeled information to decision-makers efficiently, directly connecting pipeline design (ETL, modeling) to decision speed. citeturn15search4turn24view1

**Verifiability:** whether results can be trusted, audited, and explained. Evidence-based decision approaches emphasize not only having “data,” but having *valid, reliable evidence* and traceable reasoning. citeturn4search4turn4search1

**Scalability:** whether insight grows with the organization. Data warehousing approaches (dimensional modeling, lifecycle planning) explicitly address scalability for analytics workloads and organizational evolution. citeturn24view1turn15search4

**Connection to earlier chapters:** These capabilities are the strategic “why” behind the technical “how” of relational design, normalization, constraints, indexing, DBA discipline, and security controls. In other words: structure enables trust; trust enables strategy. citeturn25view0turn17search6  

## Competitive advantage frameworks for information systems

### Value chain thinking and IS

**Section 14.3—Porter’s value chain and IS.**  
A clean way to anchor strategy for MIS students is value chain logic: organizations create value through a set of coordinated activities. What matters is not only *each activity* but also how activities connect (information flows, handoffs, feedback). Value chain analysis supports diagnosing where IS can reduce cost, increase differentiation, or improve coordination. citeturn13search7turn23view0

In practical IS terms, value chain improvements often show up as:

- Lower coordination costs (better integration across activities). citeturn23view0turn26view0  
- Better information quality and timeliness (better operational-to-analytic flow). citeturn17search11turn15search4  
- Stronger measurement and control (making execution visible and manageable). citeturn25view1turn24view0  

### Generic strategies and what they demand from data

**Section 14.3—Porter’s generic strategies.**  
Classic strategy typology identifies three generic approaches: cost leadership, differentiation, and focus. The pedagogical payoff is that each strategy makes different demands on data, SQL, and BI. citeturn13search1turn13search4

Below is an instructor-friendly mapping that explicitly links strategy to IS design and analytics practice.

| Strategy (Porter) | What “winning” requires | IS/DB/SQL/BI implications | Typical failure mode |
|---|---|---|---|
| Cost leadership | Tight control of cost drivers; efficient operations | Highly standardized definitions; rigorous data quality; performance-aware SQL and repeatable reporting pipelines | “Fast dashboards” built on inconsistent definitions → false savings citeturn23view5turn25view0 |
| Differentiation | Superior value, experience, or outcomes | Richer data and context; more complex models; advanced analytics; segmentation; experimentation | Over-collection without governance → noise, privacy risk, and contradictory dashboards citeturn25view0turn23view5 |
| Focus (niche) | Deep understanding of a segment | Fine-grained cohorting; time-aware analysis; flexible BI semantic layers to pivot quickly | Treating the niche like the mass market → KPIs that miss what matters citeturn23view5turn25view1 |

### IT capability as a strategic resource

A complementary lens is the resource-based view: competitive advantage can stem from resources and capabilities that are valuable and difficult to imitate. In practice, organizations use analytics and decision systems as a capability—built over time through people, processes, governance, and architecture—rather than as a one-time tool purchase. citeturn23view2turn15search4

This is exactly why “analytics competition” arguments emphasize that leading firms use analytics not just to report the past, but to shape operating decisions and strategy itself. citeturn23view2turn1search17

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["Porter value chain diagram","Balanced Scorecard four perspectives diagram","Henderson Venkatraman strategic alignment model diagram","Kimball star schema diagram"],"num_per_query":1}

## Analytics and business intelligence as strategic feedback loops

### Strategy without analytics is guesswork

**Section 14.4—Why BI matters strategically.**  
Organizations “execute strategy” by deciding what to measure, how to interpret it, and what consequences follow. The **Balanced Scorecard** tradition explicitly frames measurement as a strategic system: combining financial and nonfinancial measures to align initiatives, learn, and update strategy. citeturn24view0turn23view1

A key teaching point: **KPIs are strategic artifacts**. They define what is rewarded, what is ignored, and what becomes visible. This is not abstract; it is behavioral engineering.

Well-known critiques of metric fixation warn that organizations can drift from “measuring performance” to “performing the measurement,” creating perverse incentives and gaming. citeturn23view5

### BI as an organizational feedback loop

**Section 14.4—BI as feedback loop.**  
BI is often taught as “dashboards and reporting.” Strategically, it functions as a feedback loop: it helps managers answer “Are we winning?”, “Where are we underperforming?”, and “What changed?” BI texts emphasize that business intelligence supports managers through analytics that are reinforced with practice and decision context (not just tool usage). citeturn25view1turn15search3

A DW/BI architecture is valuable precisely because it makes feedback reliable and repeatable. Data warehousing practice highlights the need to extract data from source systems, clean it, and deliver it in a form that adds business value—explicitly connecting ETL design to managerial decision-making. citeturn15search4turn24view1

### Data warehouses as strategic assets

A standard definition of a data warehouse is that it is organized to support decision-making rather than transactional processing; classic work emphasizes its role in management decision support, and subsequent DW literature expands on lifecycle practices and organizational deployment. citeturn17search9turn15search4

From a strategic perspective, a data warehouse or analytic layer becomes an asset when it delivers:

- **Single-source-of-truth semantics** (or at least a managed set of truths). citeturn25view0turn15search4  
- **Time-aware history** (so “improvement” can be measured). citeturn17search9turn24view1  
- **Stable metric definitions** (so debates are about action, not arithmetic). citeturn25view0turn23view5  

### Example: BI for the Grading Database

To make BI “feel strategic” in a classroom context, treat the Grading Database as a miniature organization with goals, processes, stakeholders, and constraints.

A plausible scorecard-style structure for course performance might translate into four perspectives:

- **Learning outcomes (customer/student perspective):** mastery and improvement over time. citeturn23view1  
- **Process quality (internal process perspective):** turnaround time for feedback, regrade rates, missing submissions. citeturn15search4turn25view1  
- **Capability building (learning and growth perspective):** participation in practice quizzes, office hours usage, revision cycles. citeturn23view1turn4search4  
- **Resource stewardship (financial/constraints analog):** instructor/TA workload, grading consistency checks, automation coverage. citeturn15search4turn2search9  

**Instructor note (the “don’t get sued” version):** Anything involving student data must be designed with privacy, access control, and auditability in mind; governance guidance treats data security, stewardship, and ethical handling as core elements of mature data management. citeturn25view0turn5search3  

## Advanced SQL as a strategic capability

### SQL as a language of evidence

**Section 14.5—SQL is not just technical.**  
SQL is best taught here as a *language of evidence*. Managers may never write a window function, but they routinely act on results produced by SQL-based pipelines: rankings, trends, cohort comparisons, exception lists, and KPI dashboards. Advanced SQL texts emphasize that features like common table expressions (CTEs) and window functions expand SQL from simple retrieval into sophisticated analytic reasoning. citeturn24view3turn23view7

A useful classroom aphorism (mildly cheesy, but effective):  
**Dashboards are the press release; SQL is the audit trail.**  
This is why SQL correctness is strategic: incorrect logic produces incorrect “truth,” and strategy built on incorrect truth is… a vibe, not a plan. citeturn4search4turn23view5  

### Strategic questions enabled by advanced SQL

Below are example patterns aligned to your outline. They are written as **generic SQL** and assume plausible tables such as `students`, `assignments`, `submissions`, and `scores`. (You can adapt names to your actual Grading Database.)

#### Trend analysis with time-aware window functions

Goal: “Are students improving over time, and who is falling behind early enough to intervene?”

```sql
SELECT
  s.student_id,
  a.assignment_date,
  sc.points_earned,
  AVG(sc.points_earned) OVER (
    PARTITION BY s.student_id
    ORDER BY a.assignment_date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS rolling_avg_last_3
FROM students s
JOIN submissions sub ON sub.student_id = s.student_id
JOIN assignments a   ON a.assignment_id = sub.assignment_id
JOIN scores sc       ON sc.submission_id = sub.submission_id;
```

Window-function guidance emphasizes that partitioning and ordering choices define the analytic meaning; incorrectly specifying the window frame can fabricate “improvement” or hide volatility. citeturn24view3turn16search6

#### Ranking and segmentation for targeted support

Goal: “Which assignments most strongly separate high- and low-performing students (and therefore may be critical learning bottlenecks)?”

```sql
SELECT
  a.assignment_id,
  a.assignment_name,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY sc.points_earned) AS median_score,
  AVG(sc.points_earned) AS mean_score
FROM assignments a
JOIN submissions sub ON sub.assignment_id = a.assignment_id
JOIN scores sc ON sc.submission_id = sub.submission_id
GROUP BY a.assignment_id, a.assignment_name
ORDER BY median_score ASC;
```

Advanced SQL references emphasize ordered-set and analytic functions as tools for robust summaries beyond simple averages—useful when distributions are skewed or outliers are common. citeturn24view3turn16search1

#### What-if analysis through reusable CTEs

Goal: “What happens to final grades if we drop the lowest quiz score?”

```sql
WITH quiz_scores AS (
  SELECT
    sub.student_id,
    sc.points_earned,
    ROW_NUMBER() OVER (
      PARTITION BY sub.student_id
      ORDER BY sc.points_earned ASC
    ) AS rn_lowest_first
  FROM submissions sub
  JOIN assignments a ON a.assignment_id = sub.assignment_id
  JOIN scores sc ON sc.submission_id = sub.submission_id
  WHERE a.assignment_type = 'QUIZ'
),
kept_scores AS (
  SELECT *
  FROM quiz_scores
  WHERE rn_lowest_first > 1
)
SELECT
  student_id,
  AVG(points_earned) AS avg_quiz_score_dropping_lowest
FROM kept_scores
GROUP BY student_id;
```

CTE-focused SQL materials highlight that CTEs improve readability and reuse, support staged reasoning, and can reduce errors in complex analytic logic—directly lowering strategic risk from brittle ad hoc queries. citeturn16search2turn23view7

### Why poor SQL logic becomes strategic risk

If a BI dashboard reports “improvement” but the underlying SQL mistakenly compares different cohorts, double-counts resubmissions, or uses inconsistent denominators, the organization may:

- Intervene too late (because the dashboard looked “fine”).  
- Reward the wrong behaviors (because the KPI is mis-specified).  
- Lose trust in analytics (because numbers change without explanation). citeturn23view5turn25view0turn4search4  

In short: **SQL correctness is strategy correctness** when the organization treats dashboards as reality. citeturn23view5  

## Strategic alignment through system design

### Alignment as a three-part commitment

**Section 14.6—Strategic alignment defined.**  
Strategic alignment is commonly framed as the fit among business strategy, information strategy, and technology strategy. The strategic alignment model tradition explicitly treats alignment as a path to organizational transformation via information technology—i.e., IT is valuable when it is coherently tied to strategic intent and organizational design. citeturn23view4turn12search1

To make alignment concrete for students, define three commitments:

- **Business strategy:** what outcomes matter and what trade-offs are accepted. citeturn23view0turn13search1  
- **Information strategy:** what is measured, how it is defined, and how it is governed. citeturn25view0  
- **Technology strategy:** how systems are architected and operated to deliver the information strategy. citeturn15search4turn17search9  

Misalignment occurs when one commitment changes without the others.

### Examples of misalignment

Your outline lists three misalignments; each can be connected directly to database/BI choices:

**Agility demanded; system is rigid.**  
Rigid schemas, tightly coupled reports, and unmanaged metric sprawl can make the organization slow to respond. DW/BI lifecycle practice explicitly warns that DW/BI systems must evolve with the organization and emphasizes adaptable deployment methods. citeturn15search4turn2search9

**Insight demanded; data is unreliable.**  
Data governance frameworks treat data quality and metadata as necessary to trust analytics; without them, “insight” becomes opinion with nicer fonts. citeturn25view0turn5search3

**Accountability demanded; metrics are unclear.**  
Metric fixation critiques show that unclear or poorly aligned measures can drive gaming, distort priorities, and create low-quality accountability. citeturn23view5turn23view1

### Flexible design wins (and why SQL abstractions matter)

**Section 14.9—Systems must adapt.**  
Markets change; goals evolve; systems must adapt. DW literature emphasizes architectural choices (e.g., dimensional models, data marts, lifecycle governance) that enable evolution without breaking downstream decision processes. citeturn24view1turn15search4turn17search4

This is where prior technical chapters become strategic again:

- **Views** can stabilize metric definitions for BI even as source schemas evolve. citeturn15search4turn15search6  
- **CTEs** support modular analytic logic that can be revised safely. citeturn16search2turn23view7  
- **Dimensional modeling** creates “decision-ready” structures that keep analysis consistent. citeturn24view1turn15search8  

Put plainly: *decoupling storage from presentation is strategic insurance.* citeturn15search4turn25view1  

## The grading database as strategic instrument and risk surface

### From administrative tool to strategic instrument

**Section 14.7—The grading system signals what matters.**  
A grading system is not neutral infrastructure. It signals priorities (what is measured), shapes incentives (what is rewarded), and defines fairness (what is auditable and contestable). Measurement systems literature emphasizes that metrics guide attention and can align initiatives, but metric-fixation critiques warn they can also distort behavior when tied to incentives or used without judgment. citeturn23view1turn23view5

In this sense, the Grading Database resembles a miniature performance management system:

- Students optimize toward what is measured.  
- Instructors optimize toward what can be measured reliably.  
- Administrators optimize toward what can be compared across sections. citeturn23view5turn24view0  

### Strategic questions the system can answer

**Section 14.7—Strategic questions enabled.**  
Your outline’s questions map cleanly onto analytics patterns:

- “Are students improving over time?” → time-series and cohort windows. citeturn24view3turn17search9  
- “Which deliverables drive outcomes?” → segmentation and contribution analysis (carefully defined). citeturn23view7turn25view1  
- “Where should interventions occur?” → early-warning rules and exception reporting that are repeatable. citeturn15search4turn4search4  

This is also where evidence-based management is a helpful teaching bridge: the goal is not “more data,” but better decisions through better evidence and better reasoning. citeturn4search4turn4search1  

### What would break strategy

**Section 14.7—What breaks strategy.**  
A grading/learning strategy breaks when the information system cannot support trustworthy feedback. Common break points match your outline:

- **Inconsistent data** (e.g., different instructors interpret “late submission” differently). Governance frameworks stress that shared definitions and stewardship are essential when data is treated as an enterprise asset. citeturn25view0  
- **Poor aggregation logic** (e.g., averages computed across incomparable items). Metric fixation critiques show that small measurement errors can have outsized behavioral effects once incentives attach. citeturn23view5  
- **Missing constraints** (e.g., duplicate submissions, ambiguous states). This is the strategic “why” behind earlier database integrity topics. citeturn25view0turn16search8  
- **Delayed feedback** (e.g., slow grading pipeline). BI lifecycle guidance connects delivery cadence and system design to the usefulness of analytics for decision-making. citeturn15search4turn2search9  

### Risks of poor information strategy

**Section 14.8—Strategic risks with technical roots.**  
Poor information strategy creates predictable strategic failure modes:

**False confidence:** dashboards look authoritative even when inputs are weak. Evidence-based management work warns against acting on “half-truths” and emphasizes disciplined evaluation of evidence quality. citeturn4search1turn4search4

**Misleading dashboards:** metrics are correct mathematically but wrong conceptually (bad definitions, wrong grain). DW practice repeatedly emphasizes modeling at the right grain and maintaining clear business definitions. citeturn24view1turn15search4

**KPI gaming:** people optimize to the metric rather than the mission. Metric fixation critique explicitly documents how “gaming the stats” emerges when measurement becomes tied to reward and reputation. citeturn23view5

**Decision paralysis:** too many metrics, too many conflicting truths, no governance. Data management frameworks emphasize the need for common vocabularies, metadata, and clear role responsibilities to prevent analytic chaos. citeturn25view0turn5search3  

### Looking ahead to integration

**Section 14.10—From strategy to integration.**  
This chapter tees up the final integrative move: technical competencies (modeling, SQL, BI, governance) become a single organizational skill—**building reliable intelligence**.

A pragmatic way to summarize the capstone claim is:

- Strategy defines what must be true. citeturn23view0turn13search1  
- Information systems determine whether it can be known. citeturn26view0turn25view0  
- SQL and BI determine whether it can be acted on at scale. citeturn24view3turn25view1  

Or, if you want the slightly cheeky version for students: **you can’t out-strategize your own data definitions.** citeturn25view0turn23view5  

## Chapter summary and teaching materials

### Chapter summary

This chapter’s thesis is simple and uncompromising: **strategy is built on systems**.

Business strategy depends on information quality because strategy execution requires measurement, feedback, and accountability. citeturn4search4turn26view0  
Databases and analytics function as strategic infrastructure by enabling integration, repeatability, governance, and scalable feedback loops. citeturn25view0turn15search4  
Advanced SQL is a strategic capability because it translates raw events into evidence—trends, rankings, cohorts, and scenarios—that managers act on. citeturn24view3turn23view7  
Business intelligence operationalizes strategy by turning data into organizational feedback; poorly designed KPIs and dashboards create strategic risk and incentive distortion. citeturn23view1turn23view5turn25view1  
Strategic alignment is the bridge from “technology investment” to “business transformation,” and alignment fails when business goals, information definitions, and technology architecture drift apart. citeturn23view4turn15search4  

### Discussion questions

1. Can an organization maintain a strong strategy with weak data systems? Under what conditions might it appear to work, and why might that be temporary? citeturn24view4turn25view0  
2. How do KPIs influence behavior differently than informal goals? Provide examples of “good” and “gameable” KPIs. citeturn23view5turn23view1  
3. In what ways does system design constrain future strategic choices (e.g., what becomes measurable, comparable, or auditable)? citeturn25view0turn23view0  
4. How does advanced SQL reduce strategic risk? Identify at least two failure modes that good SQL patterns prevent. citeturn24view3turn16search2  
5. What strategic failures can be traced back to poor data modeling or governance? Discuss with a concrete example from a domain you know. citeturn24view1turn25view0  

### Key terms

- Business strategy citeturn23view0turn13search1  
- Competitive advantage citeturn13search7turn23view0  
- Strategic alignment citeturn23view4  
- Value chain citeturn13search7  
- Business intelligence citeturn25view1turn15search4  
- Key performance indicators (KPIs) citeturn23view1turn23view5  
- Data governance citeturn25view0  
- Evidence-based decision-making citeturn4search4turn4search1  

### References

Barends, E., & Rousseau, D. M. (2018). *Evidence-based management: How to use evidence to make better organizational decisions*. Kogan Page. citeturn4search4

Carr, N. G. (2003). *IT doesn’t matter*. Harvard. citeturn24view4

DAMA International. (2017). *DAMA-DMBOK: Data management body of knowledge* (2nd ed.). Technics Publications. citeturn25view0

Davenport, T. H., & Harris, J. G. (2007). *Competing on analytics: The new science of winning*. Harvard Business Press. citeturn23view2

Inmon, W. H. (1992). *Building the data warehouse*. QED Technical Publishing Group. citeturn17search9

Kaplan, R. S., & Norton, D. P. (1996). *The balanced scorecard: Translating strategy into action*. Harvard Business Press. citeturn24view0

Kimball, R., & Ross, M. (2002). *The data warehouse toolkit: The complete guide to dimensional modeling* (2nd ed.). Wiley. citeturn24view1

Laudon, K. C., & Laudon, J. P. (2016). *Management information system*. Pearson India. citeturn26view0

Molinaro, A., & de Graaf, R. (2020). *SQL cookbook* (2nd ed.). O’Reilly Media. citeturn23view7

Muller, J. Z. (2018). *The tyranny of metrics*. Princeton University Press. citeturn23view5

Porter, M. E. (1980). *Competitive strategy: Techniques for analyzing industries and competitors*. Free Press. citeturn13search1

Porter, M. E. (1985). *Competitive advantage: Creating and sustaining superior performance*. Free Press. citeturn13search7

Porter, M. E. (2008). *On competition* (Updated and expanded ed.). Harvard Business Press. citeturn23view0

Sharda, R., Delen, D., & Turban, E. (2018). *Business intelligence, analytics, and data science: A managerial perspective* (4th ed.). Pearson. citeturn25view1

Venkatraman, N., & Henderson, J. C. (2023). *Strategic alignment: A model for organizational transformation via information technology*. LEGARE STREET Press. citeturn23view4