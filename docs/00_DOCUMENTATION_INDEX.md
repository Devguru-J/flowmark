# Flowmark Documentation Index

**Document ID:** DOC-00  
**Status:** Normative  
**Owner:** Head of Product and CTO  
**Approvers:** Product, Engineering, Design, Security, and Operations leads  
**Review cadence:** Monthly during MVP delivery; quarterly after general availability  
**Last reviewed:** 2026-07-11  
**Applies to:** Flowmark MVP and all planned extensions

## 1. Purpose

This index is the control plane for Flowmark's product and engineering documentation. It tells readers where an authoritative answer lives, how the documents relate, which role maintains each document, and how the company resolves contradictions. It is not a substitute for the indexed specifications. A team member should use this file to choose a reading path, identify the owner of a disputed requirement, and determine which artifacts must change together.

The repository is intentionally organized from product intent through user experience, architecture, delivery, operation, and commercial strategy. Numbering defines the default reading sequence, not authority. Authority is established by the hierarchy in Section 4.

## 2. Documentation conventions

### 2.1 Requirement language

The terms **must**, **must not**, **required**, and **prohibited** express binding requirements. **Should** expresses the default approach; deviation requires a documented reason in the pull request or decision log. **May** expresses an allowed option. Future capabilities are non-binding until moved into an accepted scope document.

Every feature statement must be labeled or clearly contextualized as one of:

- **MVP:** committed for the first production release.
- **Near-term:** a likely post-MVP extension for which architectural preparation is reasonable.
- **Future:** directional and not authorized for implementation.
- **Optional:** permitted only after explicit approval.
- **Rejected:** deliberately excluded unless a new decision supersedes the rejection.

Descriptions of future behavior do not authorize implementation, schema expansion, dependencies, or infrastructure spending.

### 2.2 Document classes

- **Normative:** defines requirements, contracts, controls, or accepted decisions. Implementations are non-conforming when they violate it.
- **Descriptive:** explains context, rationale, examples, or recommended practice. It informs decisions but cannot override a normative source.
- **Template:** prescribes the structure of a future record but contains no product requirement by itself.
- **Living register:** changes as decisions, risks, questions, or work progress. Accepted entries can be normative even when the register as a whole is operational.

### 2.3 Status model

Documents use **Draft**, **In Review**, **Accepted**, **Superseded**, or **Archived**. A normative document becomes binding only when Accepted. This index may list a target classification before the document is authored; until that document is accepted, the highest accepted source in the hierarchy governs. Superseded documents remain in version history and point to their replacements.

### 2.4 Links and identifiers

Documents refer to one another by filename. Decisions use `DEC-###`, risks use `RISK-###`, requirements use `PRD-<AREA>-###`, acceptance criteria use `AC-<AREA>-###`, and implementation tasks use `TASK-<PHASE>-###`. Stable identifiers must not be recycled after deletion.

## 3. Repository map and recommended reading order

New contributors should not read all documents linearly before becoming productive. Use the path that matches the work.

### 3.1 Executive and product orientation

Read `01` through `09`, then `14`, `17`, `18`, and `07`. This path explains why Flowmark exists, the MVP boundary, how the product is organized, and how success is measured. Product, design, engineering, marketing, and support contributors should complete it.

### 3.2 Product delivery path

Read `05` through `25`, `28` through `42`, `97`, `113`, and `114`. This path is required for anyone designing, implementing, or accepting an MVP workflow.

### 3.3 Frontend engineering path

Read `34` through `52`, then `63` through `73`, `97`, `100` through `105`, `109`, `110`, and the relevant testing documents `78` through `87`.

### 3.4 Backend, data, and security path

Read `17`, `24`, `25`, and `52` through `69`, followed by `73`, `74`, `83`, `84`, `89`, and `95`. No database or authorization change may be reviewed without this path's applicable contracts.

### 3.5 Quality and release path

Read `64`, `67`, `70`, and `74` through `100`, then `113`, `114`, and `116`. Release owners must also read `90` through `96`.

### 3.6 Commercial and launch path

Read `01` through `13`, `68`, `77`, `120` through `129`, and `133`. Commercial plans must not redefine product scope without updating the normative product documents.

## 4. Single source of truth hierarchy

When accepted documents conflict, apply the following order. A higher item wins unless it explicitly delegates a decision to a lower item.

1. **Legal, privacy, and security obligations:** applicable law and accepted documents `57`, `58`, `67`, `68`, `69`, `120`, and `121`.
2. **Accepted product scope and requirements:** `05`, `06`, `07`, and approved entries in `115`.
3. **Domain and data contracts:** `17`, `20` through `25`, `52` through `58`, `63`, `65`, and `66`.
4. **UX and accessibility specifications:** `14` through `16`, `28` through `42`, and `97` through `100`.
5. **Architecture and operational controls:** `43` through `51`, `59` through `62`, `64`, and `70` through `96`.
6. **Delivery and engineering guidance:** `101` through `114`.
7. **Strategy, planning, and supporting guidance:** `01` through `04`, `08` through `13`, and `116` through `133`.

