<!-- metadata: date="2026-06-11"; chapter="08"; type="source"; title="Midterm Practice Test 01"; description="Practice test for midterm review" -->

Download the blank database from here:

[Practice Test #1](https://brightspace.albany.edu/content/enforced/1373238-2249-BITM-330-1002/Test%20practice.accdb)

### Schema

1. **STUDENT**  
   (**StudentID**, FirstName, LastName, Gender, Browser)

2. **ACADEMIC_YEAR**  
   (**YearID**, *StudentID*, Year)

3. **MAJOR**  
   (**MajorID**, *StudentID*, Major)

4. **LANGUAGE**  
   (**LanguageID**, *StudentID*, Language)

5. **DATE**  
   (**DateID**, *StudentID*, RecordedDate, PageSubmit)

Create the relationships and answer the following questions.

---

### Questions

1. Replace all the empty values in the **MAJOR** table (recorded as `-99`) with `ISBA`. What is the SQL code to run this query?

2. What is the most popular major?

3. What percentage of majors are **Accounting** and **Law**? Use two decimal places.

4. What percentage of the responses are by females? Use two decimal places.

5. What percentage of responses identified as **Seniors**? Use two decimal places.

6. What is the mode (most common) birth year?

7. What is the average age, assuming the current year is **2024**? Use two decimal places.

8. Out of **all** the responses, what percentage listed **Mandarin** as a language? Use two decimal places.

9. How many of the responses recorded in **August** are by **freshmen** who speak **Spanish**?  
   Use an integer.

10. How many students speak more than one language?

11. How many **Juniors** used **Chrome**?

12. How many students major in **ISBA**?

13. How many students submitted their response after **8/30/2021**?

14. The **PageSubmit** field indicates how much time in seconds it took students to complete the form. What is the average time per student? Use two decimal places.

15. Write a SQL query that deletes all rows in the **ACADEMIC_YEAR** table where the **Year** field is empty or null. Your query should handle both null values and blank strings. Ensure the query is valid for **MS Access**.

16. What academic year group had the shortest completion time for the survey?  
   The time taken to complete the survey is recorded in the **PageSubmit** field of the **DATE** table.

   - Freshman
   - Sophomore
   - Junior
   - Senior

17. How many students have **three majors**?

18. What is the most popular major among **Juniors**?

19. Which major has the **lowest percentage of female students**?