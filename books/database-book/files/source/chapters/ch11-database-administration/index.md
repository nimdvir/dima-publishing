# Chapter 11: Database Administration

Chapter 9 showed us how to design databases from business requirements. Chapter 10 showed us how to query them professionally for insight. Chapter 11 now asks a different question: who protects the data, keeps it running, and makes sure it is still there tomorrow?

Database design and SQL are forward-looking disciplines — they build and query. Database administration is a sustaining discipline — it guards, maintains, recovers, and evolves. Every well-designed system that supports real decisions depends on someone making sure it stays secure, fast, available, and trustworthy.

## Chapter Video

<div class="video-container">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/1QX02C7xBYk" title="Ch 11 - DB Administration (5:35)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

*Chapter 11 overview video (5:35) — a quick orientation before you read.*

# Chapter Roadmap

| Topic | Why It Matters |
| --- | --- |
| [11.1 What Is Database Administration?](#11-1-what-is-database-administration) | Meet the role that keeps organizational data secure, available, and performing well. |
| [11.2 Core DBA Responsibilities](#11-2-core-dba-responsibilities) | Learn the essential tasks — backup, recovery, performance, and security — that define the DBA role. |
| [11.3 Multi-User Databases and Concurrency Control](#11-3-multi-user-databases-and-concurrency-control) | Learn how databases handle hundreds of simultaneous users without data conflicts. |
| [11.4 Transactions and ACID Reliability](#11-4-transactions-and-acid-reliability) | See how databases guarantee that multi-step operations either fully complete or fully roll back. |
| [11.5 Database Security](#11-5-database-security) | Understand how databases control who can see and change what — a critical business concern. |
| [11.6 Backup and Recovery](#11-6-backup-and-recovery) | Learn the strategies that prevent a single hardware failure from destroying organizational data. |
| [11.7 Performance Monitoring and Tuning](#11-7-performance-monitoring-and-tuning) | Diagnose and fix the slow queries and bottlenecks that frustrate users. |
| [11.8 Maintenance and Database Evolution](#11-8-maintenance-and-database-evolution) | Keep a production database healthy as requirements and schemas change over time. |
| [11.9 DBA Work Across Platforms](#11-9-dba-work-across-platforms) | Compare how administration works across Access, SQLite, PostgreSQL, and Supabase. |
| [11.10 Common DBA Mistakes](#11-10-common-dba-mistakes) | Recognize the avoidable errors that cause outages, breaches, and data loss. |
| [11.11 Practicing DBA Thinking](#11-11-practicing-dba-thinking) | Build the judgment to protect data and decisions, not just run commands. |

---
