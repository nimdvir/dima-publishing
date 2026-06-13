<!-- metadata: date="2026-06-11"; chapter="08"; type="source"; title="Midterm Practice Test 01 Answers"; description="Answer key for practice test 01" -->

Here is the **answer key in plain text (not Markdown)** with each question followed by the answer and a brief explanation.

---

Practice Test #1 — Answer Key

Schema
STUDENT(StudentID, FirstName, LastName, Gender, Browser)
ACADEMIC_YEAR(YearID, StudentID, Year)
MAJOR(MajorID, StudentID, Major)
LANGUAGE(LanguageID, StudentID, Language)
DATE(DateID, StudentID, RecordedDate, PageSubmit)

---

Question 1
Replace all the empty values in the MAJOR table (recorded as "-99") with ISBA. What is the SQL code to run this query?

Answer
UPDATE MAJOR
SET Major = 'ISBA'
WHERE Major = '-99';

Explanation
This UPDATE query changes every record where the Major field contains the placeholder value -99 and replaces it with the value ISBA.

---

Question 2
What is the most popular major?

Answer
Marketing

Explanation
The most popular major is the value that appears most frequently in the Major column.

---

Question 3
What percentage of majors are Accounting and Law? Use two decimal places.

Answer
21.88% (21.89% also accepted)

Explanation
This percentage is calculated by counting all records where Major is Accounting or Law and dividing by the total number of major records.

---

Question 4
What percentage of the responses are by females? Use two decimal places.

Answer
39.56%

Explanation
Count the number of records where Gender = Female and divide by the total number of responses.

---

Question 5
What percentage of responses identified as Seniors? Use two decimal places.

Answer
32.04%

Explanation
This percentage is calculated from the ACADEMIC_YEAR table by counting records where Year = Senior and dividing by the total responses.

---

Question 6
What is the mode (most common) birth year?

Answer
2000

Explanation
The mode is the value that appears most frequently in the birth year field.

---

Question 7
What is the average age (assuming the current year is 2024)? Use two decimal places.

Answer
24.29

Explanation
Age is calculated as 2024 minus the birth year. The average is then computed across all students.

---

Question 8
Out of ALL the responses, what percentage listed Mandarin as a language? Use two decimal places.

Answer
1.76%

Explanation
Count the records where Language = Mandarin and divide by the total number of responses.

---

Question 9
How many of the responses recorded in August are by freshmen who speak Spanish?

Answer
1

Explanation
This requires filtering by month (August), Year = Freshman, and Language = Spanish, then counting the resulting records.

---

Question 10
How many students speak more than one language?

Answer
11

Explanation
Group the LANGUAGE table by StudentID and count students with more than one language record.

---

Question 11
How many Juniors used Chrome?

Answer
30

Explanation
Join STUDENT and ACADEMIC_YEAR, then count records where Year = Junior and Browser = Chrome.

---

Question 12
How many students major in ISBA?

Answer
9

Explanation
Count the number of rows in the MAJOR table where Major = ISBA.

---

Question 13
How many students submitted their response after 8/30/2021?

Answer
222

Explanation
Filter the DATE table where RecordedDate is greater than August 30, 2021.

---

Question 14
The PageSubmit field indicates how much time in seconds it took the students to complete the form. What is the average time per student?

Answer
20.12

Explanation
Compute the average of the PageSubmit field across all responses.

---

Question 15
Write a SQL query that deletes all rows in the ACADEMIC_YEAR table where the Year field is empty or null.

Answer

DELETE FROM ACADEMIC_YEAR
WHERE [Year] IS NULL OR [Year] = '';

Explanation
This query deletes rows where the Year field is missing (NULL) or stored as an empty string.

---

Question 16
What academic year group had the shortest completion time for the survey?

Answer
Freshman

Explanation
Compare the average or minimum PageSubmit time across academic years and identify the group with the shortest completion time.

---

Question 17
How many students have three majors?

Answer
2

Explanation
Group the MAJOR table by StudentID and count students with exactly three major records.

---

Question 18
What is the most popular major among Juniors?

Answer
Management

Explanation
Filter to Year = Junior, then determine the most frequent value in the Major field.

---

Question 19
Which major has the lowest percentage of female students?

Answer
Economics

Explanation
Compute the proportion of female students within each major and identify the lowest percentage.

---
