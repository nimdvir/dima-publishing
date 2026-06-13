<!-- metadata: date="2026-06-11"; chapter="11"; type="source"; title="Source: DBA-1 Lecture"; description="Source material for chapter 11" -->

Improving
Business
Performance with
Information
Technologies

BITM 330

Prof. Nim Dvir

Database Concepts

Ninth Edition

Chapter 6

Database Administration

Copyright © 2020, 2017, 2015 Pearson Education, Inc. All Rights Reserved

Did you do the reading?

A. Yes
B. No

Learning Objectives

• Understand the need for and

importance of database administration

• Know basic administrative and

managerial DBA functions

• Understand the need for concurrency

control, security, and backup and
recovery

Learning Objectives

• Learn about typical problems that can
occur when multiple users process a
database concurrently

• Understand the use of locking and the

problem of deadlock

• Learn the difference between optimistic and

pessimistic locking

• Learn different ways of processing a

database using cursors

Learning Objectives

• Understand the need for security and
specific tasks for improving database
security

• Know the difference between recovery

via reprocessing and recovery via
rollback/rollforward

• Understand the nature of the tasks

required for recovery using
rollback/rollforward

WHAT IS THE IMPORTANCE OF
DATABASE ADMINISTRATION?

• A business function which involves managing a
database to maximize its value to an
organization.
• Usually, database administration involves
balancing the conflicting goals of protecting the
database and maximizing its availability and
benefit to users

7

WHAT IS THE IMPORTANCE OF
DATABASE ADMINISTRATION?

•Data administration
•Database administration
•Database administrator (D B A)

8

Data Administration Terms

• Data administration refers to a function that
applies to an entire organization concerning
corporate data privacy and security issues.

• Database administration refers to a more

technical function that is specific to a particular
database, including applications associated with
it.

• Database administrator (D B A) refers to the

person in charge of a database and facilitates the
development of use of it.

Data Administration Terms

• Both the terms data administration and database

administration are used in the industry.

• In some cases, the terms are considered to be

synonymous; in other cases, they have different
meanings.

• Most commonly, the term data administration refers to a

function that applies to an entire organization; it is a
management-oriented function that concerns corporate
data privacy and security issues.

• The term database administration refers to a more
technical function that is specific to a particular
database, including the applications that process that
database.

The Database Processing Environment

The Database Processing Environment

pieces of programming code
stored in the DBMS—which are
known as SQL/Persistent Stored
Modules (SQL/PSM), and which
include user-defined
functions, triggers, and stored
procedures

database administration functions

Three database administration functions are necessary
to bring order to this potential chaos.
1. First, the actions of concurrent users must be

controlled to ensure that results are consistent with
what is expected.

2. Second, security measures must be in place and
enforced so that only authorized users can take
authorized actions at appropriate times.

3. Finally, backup and recovery techniques and
procedures must be operating to protect the
database in case of failure and to recover it as
quickly and accurately as possible when necessary.

Concurrency Control

• Concurrency control ensures that one
user’s work does not inappropriately
influence another user’s work.

• concurrency is the ability of different parts
or units of a program, algorithm, or problem
to be executed out-of-order or at the same
time simultaneously partial order, without
affecting the final outcome.

• Users should be able to enter an order and
get the same result whether there are no
other users, or hundreds of other users.

Concurrency Control
• No concurrency control technique is ideal for all

circumstances, they all involve trade-offs.
–Strict concurrency requires

locking the database, thus not
allowing any other user (high price
to pay)

–Other measures allow more

throughput (maximum rate of
processing) but has a lower
concurrency control

The Need for Atomic Transactions

• Users submit work in the form of

transactions, also know as logical units
of work (L U W s).

• An atomic transaction is one where a

series of actions are taken on a database
such that all of them are performed
successfully or none of them are performed
at all.

The Need for Atomic Transactions

• An example of an atomic transaction

is:
–Change the customer transaction,
increasing the value of Amount
Owed.

–Change the salesperson record,

increasing the value of Commission
Due.

