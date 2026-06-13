<!-- metadata: date="2026-06-11"; chapter="11"; type="source"; title="Source: DBA Lecture"; description="Source material for chapter 11" -->

<!-- Slide number: 1 -->

![](GoogleShape157p1.jpg)

# Improving Business Performance with Information Technologies
BITM 330
Prof. Nim Dvir

### Notes:
Also called databases

<!-- Slide number: 2 -->
# Learning Objectives
Understand the need for and importance of database administration
Know basic administrative and managerial DBA functions
Understand the need for concurrency control, security, and backup and recovery

### Notes:

<!-- Slide number: 3 -->
# Learning Objectives
Learn about typical problems that can occur when multiple users process a database concurrently
Understand the use of locking and the problem of deadlock
Learn the difference between optimistic and pessimistic locking
Learn different ways of processing a database using cursors

### Notes:

<!-- Slide number: 4 -->
# Learning Objectives
Understand the need for security and specific tasks for improving database security
Know the difference between recovery via reprocessing and recovery via rollback/rollforward
Understand the nature of the tasks required for recovery using rollback/rollforward

### Notes:

<!-- Slide number: 5 -->
# WHAT IS THE IMPORTANCE OF DATABASE ADMINISTRATION?
A business function which involves managing a database to maximize its value to an organization.
Usually, database administration involves balancing the conflicting goals of protecting the database and maximizing its availability and benefit to users
5

### Notes:

<!-- Slide number: 6 -->
# WHAT IS THE IMPORTANCE OF DATABASE ADMINISTRATION?
Data administration
Database administration
Database administrator (D B A)
6

### Notes:

<!-- Slide number: 7 -->
# Data Administration Terms
Data administration refers to a function that applies to an entire organization concerning corporate data privacy and security issues.
Database administration refers to a more technical function that is specific to a particular database, including applications associated with it.
Database administrator (D B A) refers to the person in charge of a database and facilitates the development of use of it.

### Notes:

<!-- Slide number: 8 -->
# Data Administration Terms
Both the terms data administration and database administration are used in the industry.
In some cases, the terms are considered to be synonymous; in other cases, they have different meanings.
Most commonly, the term data administration refers to a function that applies to an entire organization; it is a management-oriented function that concerns corporate data privacy and security issues.
The term database administration refers to a more technical function that is specific to a particular database, including the applications that process that database.

### Notes:

<!-- Slide number: 9 -->
# The Database Processing Environment

