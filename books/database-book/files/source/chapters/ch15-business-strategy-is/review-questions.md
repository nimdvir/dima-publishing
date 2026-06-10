# Chapter 14: Business Strategy and Information Systems -- Review and Reflection

![Reflection GIF](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/review_cncyn6?_a=BAMAAAiu0)

> **Part of:** Chapter 14 -- *Strategy Is an Information Problem*
> **Main chapter file:** [ch14-edited-2026-03-08.md](ch14-edited-2026-03-08.md)
> **Key terms:** [ch14-TermTreasury-2026-03-08.md](ch14-TermTreasury-2026-03-08.md)

---

## Main Topics Covered

- Strategy as choice and trade-off: competing by doing different things, not just doing things better (Porter, 1996).
- The distinction between operational effectiveness and strategic positioning, building on Chapter 2's efficiency vs. effectiveness framework.
- Strategy as an information problem: why organizational-scale decisions require measurement, feedback, and accountability that only IS can provide reliably.
- Information systems as strategic infrastructure: the four capabilities (Visibility, Velocity, Verifiability, Scalability) built on database foundations from Chapters 4-13.
- Porter's frameworks applied to IS: Five Forces, Generic Strategies (cost leadership, differentiation, focus), and Value Chain mapping -- each tied to specific database and SQL capabilities.
- The BI-to-strategy pipeline: BI insight (Chapter 12) + reliability and performance (Chapter 13) + managerial action (Chapter 14).
- Advanced SQL as strategic capability: how window functions, CTEs, CASE expressions, and subqueries (Chapter 8) enable trend analysis, segmentation, ranking, and scenario modeling.
- Dimensional modeling and the star schema: how denormalized fact-and-dimension structures complement normalized operational databases (Chapter 7) to support multidimensional analysis (OLAP) for strategic decision-making. Grading Database example with FACT_GRADE, DIM_STUDENT, DIM_ASSIGNMENT, and DIM_SEMESTER tables.
- KPI design as strategic control: leading vs. lagging indicators, metric selection, Goodhart's Law, and how measurement shapes behavior. Built on the KPI foundations from Chapter 2.
- Strategic alignment: operationalizing the Strategic Alignment Model (SAM) from Chapter 2 through design commitments -- normalization (Chapter 7), constraints (Chapter 4), ER modeling (Chapter 10), DBA governance (Chapter 11).
- Strategic risks from weak information strategy: false confidence, misleading dashboards, KPI gaming, and decision paralysis -- each traced to technical roots in prior chapters.
- Information systems and organizational change: modular schemas (Chapter 7), reusable logic (Chapter 8), separation of storage/logic/presentation, and performance optimization (Chapter 13) as enablers of adaptability.
- Build vs. buy vs. cloud as a strategy choice tied to competitive positioning, cost structure, and long-term agility.
- The Grading Database recast as a strategic IS case: how schema (Chapters 4, 6, 7), queries (Chapters 5, 8), dashboards (Chapter 12), and governance (Chapter 11) converge to support fairness, accountability, and outcomes.
- The Course Arc: the full conceptual trajectory from data foundations through strategic integration, showing how every chapter contributes a layer to strategic capability.

---

## Review Questions

1. Define business strategy in your own words, then explain why Porter argues that operational effectiveness alone is not a strategy. Use the efficiency vs. effectiveness distinction from Chapter 2 to support your answer.
2. Explain how each layer of the DIKW hierarchy (Chapter 3) connects to a phase of the R.E.A.D. framework (Chapter 1). Where does Chapter 14 sit in both models?
3. Describe the four strategic capabilities enabled by information systems (Visibility, Velocity, Verifiability, Scalability). For each, identify at least one specific course concept from Chapters 4-13 that makes it possible.
4. Choose one of Porter's Generic Strategies (cost leadership, differentiation, or focus). Explain how specific database and SQL capabilities from at least three different chapters support that strategy.
5. Using the Value Chain table from Section 14.3, select one primary activity and one support activity. For each, explain which chapter concepts enable IS to create value in that activity.
6. Explain the difference between leading and lagging indicators. Why does a strategic dashboard need both? Provide examples from the Grading Database context.
7. Describe how the BI-to-strategy pipeline works. What role does Chapter 12 (BI) play, what does Chapter 13 (advanced techniques) contribute, and what does Chapter 14 add?
8. Explain why a star schema is intentionally denormalized, and how this differs from normalization failures. What strategic purpose does denormalization serve in a data warehouse?
9. Using the Grading Database star schema example from Section 14.4.4, explain what a fact table contains, what a dimension table contains, and how a multidimensional query (slice, dice, drill down, roll up) works. Write a sample query that answers a strategic question.
10. Explain why strategic alignment (Section 14.6) is described as a bigger differentiator than having more tools. Reference the SAM from Chapter 2 in your answer.
9. Identify three specific technical failures (from Chapter concepts in Chapters 3, 6, 7, or 11) that could cascade into strategic failures. For each, explain the strategic consequence.
10. Explain how the separation of storage, logic, and presentation (Section 14.8) supports organizational change. Reference specific techniques from Chapters 6, 8, and 12.
11. Walk through the composite strategic query in Section 14.9.4. Identify which SQL techniques come from Chapter 5 and which come from Chapter 8. Why does this query require concepts from both chapters?
12. Describe the Course Arc diagram from Section 14.9.1. What does each phase contribute, and why does the chapter argue that no single phase is sufficient on its own?
13. Explain Goodhart's Law and why it matters for KPI design. Provide a Grading Database example where a poorly designed KPI could produce harmful behavior.
14. Why does the chapter argue that database design decisions (schema, constraints, normalization) are ultimately business decisions? Support your answer with examples from at least two chapters.
15. Describe the Three Horizons model of IS strategy. Map each horizon to specific chapter content from the course.
16. Compare the Grading Database operational schema (STUDENT, ASSIGNMENT, STUDENT_GRADE) with the star schema version (FACT_GRADE, DIM_STUDENT, DIM_ASSIGNMENT, DIM_SEMESTER). What strategic questions become easier to answer with the star schema? What operational capabilities does the normalized version handle better?

---

## Discussion Questions

1. **Strategy vs. tools.** This chapter argues that strategy is implemented through systems, not just purchased through software. Why is strategic alignment often a bigger differentiator than having more tools? What happens when organizations invest in technology without aligning it to business goals?

2. **Porter's Generic Strategies applied.** How would you apply Porter's Generic Strategies to the Grading Database case? Under cost leadership, what would the system optimize for? Under differentiation, what richer insights would it provide? Under focus, which student segment would it target, and how?

3. **KPIs as strategic artifacts.** Why does the chapter treat KPIs as strategic artifacts rather than neutral numbers? When a metric becomes a target (Goodhart's Law), what happens to the behavior it was designed to measure? Can you think of a real-world example where KPI gaming undermined organizational goals?

4. **Value chain and IS.** Which value chain activities in this chapter are most affected by information systems, and why? Consider both primary activities and support activities. Are there activities where IS creates less value than expected?

5. **Leading vs. lagging indicators.** What is the strategic significance of the leading vs. lagging indicator distinction? If a university only tracked lagging indicators (end-of-term GPA, graduation rates), what strategic decisions would it be unable to make? What leading indicators would you add?

6. **SQL quality and strategic decisions.** How can advanced SQL quality change strategic decision quality? The chapter warns that poor SQL logic can produce "high-confidence but wrong conclusions." Can you think of a scenario where a subtle SQL error (wrong JOIN, missing filter, incorrect aggregation) would lead to a harmful strategic decision?

7. **False confidence risk.** What strategic risks emerge when BI dashboards look polished but data foundations are weak? How would you design a governance process to prevent false confidence from reaching decision-makers?

8. **Operational vs. dimensional.** Chapter 7 teaches you to normalize -- eliminate redundancy, enforce integrity. Section 14.4.4 shows star schemas that deliberately denormalize. How do you reconcile these two approaches? Under what circumstances would you choose one over the other, and what strategic risks exist if you use the wrong structure for the wrong purpose?

9. **Organizational change and design.** How does the chapter connect organizational change to database and analytics design choices? Why is the separation of storage, logic, and presentation not just a technical best practice but a strategic capability?

9. **Build vs. buy vs. cloud.** A small college department needs to decide whether to build a custom grading analytics system, buy a commercial LMS with analytics, or adopt a cloud-based BI platform. Using the framework from this chapter, what strategic factors should drive this decision? How does competitive positioning affect the choice?

10. **Balanced Scorecard application.** Apply the Balanced Scorecard's four perspectives to an organization you are familiar with (your university, a workplace, a club). For each perspective, identify one KPI, explain what data source would feed it, and describe what database structures from the course would be needed to capture and report it.

11. **Evidence-based management vs. intuition.** Barends and Rousseau (2018) argue that good management decisions should draw on four sources: organizational data, professional expertise, stakeholder values, and external research. Think of a decision you have seen made primarily by intuition or tradition. How would applying the EBM framework have changed the process? What role would a well-designed database play?

12. **NoSQL and the future.** The chapter introduces polyglot persistence -- using multiple database technologies for different workloads. Do you think the relational database fundamentals taught in this course will still matter in 10 years? Why or why not? What aspects of what you learned are technology-specific, and what aspects are transferable design principles?

13. **Course integration.** If you were advising a department today, what first strategic IS planning steps from this chapter would you prioritize? Reference specific concepts from at least three earlier chapters to justify your recommendations.

---

## Reflection Questions

These questions ask you to connect Chapter 14 to your own experience and to the full arc of the course.

1. **Redefining "good."** How does this chapter redefine what makes a "good" information system? Before this chapter, what criteria would you have used? How has your definition changed after seeing strategy, alignment, and measurement added to the picture?

2. **Personal R.E.A.D. journey.** Trace your own learning through the R.E.A.D. framework: What did you learn to *Represent* (Chapters 4, 6, 7)? *Express* (Chapters 5, 8)? *Associate* (Chapters 6, 10, 12)? What does it mean to *Deploy* (Chapter 14)? Which stage was most challenging, and why?

3. **Systems shape behavior.** The chapter argues that "what is measured becomes important; what is visible becomes actionable; what is delayed, inconsistent, or untrusted is ignored." Can you identify a system in your own life (academic, professional, or personal) where measurement visibility changed behavior -- for better or worse?

4. **Strategy you can build.** After completing this course, what kind of strategic IS capability could you actually build? Think about a real problem in an organization you belong to. What data would you need? What schema would you design? What queries would answer the strategic questions? What dashboard would you create?

5. **The missing chapter.** If you could add a Chapter 15 to this textbook, what topic would it cover? What gap in your understanding remains after Chapter 14? How would your proposed chapter build on the course arc?
