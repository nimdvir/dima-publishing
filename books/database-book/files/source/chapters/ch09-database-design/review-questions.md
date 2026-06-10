# Reflection: Chapter 10 -- Database Design

![Reflection GIF](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/review_cncyn6?_a=BAMAAAiu0)

## Review Questions

1. What are the three types of data anomalies, and how does good database design prevent them?

2. Explain the difference between a superkey, a candidate key, and a primary key. Give an example of each using the STUDENT entity from the Grading Database.

3. Why is the SDLC important for database design? What risks arise when databases are designed outside of a structured development process?

4. Compare and contrast conceptual, logical, and physical data models. Who is the primary audience for each?

5. What is the difference between cardinality and participation in an ER model? How are each represented in Crow's Foot notation?

6. Define weak entity and explain when a weak entity should be used instead of a strong entity. How does the primary key differ between weak and strong entities?

7. How is a many-to-many (M:N) relationship resolved when translating an ER diagram into relational tables? What role does the associative entity play?

8. Describe the difference between specialization and generalization. When would you use each approach?

9. What are the three strategies for mapping a specialization/generalization hierarchy to relational tables? What are the trade-offs of each?

10. When is denormalization appropriate, and what risks does it introduce?

11. Explain the difference between identifying and nonidentifying relationships. How are they visually distinguished in Crow's Foot notation, and why does this distinction matter for database design?

12. List three common mistakes students make when creating ER diagrams. For each mistake, explain why it is problematic and how to avoid it.

13. In what ways does the ER model differ from a UML class diagram? Under what circumstances might each be more appropriate?

---

## Discussion Questions

1. **Design vs. discovery.** Some students argue that you can "discover" the right database structure by starting with SQL and adjusting as you go. Others insist that formal design must come first. Which position do you find more persuasive, and why? Under what conditions might the other approach be acceptable?

2. **Business rules and enforcement.** Consider the Grading Database. What business rules should the database enforce automatically through structure and constraints, and which ones are better handled by application logic or human processes? Where do you draw the line?

3. **Tool choice matters.** This chapter discusses Microsoft Access, SQLite, and PostgreSQL as implementation platforms. If you were designing a database for a small business (fewer than 50 employees), which platform would you recommend and why? How would your answer change for a company with 5,000 employees?

4. **Normalization trade-offs.** A colleague argues that normalizing to 3NF makes queries too complex and slow. They propose keeping everything in a few large, flat tables for simplicity. How would you respond? What evidence from this chapter supports your position?

5. **The future of ER modeling.** With the rise of NoSQL databases, document stores, and graph databases, some practitioners argue that ER modeling is becoming obsolete. Do you agree? What aspects of ER modeling remain valuable regardless of the underlying technology?

---

## Reflection Prompts

1. Think about a real system you interact with regularly (registration system, online store, social media platform). What entities, attributes, and relationships would you expect in its underlying database? Sketch a rough ERD.

2. Before this chapter, how did you think about the structure behind a database? Has your understanding of "why tables are organized the way they are" changed? What was the most surprising concept?

3. Consider the Grading Database schema. If you were redesigning it from scratch for a different course (say, a lab science course with experiments, lab partners, and equipment), what entities would change? What relationships would be different?

4. Reflect on the "common mistakes" section. Have you made any of these mistakes in your own work so far? Which mistake do you think is the most tempting to make, and why?

---

## Exercises

1. **Identify the anomalies.** Consider a single flat table that stores student names, deliverable descriptions, and grades in one row per grade. Describe one example each of an insertion anomaly, an update anomaly, and a deletion anomaly that could occur with this design.

2. **Draw an ER diagram.** Using Crow's Foot notation, draw an ER diagram for a simple library system that tracks Members, Books, and Loans. Specify the cardinality and participation for each relationship. Include at least one weak entity.

3. **Apply the mapping algorithm.** Given the following conceptual entities and relationships, produce a relational schema (table definitions with primary and foreign keys):
   - DEPARTMENT (1) -- employs -- (N) EMPLOYEE
   - EMPLOYEE (M) -- works_on -- (N) PROJECT
   - EMPLOYEE (1) -- manages -- (N) EMPLOYEE (recursive)

4. **Normalize a flat table.** The following table is unnormalized. Normalize it to 3NF, showing each step:
   ```
   ORDER(OrderID, CustomerName, CustomerPhone, Product1, Product1Price, Product2, Product2Price, TotalAmount)
   ```

5. **Evaluate a design.** Explain the advantages and disadvantages of using a single-table strategy versus a multiple-table strategy for a VEHICLE supertype with CAR and TRUCK subtypes. Under what conditions would you choose each approach?
