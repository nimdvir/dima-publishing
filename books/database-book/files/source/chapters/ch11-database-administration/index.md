# Chapter 11: Database Administration

*Keeping Databases Secure, Reliable, Recoverable, and Ready for Use*

Database design answers how data should be structured. SQL answers how to retrieve, transform, and analyze that data. Database administration answers a different question: how do we keep the database working correctly once people depend on it? This chapter shows how database administrators protect reliability, security, concurrency, transactions, backups, recovery, performance, and maintenance — using the Grading Database as the running example, with principles that apply to any business system that stores important data.

## Chapter Roadmap

| Section | Main Question | Core Ideas |
| --- | --- | --- |
| [11.1 What Is Database Administration?](#11-1-what-is-database-administration) | What is database administration? | DBA role, data administration, operational reliability |
| [11.2 Core DBA Responsibilities](#11-2-core-dba-responsibilities) | What does a DBA do? | Security, concurrency, backup, performance, maintenance |
| [11.3 Multi-User Databases and Concurrency Control](#11-3-multi-user-databases-and-concurrency-control) | What happens when multiple users access data? | Locks, lost updates, deadlocks, optimistic and pessimistic control |
| [11.4 Transactions and ACID Reliability](#11-4-transactions-and-acid-reliability) | How do transactions protect reliability? | ACID, `BEGIN`, `COMMIT`, `ROLLBACK` |
| [11.5 Database Security](#11-5-database-security) | How is database access controlled? | Authentication, authorization, roles, privileges, least privilege |
| [11.6 Backup and Recovery](#11-6-backup-and-recovery) | How do databases recover from failure? | Backups, logs, rollback, rollforward, disaster recovery |
| [11.7 Performance Monitoring and Tuning](#11-7-performance-monitoring-and-tuning) | How do DBAs keep databases fast? | Indexes, query plans, tuning, monitoring |
| [11.8 Maintenance and Database Evolution](#11-8-maintenance-and-database-evolution) | How do databases evolve safely? | Maintenance, integrity checks, schema change |
| [11.9 DBA Work Across Platforms](#11-9-dba-work-across-platforms) | How does administration differ by platform? | Access, SQLite, PostgreSQL, Supabase, cloud responsibility |
| [11.10 Hands-On DBA Practice with the Grading Database](#11-10-hands-on-dba-practice-with-the-grading-database) | How can students practice DBA thinking? | Hands-on administrative tasks using the Grading Database |

## Chapter Files

- [Main Chapter](core-concepts.md)
