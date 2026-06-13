<!-- metadata: date="2026-06-11"; chapter="13"; type="source"; title="Source: Macros Lecture" -->

Improving
Business
Performance with
Information
Technologies

BITM 330

Prof. Nim Dvir

Quiz

BITM 330

Prof. Nim Dvir

What is the difference between data
administration and database
administration?

A. Database administration refers to a function that applies to an entire

organization while data administration refers to a more technical function
that is specific to a particular database, including applications associated
with it

B. Data administration refers to a function that applies to an entire

organization while database administration refers to a more technical
function that is specific to a particular database, including applications
associated with it

C. They both refer to the person in charge of a database and facilitates the

development of use of it

D. All of the answers

Which of the following is NOT a
database administration function?

A. Controlling the actions of concurrent users

B. Placing and enforcing security measures

C. Operating backup and recovery techniques and procedures All of

the answers

D. Making sure the data answers the needs of the entire organization

What does concurrency control
ensure?

A. That one user’s work does not inappropriately influence another

user’s work

B. That the database can recover as quickly and accurately as

possible when necessary

C. That privacy is being kept

D. All of the answers

What is an atomic transaction?

A. When two users are attempting to update the same

piece of data at the same time

B. A series of actions are taken on a database such that all
of them are performed successfully or none of them are
performed at all

C. When one user reads data that have been processed by

only a portion of another user’s transaction

D. Lock of an item from access of any type

What is the difference between
exclusive lock and a shared lock?

A. Exclusive lock locks an item from access of any type; A
shared lock locks an item from being changed but not
from being read

B. Shared lock locks an item from access of any type; An

exclusive lock locks an item from being changed but not
from being read

C. Shared lock assumes that no conflict will occur while

exclusive lock does not

D. In exclusive lock other transactions can read the data

but not alter it

What is a deadlock?

A. A condition in which data are read, the transaction

processed, updates are issued, and then a check is
made to see if conflict occurred

B. A condition in which locks are issued, the transaction

completed, and then the locks are released

C. A condition in which two transactions indefinitely wait

on each other to release resources

D. A condition that lets locks be obtained and released as

they are needed

Match the ACID transactions to their
definitions

A. Atomic

A transaction consisting of a series of steps, each of which must
be successful to be saved

B. Consistent

A transaction in which no other transactions are permitted on

the records until the current transaction finishes

c. Isolation

Different transactions that may be operating on the same data
which can result in continuously changing data content

D. Durable

A transaction in which all committed changes are permanent

Database security strives to ensure
that

A.Only authorized users use the database

B.Authentication of users

C.Only authorized activities are performed

D.All of the answers

Which of the following is NOT a
DBMS Security Guideline?

A.Prevent hardware failures

B.Encryption of sensitive data

C.Run the DBMS behind a firewall

D.Manage accounts and passwords

Which of the following is NOT a
DBMS Security Guideline?

A.Encryption of sensitive data

B.Run the DBMS behind a firewall

C.Manage accounts and passwords

D.Prevent hardware failures

Microsoft® Office 365® Access™
2019 Comprehensive

Chapter 10

Enhanced Database
Techniques

Did you do the reading?

A. Yes
B. No

Learning Objectives

10.1 Understand the Purpose of a Macro
10.2 Create a Standalone Macro
10.3 Attach an Embedded Macro to an Event
10.4 Identify When to Use a Data Macro
10.5 Create an Event-Driven Data Macro

Learning Objectives

10.6 Create a Named Data Macro
10.7 Understand the Fundamentals of SQL
10.8 Interpret an SQL Select Statement
10.9 Use an SQL Select Statement as a Record
Source

Understanding the Purpose of a Macro

• Macro—series of procedures that can be organized to

automate tasks or provide user interaction

–Standalone macro—database object created and

used independent of other controls or objects

–Embedded macro—executes when an event attached

to a control or object occurs

• Event—user-initiated action

Understanding the Purpose of a Macro

• A macro is a series of procedures that can be organized
to automate tasks or provide user interaction in Access
without specific programming experience.