–Insert the new-order record into the

database.

Example of Concurrent Processing of Two Users’
Tasks

Lost Update Problem

• If two users are attempting to

update the same piece of data at
the same time, it is possible that
one update may overwrite the
other update.

Lost Update Problem

• If one user’s update overwrites the
other’s, this is called a lost update
problem (concurrent problem).

• If one user reads data that have been
processed by only a portion of another
user’s transaction, this is called a
inconsistent read problem.

Example of the Lost Update Problem

Lost Update Problem – how would you solve
it?

Resource Locking

• Resource locking prevents
concurrent processing
problems by disallowing
sharing by locking data that are
retrieved for update.

Resource Locking

• Exclusive lock locks an item from

access of any type.
–No other transaction can read or

change the data

• A shared lock locks an item from
being changed but not from being
read.
–Other transactions can read the

data but not alter it

Example of Concurrent Processing
with Explicit Locks

Serializable Transactions

• When two or more transactions are processed
concurrently, the results in the database should
be logically consistent with the results that would
have been achieved had the transactions been
processed in an arbitrary serial fashion.

• A scheme for processing concurrent transactions

in this way is said to be serializable

Two-Phased Locking

• One way to achieve serializable transactions is by

using two-phased locking.

• Two-phased locking lets locks be obtained and

released as they are needed:

– a growing phase, when the transaction

continues to request additional locks

– a shrinking phase, when the transaction

begins to release the locks

Deadlock

• As a transaction begins to lock resources, it may

have to wait for a particular resource to be
released by another transaction.

• Sometimes two transactions may indefinitely wait
on each other to release resources. This condition
is known as a deadlock or the deadly embrace.

• This condition can lock up a computer preventing

use by any user until it is fixed.

Examples of Deadlock

Optimistic Versus Pessimistic
Locking

• Optimistic locking assumes that no
conflict will occur.  Data are read, the
transaction processed, updates are issued,
and then a check is made to see if conflict
occurred. If a conflict occurred it is rolled
back and repeated until successful.

• Pessimist locking assumes that conflict

will occur, thus locks are issued, the
transaction completed, and then the locks
are released.

Example of Optimistic Locking

Example of Pessimistic Locking

SQL Transaction Control Language
(T L C)

• The SQL BEGIN TRANSACTION statement

• The SQL COMMIT TRANSACTION statement

• The SQL ROLLBACK TRANSACTION statement

Note: Exact SQL syntax varies between various DBMS products.

https://docs.microsoft.com/en-us/office/client-
developer/access/desktop-database-reference/transaction-statement-
microsoft-access-sql

A C I D Transaction

• Sometimes the acronym A C I D is applied to transactions.

• An A C I D transaction is one that is atomic, consistent, isolated,

and durable.
– Atomic:

▪ an atomic transaction is one in which all of the database

actions occur, or none of them do

▪ a transaction consists of a series of steps, each of which must

be successful to be saved

– Consistent

▪ a consistent transaction means that no other transactions are
permitted on the records until the current transaction finishes;
referred to as statement level consistency among all
records

A C I D Transaction (2 of 2)

– Isolation

▪ because of multiuser environments,

different transactions may be operating
on the same data which can result in
continuously changing data content

– Durable

▪ a durable transaction is one in which
all committed changes are permanent

Summary of Data Read Problems

Cursor

• A cursor is a pointer into a set of rows that is the result set from

an SQL SELECT statement.

• Cursors are usually defined using SELECT statements.

Cursor Types

• Cursors can be forward only or scrollable.

• In SQL Server, these cursors can be one of three different

types:

– static cursor (takes a snapshot and processes it)
– dynamic cursor (a fully featured cursor)
– keyset cursor (combines some features of static and

some of dynamic cursors)

• Other DBMS products may define a different set of

cursors.

Summary of Cursor Types

Database Security Authentication
and Authorization

Database security strives to ensure that:

– only authorized users
– perform authorized activities

Database Security Authentication
and Authorization

User Processing Rights and
Responsibilities