Accepted architecture decisions in `115_DECISIONS.md` explain or amend a governing document; they do not silently override legal, security, or product requirements. If a decision changes a higher-order source, that source must be amended in the same change set.

Implementation, tests, tickets, design files, chat messages, and source-code comments are evidence of execution, not sources of product truth. If code contradicts an accepted normative document, treat the code as a defect unless a newer accepted decision clearly establishes that the documentation is stale.

## 5. Conflict resolution and change control

The person finding a contradiction must open a documentation issue and identify both statements, their document statuses, and the affected release. Until resolved, the safer interpretation governs: protect user data first, preserve accessibility second, avoid irreversible behavior third, and otherwise maintain the currently released behavior.

The owner of the higher-authority document leads resolution. Security or privacy disputes require Security approval; scope disputes require Product approval; data-contract disputes require the Database Architect and affected engineering lead; accessibility disputes require Design and QA approval. The CTO is final technical arbiter, the Head of Product is final product arbiter, and the founders jointly decide disputes that materially alter business strategy or legal exposure.

A normative change must include:

1. the user or operational problem;
2. the changed requirement and rationale;
3. affected documents and implementation tasks;
4. migration, rollout, rollback, and compatibility effects;
5. security, privacy, accessibility, localization, and cost review as applicable;
6. acceptance criteria and verification evidence; and
7. an accepted decision entry when the change is costly to reverse, cross-cutting, or precedent-setting.

No normative contract may be changed by editing only a downstream summary. Coupled documents listed in Section 7 must be reviewed in the same pull request, even when the conclusion is “no textual change required.”

## 6. Document catalog

The owner is accountable for accuracy, not necessarily sole authorship. “Monthly” means monthly during active MVP development and quarterly after launch unless a trigger requires immediate review.

### 6.1 Product foundation (`01`–`13`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `01_PROJECT_OVERVIEW.md` | Descriptive | Concise company, product, user, platform, scope, and system orientation for new contributors. | Product | Quarterly |
| `02_VISION.md` | Normative | Defines the durable future state Flowmark seeks and the boundaries of that ambition. | Founders | Semiannual |
| `03_PRODUCT_STRATEGY.md` | Normative | Defines target market, strategic choices, sequencing, advantage hypotheses, and validation approach. | Product | Quarterly |
| `04_PRODUCT_PRINCIPLES.md` | Normative | Establishes decision principles for speed, clarity, reliability, progressive disclosure, and scope discipline. | Product + Design | Quarterly |
| `05_PRODUCT_REQUIREMENTS.md` | Normative | Master behavioral requirements, constraints, quality attributes, and traceable requirement IDs. | Product | Every release |
| `06_SCOPE.md` | Normative | Defines included, excluded, deferred, and rejected capabilities and the process for scope changes. | Product | Biweekly |
| `07_MVP.md` | Normative | Defines Must/Should/Could/Won't commitments and release boundary for the first production version. | Product | Biweekly |
| `08_ROADMAP.md` | Descriptive | Sequences outcomes and capability horizons without converting forecasts into commitments. | Product | Monthly |
| `09_SUCCESS_METRICS.md` | Normative | Defines product, quality, reliability, and business metrics with formulas, guardrails, and review thresholds. | Product + Data | Monthly |
| `10_PERSONAS.md` | Descriptive | Records evidence-based primary and secondary user archetypes and explicitly rejects stereotype-driven use. | Product Research | Semiannual |
| `11_JOBS_TO_BE_DONE.md` | Descriptive | Defines functional, emotional, and social jobs and the circumstances that trigger them. | Product Research | Semiannual |
| `12_USER_STORIES.md` | Normative | Maps user needs to scoped stories, constraints, priorities, and acceptance references. | Product | Every release |
| `13_USE_CASES.md` | Normative | Specifies end-to-end actors, preconditions, main flows, alternatives, failures, and postconditions. | Product + QA | Every release |

