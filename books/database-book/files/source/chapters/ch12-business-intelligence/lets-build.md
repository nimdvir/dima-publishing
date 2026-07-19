<!-- metadata: date="2026-07-19" -->
<!-- Ch12 Let's Build — Grading Database (guided model). Aligned to ch12-main-2026-07-19.md §§12.4, 12.9, 12.10. -->

## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

# Let's Build 12: Build a Dashboard Story

*Guided build — the Grading Database*

In this Let's Build we construct one complete dashboard **story** from the Grading Database, using the reporting query from Section 12.4 and the Power BI Desktop workflow from Sections 12.9 and 12.10. Follow along in your own copy of the database. Every step reuses a concept the chapter already introduced; nothing here is new.

A dashboard story has four layers — **KPI → comparison → trend → detail** — plus one slicer for exploration and one written interpretation. Our story answers a single question:

> How is the class performing, and where might the instructor need to intervene?

### Step 1: Write the question

Write the business question before opening any tool. Ours is fixed above. A good question names a population (the class), a concern (performance), and a purpose (deciding where to intervene).

### Step 2: Define the grain

State what one row of the analytical source means:

```text
One row per student per recorded deliverable result.
```

This grain supports score analysis. A complete missing-work metric needs a separate expected-submission query, because a missing row and a null score are not the same condition.

### Step 3: Build the reporting query in Access

Save this as `qry_GradeBI`. Table and field names may differ in your database; adjust them, not the idea.

```sql
SELECT
    s.StudentID,
    s.FirstName & " " & s.LastName AS StudentName,
    d.DeliverableID,
    d.DeliverableName,
    c.CategoryName,
    d.DueDate,
    g.Score,
    d.PointsPossible,
    IIf(
        IsNull([g].[Score]),
        Null,
        Round(([g].[Score] / [d].[PointsPossible]) * 100, 1)
    ) AS PercentageEarned,
    IIf(
        IsNull([g].[Score]),
        "Missing or Ungraded",
        IIf(([g].[Score] / [d].[PointsPossible]) * 100 < 70, "At Risk",
        IIf(([g].[Score] / [d].[PointsPossible]) * 100 < 85, "Satisfactory",
        "Strong"))
    ) AS ScoreStatus
FROM
    ((STUDENT AS s
    INNER JOIN STUDENT_GRADE AS g ON s.StudentID = g.StudentID)
    INNER JOIN DELIVERABLE AS d ON g.DeliverableID = d.DeliverableID)
    INNER JOIN CATEGORY AS c ON d.CategoryID = c.CategoryID;
```

This query is the reporting contract. Every visual we build reads from it, so the business rules live in one place.

### Step 4: Validate before you visualize

Confirm, against five known records:

- student names match the correct IDs;
- categories match the correct deliverables;
- percentages compute correctly;
- `PointsPossible` is never zero;
- null scores follow course policy;
- the row count matches the expected number of recorded grade rows.

Power BI makes data look finished quickly. Validation is what makes it trustworthy.

### Step 5: Confirm the tier

Apply the selector questions from Section 12.7:

| Question | Answer |
|---|---|
| Does the instructor need interactive exploration? | Yes |
| Are category and student filters useful? | Yes |
| Will the data refresh as grades change? | Yes |
| Is a static printout the only need? | No |

**Tier 3 (Power BI Desktop) is justified.** An Access report could still print a grade statement, but it would not replace an interactive dashboard.

### Step 6: Connect and transform

1. In Power BI Desktop, choose **Home → Get data → Access database**.
2. Select the `.accdb` file and choose `qry_GradeBI` in Navigator.
3. Choose **Transform Data**.
4. Confirm data types for IDs, dates, scores, and percentages.
5. Rename fields only where a clearer label helps.
6. Filter out test records using a documented rule, if any.
7. Choose **Close & Apply**.

Remember: the Access connector **imports** the data. After grades change, you must **Refresh**.

### Step 7: Create the measures

These match Section 12.10 exactly. `PercentageEarned` is on a 0–100 scale.

```dax
Average Score = AVERAGE(qry_GradeBI[PercentageEarned])
```

```dax
Recorded Results = COUNTROWS(qry_GradeBI)
```

```dax
Unique Students = DISTINCTCOUNT(qry_GradeBI[StudentID])
```

```dax
At-Risk Students =
COUNTROWS(
    FILTER(
        VALUES(qry_GradeBI[StudentID]),
        [Average Score] < 70
    )
)
```

```dax
At-Risk Rate = DIVIDE([At-Risk Students], [Unique Students], 0)
```

The same `Average Score` measure shows the class average on an unfiltered card and each student's own average inside a student's filter context. That is the payoff of defining grain first: `Recorded Results` and `Unique Students` are different numbers, and the dashboard must not confuse them.

### Step 8: Build the six story components

| Layer | Visual | Field or measure |
|---|---|---|
| KPI | Card | `Average Score` |
| KPI | Card | `At-Risk Students` |
| Comparison | Bar chart | `CategoryName` × `Average Score` |
| Trend | Line chart | `DueDate` × `Average Score` |
| Detail | Table | `StudentName`, `Average Score`, `ScoreStatus` |
| Explore | Slicer | `CategoryName` |

Every visual serves the same question. Adding more visuals does not add more insight.

### Step 9: Test the interactions

Select **Exam** in the slicer and confirm:

- the `Average Score` card recalculates for exams only;
- the trend line shows exam dates only;
- the detail table shows exam records;
- `At-Risk Students` reflects exam performance, not overall performance;
- the title or a text box makes the current filter visible.

Then clear the slicer and confirm the overall totals return.

### Step 10: Write the interpretation

A strong interpretation separates what the dashboard *shows* from what it *explains*:

> The current class average is 81.6%. Exams have the lowest category average at 74.2%, and the last two exam averages are below the first. Four students have exam averages under 70%. The dashboard identifies a performance risk but does not establish its cause. Before choosing an intervention, the instructor should review item difficulty, attendance, missing work, and student-level patterns.

Notice what it does not do: it never claims the dashboard proves *why* exam scores fell.

### Step 11: Document the dashboard

Record, alongside the file:

- source database and query (`qry_GradeBI`);
- refresh date;
- grain (one row per student per recorded deliverable result);
- measure formulas;
- the at-risk cutoff used (70);
- included and excluded records;
- known limitations.

This documentation is a reproducibility note, not a strategy document. Deciding *whether 70 is the right target*, and who owns the response, belongs to Chapter 13.

---

### Your turn

Rebuild the same dashboard story for a **different** question from the list below. Keep all six components and write a fresh 100–150 word interpretation.

- Which students appear at risk, and what evidence explains it?
- Are scores improving or declining across the term?
- Which deliverable categories carry the most missing or ungraded work?

Bring your `.pbix`, a screenshot, and your interpretation to class.