• Processing rights define who is permitted to do what,

and when they can do it.

• The individuals performing these activities have full
responsibility for the implications of their actions.

• An important principle of database security administration
is that administrative permissions are given to user
groups Individuals are identified by a username and a
password (also known as user roles) and not to
individual users unless necessary.

• Individuals are identified by a username and a

password.

A Model of DBMS Security

Processing Rights at Heather
Sweeney Designs

DATABASE RIGHTS GRANTED

Table

SEMINAR

Administrative
Assistants
Read, Insert, Change

CUSTOMER Read, Insert, Change

SEMINAR_
CUSTOMER
CONTACT

Read, Insert, Change,
Delete
Read, Insert, Change

INVOICE

Read, Insert, Change

LINE_ITEM

PRODUCT

Read, Insert, Change,
Delete
Read, Insert, Change

Management

System
Administrator
Grant Rights, Modify
Structure

Read, Insert, Change,
Delete
Read, Insert, Change Grant Rights, Modify

Read, Insert, Change,
Delete
Read, Insert, Change,
Delete
Read, Insert, Change,
Delete
Read, Insert, Change,
Delete
Read, Insert, Change,
Delete

Structure
Grant Rights, Modify
Structure
Grant Rights, Modify
Structure
Grant Rights, Modify
Structure
Grant Rights, Modify
Structure
Grant Rights, Modify
Structure

DBMS Security Guidelines

Database Backup and Recovery

• Common causes of database failures:

– hardware failures
– programming bugs
– human errors/mistakes
– malicious actions

• As these issues are impossible to

completely avoid, recovery procedures are
essential.

Recovery via Reprocessing

• In reprocessing, all activities since

the backup was performed are redone.

• The time it takes to do this is the same

amount of time it took when first
entered.

• One downside is that if the system is

heavily scheduled, it might never catch
up.

Recovery via Rollback & Rollforward

• Most database management systems provide a mechanism to record

activities into a log file.

– to undo a transaction the log must contain a copy of every data-

base record before it was changed

▪ such records are called before-images
▪ a transaction is undone by applying before-images of all its

changes to the database

– to redo a transaction the log must contain a copy of every

database record (or page) after it was changed

▪ these records are called after-images
▪ a transaction is redone by applying after-images of all its

changes to the database

• The log file is then used for recovery via rollback or rollforward.

Rollforward

• Activities recorded in the log files may be replayed.

• In doing so, all activities are reapplied to the database.

• This procedure is used to resynchronize restored

database data by adding transactions to the last full
backup.

Rollback

• Log files save activities in sequence order.

• It is possible to undo activities in reverse
order that they were originally executed.

• This is performed to correct or undo

erroneous or malicious transaction(s) after
a database is recovered from a full backup.

Undo and Redo Transactions

Additional D B A Responsibilities (1 of 2)

• The D B A needs to ensure that a system exists to gather

and record user-reported errors and other problems:

– a method must be devised to prioritize those errors
and problems and to ensure that they are corrected
accordingly

• The D B A needs to create and manage a process for

controlling the database configuration:

– procedures for recording change requests
– conducting user and developer reviews of such

requests

– creating projects and tasks

Additional D B A Responsibilities (2 of 2)

• The D B A is responsible for ensuring that
appropriate documentation is maintained:

– database structure
– concurrency control
– security and backup and recovery
– applications used

• Every organization should have a Service Level
Agreement with the cloud provider that covers
backups, application response time, and error
reporting.

ASSIGNMENT 5 – A (DUE
BY 11/15 (EOD) -
RESUBMISSION

• Book exercises
• Chapter 4 questions
4.40 – 4.44
•Chapter 5 questions
5.36 – 5.42
• Make sure to be
original! Do not
repeat the suggested
solutions – otherwise
it won’t be graded

ASSIGNMENT 5 – B (DUE
BY 11/15 EOD)

• Capstone 5
• Capstone 6
• Make sure to do
the simulations
before!

QUIZ 6 -
(DUE BY
11/15 EOD)

