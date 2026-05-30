---
title: "Reflections on My Software Engineering Internship at Starfisk"
date: 2026-05-14
thumbnail: "starfisk-logo"
excerpt: "A look back at my 13-week internship at Starfisk in Brugge."
tags: ["internship", "angular", "java-spring", "pgsql", "software-engineering"]
---

To wrap up my software engineering studies at Howest, I spent 13 weeks interning as a developer at **Starfisk** in Brugge, running from February to May 2026. This was my very first experience working as a developer in a professional context, and it gave me a fantastic look at what it takes to build, ship, and maintain real-world software within an active team.

Under the mentorship of **Colin Bundervoet**, I was integrated into the development team. I worked on **ProActor**, the payroll and HR  platform they develop.

Here is a recap of what I worked on, the technical challenges I encountered, and my key takeaways.

<app-image name="starfisk-logo" alt="Starfisk company logo"></app-image>

---

## My Contributions

During my 13 weeks, I was given the responsibility to work on several core aspects of ProActor, spanning database modeling, backend feature design, frontend interactions, and database migrations.

### Automating Wage Indexation

The main project of my internship was designing and implementing the new wage indexation system. Previously, managing joint committees, job functions, and wage categories was a manual, error-prone process that required administrators to import clunky Excel sheets. To resolve this, I built a set of CRUD endpoints to allow direct, secure management of these entities from within the application. On top of this CRUD foundation, I developed the complete wage indexation flow. This system enables users to select a specific joint committee, set an indexation date, and input an indexation percentage to preview the financial impact before applying it. The tool automatically scans the database to detect all jobs and long-term contracts (LTCs) that require a wage increase to prevent them from falling below the newly indexed minimum wage. During development, I discovered that retrieving and processing hundreds of employee records through Hibernate/JPA created a severe performance bottleneck. To solve this, I bypassed the ORM entirely and wrote optimized native SQL queries to offload the detection and adjustment logic directly to the PostgreSQL database engine.

### Integrating Bulk Recalculation Runs

Recalculation runs are a core mechanism used throughout different places in the application to update and verify payroll calculations, but they are also integral to the wage indexation process. Once minimum wages or allowance fees are updated, a bulk recalculation run is triggered to recalculate salaries for all affected records. To support these features and ensure long-term database stability, I modified the underlying data model to make the relationships concerning wage indexations, minimum wages, and recalculation runs more logical and consistent. I also introduced a `SalaryUpdateReason` to make it traceable why a salary has been changed (such as through automatic recalculation due to indexation, a manual recalculation, a manual change, etc.). Additionally, I implemented the backend orchestration for asynchronous bulk recalculation runs, adding real-time progress visualization so users can monitor calculations dynamically.

### Developing Utility Features

In addition to the indexation tool, I designed and implemented several utility features to improve daily workflows. For example, I implemented an import tool for travel sejours to automate data entry. To ensure data consistency, I incorporated a country matching step that maps the raw country names from the imported Excel sheet to the standardized namings in the database. If a match could not be made, the user can manually match up these countries. I also created a secure, manual upload system that allows administrators to attach signed contracts directly to jobs and long-term contracts. Alongside these features, I assisted with general functional testing of the application and resolved various small bugs identified by the team during active test cycles.

### Multi-Environment Database Consolidation

Finally, database consolidation was a major undertaking during my internship. To align our development, staging, and production environments, I was tasked with cleaning up and standardizing our schemas. This consolidation process involved removing unused tables that had accumulated over time, standardizing key-constraint naming conventions across all environments for consistency, resetting our Flyway migrations, and configuring Hibernate to run in validate mode. Ensuring these schema changes could be deployed safely without risking downtime or data loss was critical. To achieve this, I set up a local testing environment using cloned copies of the production databases, running multiple dry runs to carefully test and debug the migration scripts before we finally executed them on the production servers.

---

## Technology Stack and AI Usage

The ProActor tech stack consists of an Angular frontend, a Java Spring backend, and a PostgreSQL database.

At the architectural level, the frontend had a legacy Vue.js runtime where Angular built its components into HTML that the Vue runtime picked up and served. Near the end of my internship, the team made a significant push to remove this Vue runtime entirely and transition fully to Angular. They used Claude Code as an AI tool to help accelerate this refactoring work.

Reflecting Starfisk's forward-thinking approach to AI, the company also launched **Starfisk Studio** at the beginning of my internship. This service is designed specifically for smaller businesses looking to replace paper agendas and Excel sheets but struggling to find a standard SaaS solution that fits their unique needs. Through this initiative, custom applications are vibe-coded and deployed on independent servers outside of the Lovable platform. This allows Starfisk Studio to give small businesses access to tailor-made software at a fraction of the traditional cost.

---

## Agile Workflow

We collaborated using daily standups in the office. The team used a physical Kanban board with post-its on the wall, giving us an immediate, clear view of what everyone was working on, which features needed testing, and what was next. 

For code quality, every change went through a Merge Request. Code reviews were open to everyone on the team, while senior developers retained the permissions to merge changes into the main branch. With this approach everyone at the office learns from eachother.

<app-image name="starfisk-group" alt="The Starfisk team group picture at the office"></app-image>

---

## Final Thoughts

My internship at Starfisk was the best possible conclusion to my studies at Howest. I want to thank my mentor, Colin Bundervoet, and the entire team at Starfisk for their trust, guidance, and constructive feedback. I am excited to carry these practical lessons forward as I graduate at the end of June 2026 and start my professional career as a developer.