### 6.2 Product behavior and domain experience (`14`–`33`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `14_INFORMATION_ARCHITECTURE.md` | Normative | Defines concepts, hierarchy, content grouping, naming, and findability across the application. | Product + Design | Every release |
| `15_NAVIGATION.md` | Normative | Specifies routes exposed to users, sidebar and mobile navigation, selection, history, and wayfinding. | Design | Every release |
| `16_USER_FLOWS.md` | Normative | Specifies complete happy, alternate, recovery, keyboard, and mobile flows for MVP tasks. | Design + Product | Every release |
| `17_TASK_LIFECYCLE.md` | Normative | Defines task states, allowed transitions, timestamps, invariants, deletion, restoration, and edge cases. | Product + Architecture | Every release |
| `18_FEATURES.md` | Descriptive | Catalogs capabilities by lifecycle stage and points to each authoritative specification. | Product | Monthly |
| `19_TASK_MANAGEMENT.md` | Normative | Defines capture, viewing, editing, completion, reopening, deletion, restoration, and bulk-behavior boundaries. | Product | Every release |
| `20_PRIORITY_SYSTEM.md` | Normative | Defines priority values, stored representation, ordering, semantics, visuals, and accessibility behavior. | Product + Design | Every release |
| `21_DUE_DATE_SYSTEM.md` | Normative | Defines due dates and optional times, date urgency, input, display, removal, and timezone interaction. | Product + Architecture | Every release |
| `22_STATUS_SYSTEM.md` | Normative | Defines Inbox, To Do, In Progress, Completed, and Cancelled semantics and transition rules. | Product | Every release |
| `23_SEARCH_FILTER_SORT.md` | Normative | Defines query scope, filters, URL state, sorting, tie-breakers, empty results, and scale thresholds. | Product + Frontend | Every release |
| `24_AUTHENTICATION.md` | Normative | Defines registration, login, verification, recovery, sessions, protected routes, errors, and abuse controls. | Security + Product | Every release |
| `25_ACCOUNT_MANAGEMENT.md` | Normative | Defines profile preferences, locale, security-sensitive actions, export, and account deletion experience. | Product + Security | Every release |
| `26_NOTIFICATIONS_FUTURE.md` | Descriptive | Evaluates future reminders and notification channels without authorizing MVP implementation. | Product | Semiannual |
| `27_COLLABORATION_FUTURE.md` | Descriptive | Evaluates future workspaces, membership, roles, comments, presence, and sharing migration paths. | Product + Architecture | Semiannual |
| `28_UX.md` | Normative | Establishes the overall interaction model, perceived-performance goals, disclosure strategy, and UX quality bar. | Design | Every release |
| `29_INTERACTION_DESIGN.md` | Normative | Defines pointer, touch, focus, selection, editing, confirmation, undo, and feedback behavior. | Design | Every release |
| `30_KEYBOARD_EXPERIENCE.md` | Normative | Defines shortcuts, focus movement, conflicts, command behavior, discovery, and assistive-technology compatibility. | Design + Accessibility | Every release |
| `31_RESPONSIVE_DESIGN.md` | Normative | Defines breakpoints by behavior, layout adaptation, mobile parity, touch targets, and narrow-window behavior. | Design + Frontend | Every release |
| `32_EMPTY_LOADING_ERROR_STATES.md` | Normative | Defines contextual empty, skeleton, slow, offline, partial-failure, retry, and terminal error states. | Design + Product | Every release |
| `33_ACCESSIBILITY.md` | Normative | Defines WCAG target, semantics, focus, contrast, announcements, input, motion, and accessibility acceptance criteria. | Accessibility Lead | Every release |

### 6.3 Visual design system (`34`–`42`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `34_DESIGN.md` | Normative | Defines visual direction and explains how visual decisions serve hierarchy, trust, and speed. | Design | Quarterly |
| `35_DESIGN_SYSTEM.md` | Normative | Defines token layers, component governance, contribution rules, states, and cross-platform consistency. | Design Systems | Monthly |
| `36_COLOR_SYSTEM.md` | Normative | Defines primitive and semantic color tokens, contrast, modes, status usage, and prohibited color-only meaning. | Design Systems | Every release |
| `37_TYPOGRAPHY.md` | Normative | Defines font stack, scale, weights, line heights, text roles, localization behavior, and loading strategy. | Design Systems | Quarterly |
| `38_SPACING_LAYOUT.md` | Normative | Defines spacing scale, grids, density, containers, radii, borders, elevation, and responsive composition. | Design Systems | Quarterly |
| `39_COMPONENT_LIBRARY.md` | Normative | Specifies reusable component APIs conceptually, variants, states, composition, accessibility, and ownership. | Design Systems + Frontend | Every release |
| `40_ICONS_ILLUSTRATIONS.md` | Normative | Defines Lucide usage, icon sizing and labeling, illustration restraint, and localization considerations. | Design | Quarterly |
| `41_MOTION.md` | Normative | Defines permitted motion, duration, easing, performance, interruption, and reduced-motion behavior. | Design + Frontend | Every release |
| `42_DARK_MODE.md` | Normative | Defines theme behavior, system and user preference, token mapping, persistence, contrast, and testing. | Design Systems | Every release |

### 6.4 Frontend and system architecture (`43`–`52`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `43_FRONTEND_ARCHITECTURE.md` | Normative | Defines React composition, feature boundaries, dependency direction, rendering, performance, and testing seams. | Frontend Architecture | Monthly |
| `44_SYSTEM_ARCHITECTURE.md` | Normative | Defines system context, trust boundaries, Cloudflare/Supabase responsibilities, environments, and evolution. | CTO | Quarterly |
| `45_SYSTEM_DESIGN.md` | Normative | Specifies runtime interactions, quality attributes, scaling behavior, failure handling, and major tradeoffs. | Architecture | Quarterly |
| `46_APPLICATION_STRUCTURE.md` | Normative | Defines feature-based source organization, public module surfaces, import rules, and ownership boundaries. | Frontend Architecture | Monthly |
| `47_ROUTING.md` | Normative | Defines TanStack Router route ownership, auth boundaries, loaders, lazy loading, errors, redirects, and not-found behavior. | Frontend Architecture | Every release |
| `48_STATE_MANAGEMENT.md` | Normative | Allocates local, URL, form, remote, and Zustand state and prohibits duplicated server state. | Frontend Architecture | Every release |
| `49_SERVER_STATE.md` | Normative | Defines query keys, cache timing, retries, invalidation, pagination, prefetch, background refresh, and offline behavior. | Frontend Architecture | Every release |
| `50_FORM_ARCHITECTURE.md` | Normative | Defines React Hook Form and Zod boundaries, validation timing, drafts, submission, focus, and server-error mapping. | Frontend Architecture | Every release |
| `51_DATA_FLOW.md` | Normative | Traces reads and mutations across UI, schemas, query modules, Supabase, cache, and recovery paths. | Architecture | Every release |
| `52_DOMAIN_MODEL.md` | Normative | Defines domain entities, value semantics, invariants, ownership, lifecycle, and extension seams independent of storage. | Architecture + Product | Every release |

### 6.5 Data, Supabase, API, and security (`53`–`69`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `53_DATABASE_ARCHITECTURE.md` | Normative | Defines PostgreSQL organization, ownership model, access patterns, tenancy readiness, and database boundaries. | Database Architect | Monthly |
| `54_DATABASE_SCHEMA.md` | Normative | Specifies tables, columns, types, enums, relationships, constraints, defaults, and lifecycle semantics without SQL. | Database Architect | Every schema change |
| `55_DATABASE_INDEXING.md` | Normative | Maps indexes to measured access patterns, selectivity, write cost, query plans, and removal criteria. | Database Architect | Every schema change |
| `56_DATABASE_MIGRATIONS.md` | Normative | Defines forward-only migration workflow, compatibility windows, data changes, validation, rollback strategy, and ownership. | Database Architect | Every schema change |
| `57_ROW_LEVEL_SECURITY.md` | Normative | Defines complete per-table RLS policies, attack assumptions, service-role boundaries, performance, and policy tests. | Security + Database | Every schema change |
| `58_AUTHORIZATION.md` | Normative | Defines permissions above authentication, enforcement points, denial behavior, and future membership migration. | Security | Every release |
| `59_SUPABASE.md` | Normative | Defines project separation, client boundaries, Auth/Database usage, limits, logs, cost, lock-in, and export strategy. | Backend Lead | Quarterly |
| `60_SUPABASE_EDGE_FUNCTIONS.md` | Normative | Defines when privileged server execution is justified, authentication, validation, secrets, observability, and non-use cases. | Backend Lead + Security | Every function change |
| `61_SUPABASE_REALTIME.md` | Descriptive | Defines why Realtime is outside MVP and the conditions, consistency model, and cost for later adoption. | Architecture | Semiannual |
| `62_SUPABASE_STORAGE.md` | Descriptive | Defines why file storage is outside MVP and future bucket, policy, scanning, retention, and quota requirements. | Architecture + Security | Semiannual |
| `63_API_CONTRACTS.md` | Normative | Defines client data-access contracts, request/response shapes, errors, idempotency, pagination, and versioning principles. | Backend + Frontend | Every contract change |
| `64_ERROR_HANDLING.md` | Normative | Defines error taxonomy, safe presentation, recovery, boundaries, retries, reporting, and non-disclosure rules. | Architecture + Design | Every release |
| `65_VALIDATION.md` | Normative | Defines validation at UI, runtime, database, and privileged boundaries and canonical error ownership. | Architecture + Security | Every contract change |
| `66_DATE_TIME_TIMEZONES.md` | Normative | Defines storage and interpretation of dates, optional times, user zones, DST, locale formatting, and test matrices. | Architecture | Every release |
| `67_SECURITY.md` | Normative | Master application-security policy covering keys, sessions, headers, input, dependencies, abuse, and response. | Security | Monthly |
| `68_PRIVACY.md` | Normative | Defines data minimization, purpose, access, disclosure, telemetry, user rights, and privacy review. | Privacy + Product | Quarterly |
| `69_THREAT_MODEL.md` | Normative | Enumerates assets, actors, trust boundaries, threats, controls, residual risk, and review triggers. | Security | Quarterly |

### 6.6 Performance, reliability, and observability (`70`–`77`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `70_PERFORMANCE.md` | Normative | Defines measurable web-vital, bundle, interaction, query, scale, memory, and slow-network budgets. | Performance Owner | Every release |
| `71_CACHING.md` | Normative | Defines browser, CDN, asset, query, and authentication cache behavior and invalidation safety. | Architecture | Every release |
| `72_OPTIMISTIC_UPDATES.md` | Normative | Defines eligible mutations, snapshots, concurrency, undo windows, rollback, reconciliation, and user feedback. | Frontend Architecture | Every release |
| `73_CONCURRENCY_CONFLICTS.md` | Normative | Defines stale writes, multi-tab behavior, duplicate submissions, delete/update races, detection, and resolution. | Architecture | Every release |
| `74_RELIABILITY.md` | Normative | Defines service objectives, degradation, idempotency, resilience, recovery, dependency failure, and ownership. | SRE/Operations | Monthly |
| `75_OBSERVABILITY.md` | Normative | Defines signals, dashboards, alerts, correlation, environment separation, and optional Sentry evaluation. | SRE/Operations | Monthly |
| `76_LOGGING.md` | Normative | Defines structured events, levels, redaction, retention, access, correlation, and prohibited sensitive content. | SRE + Security | Quarterly |
| `77_ANALYTICS.md` | Normative | Defines approved privacy-conscious traffic analytics and requires explicit approval for product analytics. | Product + Privacy | Quarterly |

### 6.7 Testing and quality assurance (`78`–`87`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `78_TESTING_STRATEGY.md` | Normative | Defines risk-based test layers, ownership, environments, gates, traceability, and regression policy. | QA Lead | Every release |
| `79_UNIT_TESTING.md` | Normative | Defines Vitest boundaries for pure domain, validation, date, state, and utility behavior. | QA + Engineering | Quarterly |
| `80_COMPONENT_TESTING.md` | Normative | Defines React Testing Library behavior-focused tests, accessibility queries, interactions, and mocking limits. | QA + Frontend | Quarterly |
| `81_INTEGRATION_TESTING.md` | Normative | Defines tests across routes, query cache, Supabase adapters, auth, and failure boundaries. | QA Lead | Every release |
| `82_END_TO_END_TESTING.md` | Normative | Defines Playwright journeys, browsers, responsive coverage, fixtures, isolation, retries, and release smoke tests. | QA Lead | Every release |
| `83_DATABASE_TESTING.md` | Normative | Defines constraints, migrations, functions, query behavior, indexes, and local Supabase test requirements. | Database + QA | Every schema change |
| `84_RLS_TESTING.md` | Normative | Defines positive and adversarial tests for anonymous, owner, other-user, and service-role access. | Security + QA | Every policy change |
| `85_ACCESSIBILITY_TESTING.md` | Normative | Defines automated and manual keyboard, screen-reader, zoom, contrast, motion, and cross-browser checks. | Accessibility + QA | Every release |
| `86_PERFORMANCE_TESTING.md` | Normative | Defines lab and field measurement, datasets, network/device profiles, thresholds, and regression gates. | Performance + QA | Every release |
| `87_TEST_DATA.md` | Normative | Defines deterministic factories, locale/timezone cases, privacy, isolation, cleanup, and production-data prohibition. | QA + Security | Quarterly |

### 6.8 Development, deployment, and operations (`88`–`100`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `88_LOCAL_DEVELOPMENT.md` | Normative | Defines supported setup, pnpm workflow, local Supabase, seeding, verification, troubleshooting, and parity limits. | Developer Experience | Monthly |
| `89_ENVIRONMENT_CONFIGURATION.md` | Normative | Defines local/development/staging/production variables, secret ownership, validation, rotation, and exposure rules. | DevOps + Security | Monthly |
| `90_CI_CD.md` | Normative | Defines GitHub Actions checks, protected branches, artifacts, deployment gates, permissions, and secret use. | DevOps | Monthly |
| `91_CLOUDFLARE_PAGES.md` | Normative | Defines Pages project, builds, output, previews, domains, SPA fallback, headers, caching, analytics, cost, and limits. | DevOps | Quarterly |
| `92_DEPLOYMENT.md` | Normative | Defines staging and production deployment procedure, approvals, migrations, verification, and communication. | Release Manager | Every release |
| `93_RELEASE_PROCESS.md` | Normative | Defines release planning, freeze, versioning, evidence, sign-off, notes, rollout, and closure. | Release Manager | Every release |
| `94_ROLLBACK_RECOVERY.md` | Normative | Defines rollback criteria and procedures for frontend, migrations, configuration, and partial failure. | DevOps + Database | Every release |
| `95_BACKUP_RESTORE.md` | Normative | Defines backup coverage, retention, encryption, restore objectives, drills, ownership, and Supabase constraints. | Operations + Database | Quarterly |
| `96_MONITORING_INCIDENTS.md` | Normative | Defines alert response, severity, roles, communication, containment, recovery, and blameless review. | Incident Commander | Quarterly |
| `97_LOCALIZATION.md` | Normative | Defines i18next architecture, namespaces, keys, detection, fallback, formatting, Korean/English QA, and no-hardcoding rule. | Localization Lead | Every release |
| `98_CONTENT_STYLE.md` | Normative | Defines Korean and English voice, terminology, grammar, inclusive language, errors, empty states, and translation guidance. | Content Design | Quarterly |
| `99_SEO_METADATA.md` | Normative | Defines public-page metadata, indexing boundaries, canonical URLs, social previews, locale metadata, and app privacy. | Marketing + Frontend | Quarterly |
| `100_BROWSER_SUPPORT.md` | Normative | Defines supported browser versions, progressive enhancement, test matrix, degradation, and deprecation policy. | Frontend + QA | Quarterly |

### 6.9 Engineering governance and delivery (`101`–`119`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `101_CODE_STYLE.md` | Normative | Defines TypeScript, React, formatting, imports, comments, complexity, and readability rules. | Engineering | Quarterly |
| `102_ENGINEERING_STANDARDS.md` | Normative | Defines correctness, simplicity, reviewability, security, testing, operational readiness, and exception handling. | CTO | Quarterly |
| `103_FOLDER_STRUCTURE.md` | Normative | Defines repository layout, feature/module ownership, test placement, generated artifacts, and forbidden coupling. | Architecture | Quarterly |
| `104_NAMING_CONVENTIONS.md` | Normative | Defines names for files, components, hooks, schemas, queries, database objects, events, tests, and identifiers. | Engineering | Quarterly |
| `105_DEPENDENCY_MANAGEMENT.md` | Normative | Defines evaluation, approval, pinning, updates, licensing, security, bundle cost, and removal. | Engineering + Security | Monthly |
| `106_GIT_WORKFLOW.md` | Normative | Defines branches, commits, synchronization, protected history, releases, and emergency changes. | Engineering | Quarterly |
| `107_CODE_REVIEW.md` | Normative | Defines review scope, required reviewers, severity, evidence, response, approval, and merge rules. | Engineering | Quarterly |
| `108_CONTRIBUTING.md` | Descriptive | Provides the contributor entry path and links to binding setup, workflow, quality, and conduct rules. | Developer Experience | Quarterly |
| `109_CLAUDE.md` | Normative | Governs AI-assisted implementation with stack rules, limits, forbidden patterns, validation, and review checklist. | CTO | Monthly |
| `110_AI_ENGINEERING_RULES.md` | Normative | Defines human accountability, context, verification, privacy, security, provenance, and acceptable AI use. | CTO + Security | Monthly |
| `111_TASKS.md` | Living register | Breaks delivery into small, dependent, independently verifiable tasks with risks and definition of done. | Program Manager | Weekly |
| `112_IMPLEMENTATION_PHASES.md` | Normative | Defines phase outcomes, entry/exit gates, sequencing, concurrency constraints, and release checkpoints. | CTO + Product | Monthly |
| `113_ACCEPTANCE_CRITERIA.md` | Normative | Consolidates testable MVP acceptance criteria and traceability to requirements, tasks, and tests. | Product + QA | Every release |
| `114_DEFINITION_OF_DONE.md` | Normative | Defines completion requirements for task, feature, phase, release, documentation, security, and operations. | Engineering + QA | Quarterly |
| `115_DECISIONS.md` | Living register | Records accepted and proposed product/architecture decisions, alternatives, consequences, and review triggers. | CTO + Product | On every decision |
| `116_RISKS.md` | Living register | Tracks product, technical, security, operational, cost, and business risks with owners and contingencies. | Program Manager | Monthly |
| `117_TECHNICAL_DEBT.md` | Living register | Records intentional compromises, impact, interest, owner, remediation trigger, and prevention of invisible debt. | Engineering | Monthly |
| `118_SCALABILITY.md` | Descriptive | Defines measured scale stages, bottlenecks, thresholds, migration options, and anti-premature-scaling rules. | Architecture | Quarterly |
| `119_COST_MANAGEMENT.md` | Normative | Defines budgets, cost drivers, alerts, environment controls, unit economics, and approval thresholds. | Finance + CTO | Monthly |

### 6.10 Legal, commercial, support, and reference (`120`–`133`)

| File | Class | Purpose | Owner | Review |
|---|---|---|---|---|
| `120_LEGAL_COMPLIANCE.md` | Normative | Maps applicable legal obligations, contracts, licenses, user terms, and counsel review triggers without replacing legal advice. | Legal/Privacy | Quarterly |
| `121_DATA_RETENTION_DELETION.md` | Normative | Defines active, soft-deleted, backup, log, and account data retention, deletion verification, and exceptions. | Privacy + Database | Quarterly |
| `122_MARKETING.md` | Descriptive | Defines audience, evidence, messaging system, assets, channels, measurement, and prohibited unsupported claims. | Marketing | Quarterly |
| `123_POSITIONING.md` | Normative | Defines category, target niche, competitive frame, differentiation around clarity and speed, and proof requirements. | Product Marketing | Quarterly |
| `124_PRICING.md` | Descriptive | Compares launch and long-term pricing options, expectations, friction, regional considerations, and decision criteria. | Founders + Finance | Quarterly |
| `125_MONETIZATION.md` | Descriptive | Evaluates sustainable revenue models, cost alignment, entitlements, data expectations, and future team economics. | Founders + Finance | Quarterly |
| `126_LAUNCH_STRATEGY.md` | Normative | Defines launch audience, readiness gates, channels, feedback, support coverage, rollback, and success review. | Product + Marketing | Monthly pre-launch |
| `127_GROWTH_STRATEGY.md` | Descriptive | Defines ethical acquisition, activation, retention, referral hypotheses, experiments, and guardrails. | Growth + Product | Quarterly |
| `128_SUPPORT.md` | Normative | Defines channels, service expectations, triage, escalation, privacy, incident links, and feedback routing. | Support Lead | Quarterly |
| `129_FAQ.md` | Descriptive | Provides approved user-facing answers consistent with current scope, privacy, pricing, and support policies. | Support + Content | Every release |
| `130_CHANGELOG_TEMPLATE.md` | Template | Defines the internal structure for traceable product and engineering change records. | Release Manager | Annual |
| `131_RELEASE_NOTES_TEMPLATE.md` | Template | Defines concise user-facing release communication, known issues, localization, and support links. | Product Marketing | Annual |
| `132_GLOSSARY.md` | Normative | Defines canonical product, design, domain, database, security, and operational terminology. | Technical Writing | Every release |
| `133_OPEN_QUESTIONS.md` | Living register | Records genuine unresolved decisions with recommendation, alternatives, owner, deadline, and blocking impact. | Product Operations | Weekly |

## 7. Coupled-document update matrix

The following groups are transactional documentation units. A change to one requires review of every listed document and an explicit note for unaffected files.

| Change area | Documents reviewed together |
|---|---|
| MVP scope or feature behavior | `05`, `06`, `07`, `12`, `13`, `18`, applicable `19`–`25`, `111`, `112`, `113`, `115`, `116` |
| Task status or lifecycle | `13`, `16`, `17`, `19`, `22`, `32`, `52`, `54`, `57`, `63`, `72`, `73`, `113`, `132` |
| Priority semantics | `19`, `20`, `23`, `35`, `36`, `39`, `52`, `54`, `63`, `97`, `113`, `132` |
| Due dates, times, or timezone rules | `16`, `17`, `21`, `23`, `29`, `52`, `54`, `63`, `66`, `79`, `82`, `87`, `97`, `113` |
| Authentication or account deletion | `13`, `24`, `25`, `47`, `53`, `57`, `58`, `64`, `67`–`69`, `81`, `82`, `84`, `89`, `95`, `113`, `120`, `121` |
| Database schema or policy | `52`–`58`, `63`, `65`, `73`, `83`, `84`, `89`, `94`, `95`, `115`, `116` |
| Navigation or routing | `14`–`16`, `28`–`33`, `43`, `46`, `47`, `70`, `82`, `97`, `99`, `100`, `113` |
| Query, mutation, or cache behavior | `43`, `48`, `49`, `51`, `63`–`65`, `70`–`73`, `78`–`82`, `113` |
| Design-system component | `28`–`42`, `70`, `80`, `85`, `86`, `97`, `100`, `113` |
| Localization or content | all affected feature specs plus `32`, `33`, `37`, `39`, `97`, `98`, `99`, `113`, `129`, `132` |
| Security or privacy control | affected feature/data specs plus `57`, `58`, `64`, `65`, `67`–`69`, `76`, `77`, `84`, `89`–`96`, `110`, `116`, `120`, `121` |
| Performance budget or supported scale | `23`, `43`–`45`, `49`, `53`, `55`, `59`, `70`–`75`, `86`, `90`–`92`, `100`, `105`, `116`, `118`, `119` |
| Release or deployment process | `74`–`76`, `78`, `82`, `86`, `89`–`96`, `100`, `105`–`107`, `112`–`114`, `116`, `130`, `131` |
| Pricing or monetization | `03`, `06`–`09`, `68`, `77`, `119`, `120`, `122`–`127`, `129`, `133` |

## 8. Dependency model

Product intent (`01`–`13`) constrains experience specifications (`14`–`42`). Experience and task-domain specifications jointly constrain architecture and data contracts (`43`–`69`). Those contracts constrain performance, reliability, testing, and operations (`70`–`100`). Engineering governance (`101`–`119`) controls how every layer is implemented and changed. Commercial and support documents (`120`–`133`) consume the accepted product truth and may propose, but not silently create, product commitments.

Dependencies are bidirectional during change review. For example, a schema change depends on product semantics, but discovering an unsafe or prohibitively expensive schema may trigger a product reconsideration through `115_DECISIONS.md`. The team must resolve that feedback explicitly rather than allowing implementation constraints to mutate behavior invisibly.

## 9. Ownership and approval rules

- **Product** approves user value, scope, priority, behavior, metrics, and launch commitments.
- **Design** approves information architecture, interaction, visual systems, responsive behavior, and content design.
- **Accessibility** may block a release that fails the accepted accessibility baseline.
- **Architecture/CTO** approves cross-cutting technical boundaries, reversibility, and system quality attributes.
- **Database** approves schema, migrations, indexing, backup compatibility, and data integrity.
- **Security and Privacy** may block any design that creates unacceptable access, data exposure, abuse, or regulatory risk.
- **QA** approves verification strategy and release evidence but does not redefine requirements.
- **DevOps/Operations** approves environment, deployment, recovery, monitoring, and operational readiness.
- **Marketing, Finance, Legal, and Support** own their specialist artifacts while remaining bound by accepted product behavior.

At least one representative from every materially affected ownership area must approve a normative change. The author cannot be the only approver. Emergency operational changes may precede documentation only to contain an incident; the incident owner must reconcile affected documents within two business days.

## 10. Review cadence and triggers

Scheduled review is a maximum interval, not a reason to delay updates. Immediate review is required when:

- a production incident reveals an incorrect assumption;
- a requirement, schema, RLS policy, API contract, or user-visible workflow changes;
- supported browsers, libraries, Supabase, or Cloudflare behavior materially changes;
- a legal, privacy, or security obligation changes;
- measured performance or cost crosses a documented threshold;
- an open question blocks implementation or release;
- implementation repeatedly diverges from the specification; or
- user research invalidates a persona, job, flow, or strategic assumption.

Reviewers must verify internal links, terminology, scope labels, acceptance criteria, decision references, and coupled documents. A review date without substantive verification is not a completed review.

## 11. Documentation quality gate

A document is ready for acceptance only when it:

- states purpose, scope, owner, status, and review cadence;
- distinguishes MVP, optional, rejected, and future behavior;
- explains material decisions, alternatives, tradeoffs, risks, and migration implications;
- defines edge cases and failure behavior where applicable;
- contains testable requirements or links to their canonical acceptance criteria;
- uses canonical terms from `132_GLOSSARY.md`;
- contains no empty placeholders or ambiguous “later” commitments;
- does not expose credentials, personal data, or sensitive operational detail;
- identifies affected documents and accepted decisions; and
- is understandable to a senior contributor without undocumented meeting context.

Examples are explanatory unless explicitly marked normative. Tables improve scanning but cannot replace the reasoning needed to interpret a requirement safely.

## 12. Current repository status

`00_DOCUMENTATION_INDEX.md` is the first accepted control document. Files `01` through `133` are planned in the order listed and remain unauthored until created and reviewed. Their entries in this index define intended purpose, classification, owner, and cadence; they do not imply that their requirements already exist or that any described feature is implemented.

Until the relevant normative documents are accepted, the fixed constraints in the project charter govern: TypeScript, React, Vite, TanStack Router, TanStack Query, Zustand for appropriate client-only state, React Hook Form, Zod, Tailwind CSS, Radix UI, Lucide, date-fns, i18next/react-i18next, Supabase PostgreSQL/Auth with mandatory RLS, Cloudflare Pages, pnpm, and the Korean-first/English-supported MVP scope. The frontend is always treated as untrusted, and no service-role credential may be exposed to it.

The next document in repository order is `01_PROJECT_OVERVIEW.md`; its creation requires a separate continuation request.