• A standalone macro is a database object that you create

and use independent of other controls or objects. An
embedded macro executes when an event attached to a
control or object occurs.

• An event occurs when a user enters, edits, or deletes

data; events also occur when users open, use, and close
forms and reports.

Understanding the Purpose of a Macro

Creating a Standalone Macro

• The Macro Designer is used to create or edit macros and

to add or delete actions from macros.

• To open the Macro Designer, click Macro on the Create

tab.

• After adding an action to the macro, specify the

arguments you want for the action, where an argument is
a variable, constant, or expression that is used to
produce the output for an action.

• As shown in the next slide, a MessageBox has four

arguments.

Creating a Standalone Macro

Creating a Standalone Macro

•Actions are the individual steps that make
up a macro.

•One of the ways to add actions to a macro
with the Macro Designer is by dragging
database objects from the Navigation Pane
to an empty row in the Macro Designer.

Creating a Standalone Macro (2 of 2)

In this example, a macro is created to open the
Employee form. To run a macro, double-click the
macro name in the Navigation Pane. To edit a
macro, right-click the macro name and select
Design View from the shortcut menu.

Attaching an Embedded Macro to an
Event

An embedded macro is attached to an event of a control on a form or report
(such as a button) or to an event of the form or report itself (such as Open or
Close). Command buttons are commonly used to start an action or a series of
actions.

Attaching an Embedded Macro to an
Event

• When you place a button on a form or report, the
Command Button Wizard automatically launches.

• Select a category from the Categories list and select an

action from the Actions list.

• Select the option to display text or an image on the

command button.

• As shown in the next slide, the button text will be Close

Form. The final step is to name the button.

Attaching an Embedded Macro to an
Event

Attaching an Embedded Macro to an
Event

•A macro can be added to an existing control by
manually by clicking the object in the Property
Sheet.

•The Event tab in the object’s Property Sheet is
used to open and edit the embedded macro.

Attaching an Embedded Macro to an
Event

Attaching an Embedded Macro to an
Event

•To attach an embedded macro to an event
of a control, click the control you want to
add the macro to and click in the event
property box on the Event tab.

•The Macro Designer opens and you can
add actions using the same methods you
used for the standalone macro.

Attaching an Embedded Macro to an
Event

Identifying When to Use a Data Macro

• Data macros

–Used to validate and ensure the accuracy of data in a

table

–Can only be associated with table events

• Table events—when users enter, edit, and delete table

data

• Event-driven data macros—programmed to run before or

after a table event occurs

Creating an Event-Driven Data Macro

Creating an Event-Driven Data Macro

To create a data macro, click Create
Data Macros, select the event to which
you want to attach the macro, and then
add the macro actions using the Macro
Designer.

To modify a data macro, select the
Create Data Macros command and
select the event to which the macro is
attached to return to Design view.

Creating a Named Data Macro

In addition to creating data
macros that are triggered by
events, Access enables the
creation of named data macros.
Click Create Data Macros and
select Create Named Marco
from the list. The example
shown in the slide is a named
data macro attached to the After
Update event of the Employee
table.

Creating a Named Data Macro

Creating a Named Data Macro

The macro sends an email to the
database administrator each time a
record in the Employee table is
updated.

Creating a Named Data Macro

Structured Query Language

Structured Query Language

Keyword

Purpose

SELECT

FROM

WHERE

Specifies the fields to include in the query.

Specifies the table(s) or query (or queries) where the fields can be found.

Sets the criteria for the rows in the results.

ORDER BY

Determines how the rows will be sorted.

Using an SQL SELECT Statement as a
Record Source
1. When creating a form or a report in Access, the first step is to select a

record source, such as a table or a query.

2. The next step is to click the Create tab and select the Form tool or

Report tool so that Access creates the new object.

3. After the record source is selected and the form or report has been

created, you can identify it in the Property Sheet of the database object.

Using an SQL SELECT Statement as a
Record Source

Using an SQL SELECT Statement as a
Record Source

To create a record source, you would copy the SQL code that has
been discussed and paste it in the Record Source property.