![The DBMS block is at the center surrounded by the below objects. Each object is linked to DBMS in both directions showing two-way communication from Object to DBMS and vice versa. • Reports • Database. This block is highlighted. • Triggers • Stored Procedures • Application Programs in Visual Basic, C#, Java, etc. • Java Server Pages or JSP • Active Server Pages .NET or ASP.NET • Queries • Forms • Reports](GoogleShape236p11.jpg)

### Notes:

<!-- Slide number: 10 -->
# The Database Processing Environment

![The DBMS block is at the center surrounded by the below objects. Each object is linked to DBMS in both directions showing two-way communication from Object to DBMS and vice versa. • Reports • Database. This block is highlighted. • Triggers • Stored Procedures • Application Programs in Visual Basic, C#, Java, etc. • Java Server Pages or JSP • Active Server Pages .NET or ASP.NET • Queries • Forms • Reports](GoogleShape243p12.jpg)
pieces of programming code stored in the DBMS—which are known as SQL/Persistent Stored Modules (SQL/PSM), and which include user-defined functions, triggers, and stored procedures

### Notes:

<!-- Slide number: 11 -->
# database administration functions
Three database administration functions are necessary to bring order to this potential chaos.
First, the actions of concurrent users must be controlled to ensure that results are consistent with what is expected.
Second, security measures must be in place and enforced so that only authorized users can take authorized actions at appropriate times.
Finally, backup and recovery techniques and procedures must be operating to protect the database in case of failure and to recover it as quickly and accurately as possible when necessary.

### Notes:

<!-- Slide number: 12 -->
# Concurrency Control
Concurrency control ensures that one user’s work does not inappropriately influence another user’s work.
concurrency is the ability of different parts or units of a program, algorithm, or problem to be executed out-of-order or at the same time simultaneously partial order, without affecting the final outcome.
Users should be able to enter an order and get the same result whether there are no other users, or hundreds of other users.

### Notes:

<!-- Slide number: 13 -->
# Concurrency Control
No concurrency control technique is ideal for all circumstances, they all involve trade-offs.
Strict concurrency requires locking the database, thus not allowing any other user (high price to pay)
Other measures allow more throughput (maximum rate of processing) but has a lower concurrency control

### Notes:

<!-- Slide number: 14 -->
# The Need for Atomic Transactions
Users submit work in the form of transactions, also know as logical units of work (L U W s).
An atomic transaction is one where a series of actions are taken on a database such that all of them are performed successfully or none of them are performed at all.

### Notes:

<!-- Slide number: 15 -->
# The Need for Atomic Transactions
An example of an atomic transaction is:
Change the customer transaction, increasing the value of Amount Owed.
Change the salesperson record, increasing the value of Commission Due.
Insert the new-order record into the database.

### Notes:

<!-- Slide number: 16 -->
# Example of Concurrent Processing of Two Users’ Tasks

![The data in User A object are: 1. Read Item 100. 2. Change Item 100. 3. Write Item 100. The data in User B object are: 1. Read Item 200. 2. Change Item 200. 3. Write Item 200. One possible order of processing at database server is as below: 1. Read Item 100 for A. 2. Read Item 200 for B. 3. Change Item 100 for A. 4. Write Item 100 for A. 5. Change Item 200 for B. 6. Write Item 200 for B.](GoogleShape285p18.jpg)

### Notes:

<!-- Slide number: 17 -->
# Lost Update Problem
If two users are attempting to update the same piece of data at the same time, it is possible that one update may overwrite the other update.

### Notes:

<!-- Slide number: 18 -->
# Lost Update Problem
If one user’s update overwrites the other’s, this is called a lost update problem (concurrent problem).
If one user reads data that have been processed by only a portion of another user’s transaction, this is called a inconsistent read problem.

### Notes:

<!-- Slide number: 19 -->
# Example of the Lost Update Problem

![The data in User A object are: 1. Read Item 100. Assume item count is 10. 2. Reduce count of items by 5. 3. Write Item 100. The data in User B are: 1. Read Item 100. Assume item count is 10. 2. Reduce count of items by 3. 3. Write Item 100. Order of processing at database server is: 1. Read Item 100 (for A). 2. Read Item 100 (for B). 3. Set item count to 5 (for A). 4. Write Item 100 for A. 5. Set item count to 7 (for B). 6. Write Item 100 for B. Note: The change and write in steps 3 and 4 are lost.](GoogleShape306p21.jpg)

### Notes:

<!-- Slide number: 20 -->
# Lost Update Problem – how would you solve it?

![A set of stairs Description automatically generated with low confidence](GoogleShape313p22.jpg)

### Notes:

<!-- Slide number: 21 -->
# Resource Locking
Resource locking prevents concurrent processing problems by disallowing sharing by locking data that are retrieved for update.

### Notes:

<!-- Slide number: 22 -->
# Resource Locking
Exclusive lock locks an item from access of any type.
No other transaction can read or change the data
A shared lock locks an item from being changed but not from being read.
Other transactions can read the data but not alter it

### Notes:

<!-- Slide number: 23 -->
# Example of Concurrent Processing with Explicit Locks

![The data in User A are: 1. Lock Item 100. 2. Read Item 100. 3. Reduce count by 5. 4. Write Item 100. The data in User B are: 1. Lock Item 100. 2. Read Item 100. 3. Reduce count by 3. 4. Write Item 100. Order of processing at database server: In the below order, steps 1, 2 and 4,5,6 are A’s transactions. Step 3 and steps 7 to 11 are B’s transactions. 1. Lock Item 100 for A. 2. Read Item 100 for A. 3. Lock Item 100 for B; cannot, so place B in wait state. 4. Set item count to 5 for A. 5. Write Item 100 for A. 6. Release A’s lock on Item 100. 7. Place lock on Item 100 for B. 8. Read Item 100 for B. 9. Set item count to 2 for B. 10. Write Item 100 for B. 11. Release B’s lock on Item 100.](GoogleShape334p25.jpg)

### Notes:

<!-- Slide number: 24 -->
# Serializable Transactions
When two or more transactions are processed concurrently, the results in the database should be logically consistent with the results that would have been achieved had the transactions been processed in an arbitrary serial fashion.
A scheme for processing concurrent transactions in this way is said to be serializable

### Notes:

<!-- Slide number: 25 -->
# Two-Phased Locking
One way to achieve serializable transactions is by using two-phased locking.
Two-phased locking lets locks be obtained and released as they are needed:
a growing phase, when the transaction continues to request additional locks
a shrinking phase, when the transaction begins to release the locks

### Notes:

<!-- Slide number: 26 -->
# Deadlock
As a transaction begins to lock resources, it may have to wait for a particular resource to be released by another transaction.
Sometimes two transactions may indefinitely wait on each other to release resources. This condition is known as a deadlock or the deadly embrace.
This condition can lock up a computer preventing use by any user until it is fixed.

### Notes:

<!-- Slide number: 27 -->
# Examples of Deadlock

![The data in User A are: 1. Lock paper. 2. Take paper. 3. Lock pencils. The data in User B are: 1. Lock pencils. 2. Take pencils. 3. Lock paper. Order of processing at database server: 1. Lock paper for User A. 2. Lock pencils for User B. 3. Process A’s request; write paper record. 4. Process B’s request; write pencil record. 5. Put A in wait state for pencils. 6. Put B in wait state for paper. Beyond this, the process is locked.](GoogleShape362p29.jpg)

### Notes:

<!-- Slide number: 28 -->
# Optimistic Versus Pessimistic Locking
Optimistic locking assumes that no conflict will occur.  Data are read, the transaction processed, updates are issued, and then a check is made to see if conflict occurred. If a conflict occurred it is rolled back and repeated until successful.
Pessimist locking assumes that conflict will occur, thus locks are issued, the transaction completed, and then the locks are released.

### Notes:

<!-- Slide number: 29 -->
# Example of Optimistic Locking

![SELECT PRODUCT.Name, PRODUCT.Quantity FROM PRODUCT WHERE PRODUCT.Name = ‘Pencil’ OldQuantity = PRODUCT.Quantity Set NewQuantity = PRODUCT.Quantity minus 5 {process transaction minus take exception action if NewQuantity < 0, etcetera.} {If no errors have occurred:} LOCK PRODUCT {at some level of granularity} UPDATE PRODUCT SET PRODUCT.Quantity = NewQuantity WHERE PRODUCT.Name = 'Pencil' AND PRODUCT.Quantity = OldQuantity UNLOCK PRODUCT {check to see if update was successful; if not, repeat transaction}](GoogleShape376p31.jpg)

### Notes:

<!-- Slide number: 30 -->
# Example of Pessimistic Locking

![LOCK PRODUCT {at some level of granularity} SELECT PRODUCT.Name, PRODUCT.Quantity FROM PRODUCT WHERE PRODUCT.Name = 'Pencil' Set NewQuantity = PRODUCT.Quantity minus 5 {process transaction minus take exception action if NewQuantity < 0, etcetera.} {If no errors have occurred:} UPDATE PRODUCT SET PRODUCT.Quantity = NewQuantity WHERE PRODUCT.Name = 'Pencil' UNLOCK PRODUCT {no need to check if update was successful}](GoogleShape383p32.jpg)

### Notes:

<!-- Slide number: 31 -->
# SQL Transaction Control Language (T L C)
The SQL BEGIN TRANSACTION statement
The SQL COMMIT TRANSACTION statement
The SQL ROLLBACK TRANSACTION statement
Note: Exact SQL syntax varies between various DBMS products.
https://docs.microsoft.com/en-us/office/client-developer/access/desktop-database-reference/transaction-statement-microsoft-access-sql

### Notes:

<!-- Slide number: 32 -->
# A C I D Transaction
Sometimes the acronym A C I D is applied to transactions.
An A C I D transaction is one that is atomic, consistent, isolated, and durable.
Atomic:
an atomic transaction is one in which all of the database actions occur, or none of them do
a transaction consists of a series of steps, each of which must be successful to be saved
Consistent
a consistent transaction means that no other transactions are permitted on the records until the current transaction finishes; referred to as statement level consistency among all records

### Notes:

<!-- Slide number: 33 -->
# A C I D Transaction (2 of 2)
Isolation
because of multiuser environments, different transactions may be operating on the same data which can result in continuously changing data content
Durable
a durable transaction is one in which all committed changes are permanent

### Notes:

<!-- Slide number: 34 -->
# Summary of Data Read Problems

![The problem type and the definition are as below. 1. Dirty Read: The transaction reads a row that has been changed, but the change has not been committed. If the change is rolled back, the transaction has incorrect data. 2. Nonrepeatable Read: The transaction rereads data that has been changed, and ﬁnds changes due to committed transactions. 3. Phantom Read: The transaction rereads data and ﬁnds new rows inserted by a committed transaction.](GoogleShape413p36.jpg)

### Notes:

<!-- Slide number: 35 -->
# Cursor
A cursor is a pointer into a set of rows that is the result set from an SQL SELECT statement.
Cursors are usually defined using SELECT statements.

![Line 1: forward slash asterisk space asterisk asterisk asterisk EXAMPLE CODE - DO NOT RUN asterisk asterisk asterisk space asterisk forward slash Line 2: forward slash asterisk space asterisk asterisk asterisk SQL-DECLARE-CURSOR-CH06-01 asterisk asterisk asterisk space asterisk forward slash Line 3: DECLARE CURSOR TransCursor FOR Line 4: SELECT asterisk Line 5: FROM open bracket TRANSACTION close bracket Line 6: WHERE PurchasePrice greater than 10000 semicolon](GoogleShape421p37.jpg)

### Notes:

<!-- Slide number: 36 -->
# Cursor Types
Cursors can be forward only or scrollable.
In SQL Server, these cursors can be one of three different types:
static cursor (takes a snapshot and processes it)
dynamic cursor (a fully featured cursor)
keyset cursor (combines some features of static and some of dynamic cursors)
Other DBMS products may define a different set of cursors.

### Notes:

<!-- Slide number: 37 -->
# Summary of Cursor Types

![The data in the order of columns are as below. Row number 1: • Cursor type: Static • Description: Dynamic Changes of any type and from any source are visible. Application sees the data as they were at the time the cursor was opened. • Comments: Changes made by this cursor are visible. Changes from other sources are not visible. Backward and forward scrolling are allowed. Row number 2: • Cursor type: Keyset • Description: When the cursor is opened, a primary key value is saved for each row in the recordset. When the application accesses a row, the key is used to fetch the current values for the row. • Comments: Updates from any source are visible. Inserts from sources outside this cursor are not visible which means there is no key for them in the keyset. Inserts from this cursor appear at the bottom of the recordset. Deletions from any source are visible. Changes in row order are not visible. If the isolation level is dirty read, then committed updates and deletions are visible; otherwise, only committed updates and deletions are visible. Row number 3: • Cursor type: Dynamic • Description: Changes of any type and from any source are visible. • Comments: All inserts, updates, deletions, and changes in recordset order are visible. If the isolation level is dirty read, then uncommitted changes are visible. Otherwise, only committed changes are visible.](GoogleShape435p39.jpg)

### Notes:

<!-- Slide number: 38 -->
# Database Security Authentication and Authorization
Database security strives to ensure that:
only authorized users
perform authorized activities

![The flow from users to database is illustrated by the below steps. a. Users go through authentication with Login Name and Password. b. After authentication, Authorization happens by verifying permissions. c. Finally, database is hit for data.](GoogleShape443p40.jpg)

### Notes:

<!-- Slide number: 39 -->
# Database Security Authentication and Authorization

![](GoogleShape450p41.jpg)

### Notes:

<!-- Slide number: 40 -->
# User Processing Rights and Responsibilities
Processing rights define who is permitted to do what, and when they can do it.
The individuals performing these activities have full responsibility for the implications of their actions.
An important principle of database security administration is that administrative permissions are given to user groups Individuals are identified by a username and a password (also known as user roles) and not to individual users unless necessary.
Individuals are identified by a username and a password.

### Notes:

<!-- Slide number: 41 -->
# A Model of DBMS Security

![1. Users are Eleanore Wu, James Johnson and Richard Ent. 2. Roles are Accounting, Tellers, Shop, Managers, Unknown and Public. 3. Permissions are Eleanore Wu can execute the MonthEnd stored procedure. James Johnson can alter all tables. Accounting can update the CUSTOMER table. 4. Note that each permission must be associated with at least one USER or ROLE. 5. The illustration between User, Role, Permissions and Object in Crow’s foot notation are: a. Option-many-to-optional-many link from User to Role. b. Option-one-to-optional-many link from User to Permission. c. Option-one-to-optional-many link from Roe to Permission. d. Mandatory-one-to-optional-many link from Object to Permission.](GoogleShape464p43.jpg)

### Notes:

<!-- Slide number: 42 -->
# Processing Rights at Heather Sweeney Designs
DATABASE RIGHTS GRANTED
| Table | Administrative Assistants | Management | System Administrator |
| --- | --- | --- | --- |
| SEMINAR | Read, Insert, Change | Read, Insert, Change, Delete | Grant Rights, Modify Structure |
| CUSTOMER | Read, Insert, Change | Read, Insert, Change | Grant Rights, Modify Structure |
| SEMINAR\_ CUSTOMER | Read, Insert, Change, Delete | Read, Insert, Change, Delete | Grant Rights, Modify Structure |
| CONTACT | Read, Insert, Change | Read, Insert, Change, Delete | Grant Rights, Modify Structure |
| INVOICE | Read, Insert, Change | Read, Insert, Change, Delete | Grant Rights, Modify Structure |
| LINE\_ITEM | Read, Insert, Change, Delete | Read, Insert, Change, Delete | Grant Rights, Modify Structure |
| PRODUCT | Read, Insert, Change | Read, Insert, Change, Delete | Grant Rights, Modify Structure |

### Notes:

<!-- Slide number: 43 -->
# DBMS Security Guidelines

![Below is the list of security guidelines. • Run the DBMS behind a ﬁrewall • Apply the latest operating system and DBMS service packs and ﬁxes • Limit DBMS functionality to needed features • Protect the computer that runs the DBMS • Manage accounts and passwords • Encryption of sensitive data transmitted across the network • Encryption of sensitive data stored in databases](GoogleShape479p45.jpg)

### Notes:

<!-- Slide number: 44 -->
# Database Backup and Recovery
Common causes of database failures:
hardware failures
programming bugs
human errors/mistakes
malicious actions
As these issues are impossible to completely avoid, recovery procedures are essential.

### Notes:

<!-- Slide number: 45 -->
# Recovery via Reprocessing
In reprocessing, all activities since the backup was performed are redone.
The time it takes to do this is the same amount of time it took when first entered.
One downside is that if the system is heavily scheduled, it might never catch up.

### Notes:

<!-- Slide number: 46 -->
# Recovery via Rollback & Rollforward
Most database management systems provide a mechanism to record activities into a log file.
to undo a transaction the log must contain a copy of every data-base record before it was changed
such records are called before-images
a transaction is undone by applying before-images of all its changes to the database
to redo a transaction the log must contain a copy of every database record (or page) after it was changed
these records are called after-images
a transaction is redone by applying after-images of all its changes to the database
The log file is then used for recovery via rollback or rollforward.

### Notes:

<!-- Slide number: 47 -->
# Rollforward
Activities recorded in the log files may be replayed.
In doing so, all activities are reapplied to the database.
This procedure is used to resynchronize restored database data by adding transactions to the last full backup.

### Notes:

<!-- Slide number: 48 -->
# Rollback
Log files save activities in sequence order.
It is possible to undo activities in reverse order that they were originally executed.
This is performed to correct or undo erroneous or malicious transaction(s) after a database is recovered from a full backup.

### Notes:

<!-- Slide number: 49 -->
# Undo and Redo Transactions

![There are two illustrations, one for rollback or undo and the other for roll-forward or redo. a. Rollback: • The database is with changes on the server. • On undo, the data is supplied from the copy of the database record before it was changed server like Before-images database. • On undo, the database is again without changes.](GoogleShape521p51.jpg)

![b. Roll-forward: • The database is without changes on the server that is save. • On redo, the data is supplied from the copy of the database record after it was changed server like Af-ter-images database. • On redo, the database is again with changes.](GoogleShape522p51.jpg)

### Notes:

<!-- Slide number: 50 -->
# Additional D B A Responsibilities (1 of 2)
The D B A needs to ensure that a system exists to gather and record user-reported errors and other problems:
a method must be devised to prioritize those errors and problems and to ensure that they are corrected accordingly
The D B A needs to create and manage a process for controlling the database configuration:
procedures for recording change requests
conducting user and developer reviews of such requests
creating projects and tasks

### Notes:

<!-- Slide number: 51 -->
# Additional D B A Responsibilities (2 of 2)
The D B A is responsible for ensuring that appropriate documentation is maintained:
database structure
concurrency control
security and backup and recovery
applications used
Every organization should have a Service Level Agreement with the cloud provider that covers backups, application response time, and error reporting.

### Notes: