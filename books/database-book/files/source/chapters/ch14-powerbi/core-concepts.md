# Chapter 14: Power BI — Data Visualization and Business Reporting

<!-- Chapter manuscript draft — created 2026-05-06 -->

*From Data to Dashboard: Communicating Insight to Decision-Makers*

This chapter introduces Microsoft Power BI as the industry-standard tool for turning database output into visual business reports. The chapter covers connecting data sources, building data models, creating calculated columns and measures (DAX), designing interactive dashboards, and presenting findings to a non-technical audience. The chapter ties directly to SQL output and the Grading Database as the source data.

**After reading this chapter, students will be able to:**

- Connect Power BI to a database source and build a basic data model
- Create interactive visuals and dashboards that answer a defined business question
- Design a report layout appropriate for a managerial audience

## Chapter Overview

This chapter introduces Microsoft Power BI as a business intelligence and data visualization tool. Building on the data modeling and SQL concepts covered in earlier chapters, students will learn how to connect Power BI to data sources, build interactive reports, and share insights with stakeholders.

---

## Learning Objectives

By the end of this chapter, students will be able to:

1. Explain what Power BI is and how it fits into a business intelligence workflow.
2. Connect Power BI Desktop to common data sources (Excel, SQL databases, CSV).
3. Build basic visualizations: bar charts, line charts, pie charts, cards, and tables.
4. Use Power Query to clean and transform data before loading.
5. Create calculated columns and measures using DAX (Data Analysis Expressions).
6. Design an interactive report with slicers, filters, and drill-through.
7. Publish a report to the Power BI Service and share it with others.

---

## 14.1 What Is Power BI?

📖 **Definition:** Power BI is a Microsoft business analytics service that lets you connect to hundreds of data sources, simplify data preparation, and produce beautiful reports that can be published and shared across your organization.

Power BI has three main components:

| Component | Description |
|---|---|
| **Power BI Desktop** | Free Windows application used to create reports |
| **Power BI Service** | Cloud-based platform for publishing and sharing reports |
| **Power BI Mobile** | Mobile apps for viewing reports on iOS and Android |

💡 **Tip:** For this course, we will work primarily in **Power BI Desktop**, which is free to download from Microsoft.

---

## 14.2 Connecting to Data Sources

Power BI can connect to a wide variety of data sources including:

- Excel workbooks
- CSV and flat files
- SQL Server and other relational databases
- SharePoint, OneDrive, and Teams
- Web pages and APIs

### Steps to Connect

1. Open **Power BI Desktop**.
2. Click **Home → Get Data**.
3. Select the data source type.
4. Authenticate and select tables or files to load.

🧪 **Example:** In our class grading database scenario, you would connect to the `GRADECENTER` SQL database and import the `Students`, `Courses`, and `Grades` tables.

---

## 14.3 Power Query: Transforming Data

Before building visuals, raw data often needs cleaning. **Power Query** is the built-in data transformation engine in Power BI.

Common transformations include:

- Removing duplicate rows
- Renaming columns
- Changing data types
- Filtering out blank or null values
- Merging or appending tables

📝 **Note:** Power Query transformations are non-destructive — the original data source is never modified.

---

## 14.4 Building Visualizations

Once data is loaded, you can build visuals by dragging fields onto the report canvas.

### Core Visual Types

| Visual | Best Used For |
|---|---|
| Bar / Column Chart | Comparing categories |
| Line Chart | Trends over time |
| Pie / Donut Chart | Part-to-whole relationships |
| Card | Displaying a single KPI value |
| Table / Matrix | Tabular data with row/column groupings |
| Map | Geographic data |

🔑 **Key Takeaway:** Choose the right visual for the story you are telling. A poorly chosen chart can mislead the audience even if the data is accurate.

---

## 14.5 DAX: Data Analysis Expressions

**DAX** is the formula language used in Power BI to create calculated columns and measures.

### Calculated Column vs. Measure

| Type | Evaluated | Stored |
|---|---|---|
| Calculated Column | Row by row | In the table |
| Measure | On demand | Not stored |

#### Common DAX Functions

```dax
-- Count rows
Total Students = COUNTROWS(Students)

-- Sum a column
Total Points = SUM(Grades[Points])

-- Average with filter
Avg Grade A = CALCULATE(AVERAGE(Grades[Score]), Grades[LetterGrade] = "A")
```

---

## 14.6 Interactive Reports: Slicers and Filters

Power BI reports are interactive by default. Users can filter data using:

- **Slicers** — visual dropdowns or lists on the canvas
- **Report Filters** — apply to the whole report
- **Page Filters** — apply to a single report page
- **Visual Filters** — apply to a single visual

✅ **Good Practice:** Always include a slicer for the most important dimension (e.g., semester, department, date range) so report consumers can self-serve.

---

## 14.7 Publishing and Sharing

Once a report is complete in Power BI Desktop, you can publish it to the **Power BI Service**:

1. Click **Home → Publish**.
2. Sign in with your Microsoft/school account.
3. Select a workspace.
4. Open the report in your browser at [app.powerbi.com](https://app.powerbi.com).

From the Service, you can share reports with colleagues, embed them in Teams or SharePoint, or schedule automatic data refreshes.

---

## Chapter Summary

In this chapter, you learned how to use Power BI as the final layer in the data-to-decision pipeline introduced in Chapter 1. You connected to data sources, cleaned data with Power Query, built interactive visualizations, and published a report to the Power BI Service. These skills translate directly to analyst and manager roles across every industry.

---

## Key Terms

See the Chapter 14 Term Treasury companion for a complete glossary.

---

## Review Questions

See the Chapter 14 Reflection companion for discussion and review questions.

---

## Figures Index

| Figure | Caption | File |
|---|---|---|
| 14.1 | Power BI component overview | *(to be added)* |
| 14.2 | Power Query transformation interface | *(to be added)* |
| 14.3 | Sample grading dashboard in Power BI | *(to be added)* |


<div class="page-break"></div>

100 XP

The building blocks of Power BI are **semantic models** and **visualizations**. Create a semantic model and then use visuals to build a report. Let's explore these items in more detail and how they relate to the flow of Power BI.

## Create a semantic model

A **semantic model** consists of all connected data, transformations, relationships, and calculations. To follow the flow of Power BI, you first connect to data, transform data, and create relationships and calculations to create a semantic model.

First, connect to as many data sources you need. Then clean and transform the data to your needs, using Power Query Editor. Add relationships between tables and calculations to extend the semantic model. After all of that, now you can create a report.

## Create visualizations in a report

In Power BI Desktop, when you create a **visualization** (also called *visual*), you add it to the **canvas** for a report page. Choose your visualizations to build pages in your report. It's ideal to keep each page simple with related data, so consumers can easily see the insights.

Power BI is a low-code solution, which means that you can *"drag and drop"* data field directly onto the canvas. Power BI will choose a visual for your data field. You can easily change between visuals for the same fields, and add or remove data fields to the visual.

One of the most valuable features of Power BI reports is the **interactivity** between visuals. Consumers can select different data points in the visual and see how that affects the other visuals. Depending on your design, they can also drillthrough from one visual to more detail or filter based on different fields in the report.

![A screenshot of a report in Power BI Desktop.](https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/media/pbi-bblocks_03.png)

Once you're satisfied with your report, you publish it to the Power BI service.

### Create a dashboard

In the Power BI service, you can also create **dashboards** after you've published a report. Dashboards consist of a single page made up of **tiles**. Add tiles to a dashboard by pinning a visual in a report to the dashboard. Tiles aren't interactive like visuals, so when a user interacts with the tile, they go to the underlying report for more information.

Dashboards are an excellent way to provide high-level information to consumers. Similar to a dashboard in a vehicle, include the most important information in a dashboard. Then consumers can go to the report for more details.

![A screenshot of sample Power BI dashboard with various visualizations.](https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/media/pbi-bblocks_01.png)

To recap, the building blocks of Power BI are **semantic models** and **visuals**. Using Power BI Desktop, you create the semantic model and use visuals to create reports.

In the Power BI service, you can distribute content to your consumers and use reports to create dashboards.

<div class="page-break"></div>

100 XP

Now that you understand how to create a report, let's explore the Power BI service. The Power BI service provides a simple and interactive user experience to take your data analytics to the next level.

## Organize items with workspaces

**Workspaces** are the foundation of the Power BI service. When publishing any report, you must choose a workspace. By default, every user has access to *My workspace*, which is ideal only for testing. When you want to share content with others, **always** create and use a shared workspace.

![Screenshot of Power BI service workspaces with option to create a new workspace.](https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/media/pbi-touring-00.png)

## Explore sample reports

If you haven't created a report yet, Power BI offers several sample reports for you to explore. These reports load to My workspace so you can explore privately. You can access sample reports in the **Learn** section of the navigation pane.

![Screenshot of Power BI service Learning center with built-in sample reports.](https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/media/pbi-touring_01.png)

## Distribute content

In a workspace, you can create an **app**, which provides consumers a simplified interface to access reports and dashboards. In the app configuration, you set up the app, select the content to include (limited to the current workspace), and choose your audience.

Once you create an app, you must update the app after each change to items in the workspace. The requirement to update the app allows you to control what version of the content is visible to your audience.

![Screenshot of the app configuration in a Power BI workspace.](https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/media/pbi-touring_02.png)

Apps are the ideal sharing solution within any organization. While you can grant access to the workspace, workspace permissions may grant users access to more content than desired. Sharing individual items also presents a problem if you make changes you don't want consumers to see yet.

## Explore template apps

Now that you understand what an app is, let's look at **template apps**. Template apps allow you to find an existing app that suits your needs and then you connect your data. These apps can be a great way to quickly share insights with minimal effort.

![Screenshot of Power BI Template apps.](https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/media/pbi-touring_03.png)

In the following screenshot, we've installed the GitHub template app and have expanded the report. We can see different report pages, including *Top 100 Contributors* and *Pull Requests*. If your organization is using GitHub, using this template app can easily support your needs without starting from the beginning.

![Screenshot of the Github app.](https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/media/pbi-touring_04.png)

## Refresh a semantic model

In order to support your ever-changing data, you can configure scheduled refreshes of your semantic models in the Power BI service. On-demand refreshes are also available.

![Screenshot of the semantic models setting tab with Refresh section highlighted showing the different options, including frequency and time.](https://learn.microsoft.com/en-us/training/modules/get-started-with-power-bi/media/pbi-touring_05.png)

<div class="page-break"></div>

## Summary

100 XP

Microsoft Power BI offers a complete data analytics solution that includes data preparation, visualization, and distribution. **Semantic models** and **visualizations** are the building blocks of Power BI.

The flow and components of Power BI include:

- **Power BI Desktop** for creating semantic models and reports with visualizations.
- **Power BI service** for creating dashboards from published reports and distributing content with apps.
- **Power BI Mobile** for on-the-go access to the Power BI service content, designed for mobile.

By using Power BI, you can make data-informed decisions across your organization.


<div class="page-break"></div>

100 XP

If your organization uses a relational database for sales, you can use Power BI Desktop to connect directly to the database instead of using exported flat files.

Connecting Power BI to your database will help you to monitor the progress of your business and identify trends, so you can forecast sales figures, plan budgets and set performance indicators and targets. Power BI Desktop can connect to many relational databases that are either in the cloud or on-premises.

## Scenario

The Sales team at Tailwind Traders has requested that you connect to the organization's on-premises SQL Server database and get the sales data into Power BI Desktop so you can build sales reports.

[![Screenshot of the Data flow from SQL database into Power BI.](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-get-data-sql-server-ssm.png)](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-get-data-sql-server-ssm.png#lightbox)

### Connect to data in a relational database

You can use the **Get data** feature in Power BI Desktop and select the applicable option for your relational database. For this example, you would select the **SQL Server** option, as shown in the following screenshot.

[![Screenshot of the Get Data menu expanded to show SQL Server.](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-get-data-sql-server-dropdown-ssm..png)](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-get-data-sql-server-dropdown-ssm..png#lightbox)

Your next step is to enter your database server name and a database name in the **SQL Server database** window. The two options in data connectivity mode are: **Import** (selected by default, recommended) and **DirectQuery**. Mostly, you select **Import.** Other advanced options are also available in the **SQL Server database** window, but you can ignore them for now.

[![Screenshot of the SQL Server database details.](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-get-data-sql-server-db-ss.png)](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-get-data-sql-server-db-ss.png#lightbox)

After you've added your server and database names, you'll be prompted to sign in with a username and password. You'll have three sign-in options:

- **Windows** - Use your Windows account (Azure Active Directory credentials).
- **Database** - Use your database credentials. For instance, SQL Server has its own sign-in and authentication system that is sometimes used. If the database administrator gave you a unique sign-in to the database, you might need to enter those credentials on the **Database** tab.
- **Microsoft account** - Use your Microsoft account credentials. This option is often used for Azure services.

Select a sign-in option, enter your username and password, and then select **Connect**.

[![Screenshot of the database authorization details.](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-sql-creds-ssm.png)](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-sql-creds-ssm.png#lightbox)

### Select data to import

After the database has been connected to Power BI Desktop, the **Navigator** window displays the data that is available in your data source (the SQL database in this example). You can select a table or entity to preview its contents and make sure that the correct data will be loaded into the Power BI model.

Select the check box(es) of the table(s) that you want to bring in to Power BI Desktop, and then select either the **Load** or **Transform Data** option.

- **Load** - Automatically load your data into a Power BI model in its current state.
- **Transform Data** - Open your data in Microsoft Power Query, where you can perform actions such as deleting unnecessary rows or columns, grouping your data, removing errors, and many other data quality tasks.
	[![Screenshot of the Navigator window with available tables.](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-table-selection-ssm.png)](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-table-selection-ssm.png#lightbox)

### Import data by writing an SQL query

Another way you can import data is to write an SQL query to specify only the tables and columns that you need.

To write your SQL query, on the **SQL Server database** window, enter your server and database names, and then select the arrow next to **Advanced options** to expand this section and view your options. In the **SQL statement** box, write your query statement, and then select **OK**. In this example, you'll use the **Select** SQL statement to load the ID, NAME and SALESAMOUNT columns **from** the SALES table.

[![Screenshot of the SQL Server database dialog with a SQL query.](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-sql-statement-ss.png)](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-sql-statement-ss.png#lightbox)

### Change data source settings

After you create a data source connection and load data into Power BI Desktop, you can return and change your connection settings at any time. This action is often required due to a security policy within the organization, for example, when the password needs to be updated every 90 days. You can change the data source, edit permissions or clear permissions.

On the **Home** tab, select **Transform data,** and then select the **Data source settings** option.

[![Screenshot of the Transform data menu expanded with Data source settings highlighted.](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-change-sql-settings-ssm.png)](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-change-sql-settings-ssm.png#lightbox)

From the list of data sources that displays, select the data source that you want to update. Then, you can right-click that data source to view the available update options or you can use the update option buttons on the lower left of the window. Select the update option that you need, change the settings as required, and then apply your changes.

[![Screenshot of the Data source settings options.](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-sql-data-source-edit-ssm.png)](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-sql-data-source-edit-ssm.png#lightbox)

You can also change your data source settings from within Power Query. Select the table, and then select the **Data source settings** option on the **Home** ribbon. Alternatively, you can go to the **Query Settings** panel on the right side of the screen and select the settings icon next to Source (or double Select Source). In the window that displays, update the server and database details, and then select **OK**.

[![Screenshot of the Data source settings button.](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-edit-creds-ssm.png)](https://learn.microsoft.com/en-us/training/modules/get-data/media/3-edit-creds-ssm.png#lightbox)

After you have made the changes, select **Close and Apply** to apply those changes to your data source settings.

### Write an SQL statement

As previously mentioned, you can import data into your Power BI model by using an SQL query. SQL stands for Structured Query Language and is a standardized programming language that is used to manage relational databases and perform various data management operations.

Consider the scenario where your database has a large table that is comprised of sales data over several years. Sales data from 2009 isn't relevant to the report that you're creating. This situation is where SQL is beneficial because it allows you to load only the required set of data by specifying exact columns and rows in your SQL statement and then importing them into your semantic model. You can also join different tables, run specific calculations, create logical statements, and filter data in your SQL query.

The following example shows a simple query where the ID, NAME and SALESAMOUNT are selected from the SALES table.

The SQL query starts with a **Select** statement, which allows you to choose the specific fields that you want to pull from your database. In this example, you want to load the ID, NAME, and SALESAMOUNT columns.

SQL

```sql
SELECT
ID
, NAME
, SALESAMOUNT
FROM
```

FROM specifies the name of the table that you want to pull the data from. In this case, it's the SALES table. The following example is the full SQL query:

SQL

```sql
SELECT
ID
, NAME
, SALESAMOUNT
FROM
SALES
```

When using an SQL query to import data, try to avoid using the wildcard character (\*) in your query. If you use the wildcard character (\*) in your SELECT statement, you import all columns that you don't need from the specified table.

The following example shows the query using the wildcard character.

SQL

```sql
SELECT *
FROM
SALES
```

The wildcard character (\*) will import all columns within the **Sales** table. This method isn't recommended because it will lead to redundant data in your semantic model, which will cause performance issues and require extra steps to normalize your data for reporting.

All queries should also have a **WHERE** clause. This clause will filter the rows to pick only filtered records that you want. In this example, if you want to get recent sales data after January 1st, 2020, add a **WHERE** clause. The evolved query would look like the following example.

SQL

```sql
SELECT
ID
, NAME
, SALESAMOUNT
FROM
SALES
WHERE
OrderDate >= ‘1/1/2020’
```

It's a best practice to avoid doing this directly in Power BI. Instead, consider writing a query like this in a view. A view is an object in a relational database, similar to a table. Views have rows and columns, and can contain almost every operator in the SQL language. If Power BI uses a view, when it retrieves data, it participates in query folding, a feature of Power Query. Query folding will be explained later, but in short, Power Query will optimize data retrieval according to how the data is being used later.

and the rest - https://learn.microsoft.com/en-us/training/browse/?terms=power%20bi&filter-products=power&products=power-bi