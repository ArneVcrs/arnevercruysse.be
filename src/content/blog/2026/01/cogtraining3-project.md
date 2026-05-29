---
title: "Software Engineering Project: CogTraining3"
date: 2026-01-20
thumbnail: cogtraining3-presentation
excerpt: A technical post-mortem of rebuilding a legacy Cognitive Control Training (CCT) platform for UGent, focusing on Domain-Driven Design, Hexagonal Architecture, and secure automated deployments with rootless Podman.
tags: [DDD, ports-and-adapters, .NET, vue, devops]
---

In this post, I will provide an in-depth, technical walkthrough of **CogTraining3**, a modern rebuild of a legacy Cognitive Control Training (CCT) platform. 

This project was developed as our bachelor's thesis for **Howest University of Applied Sciences**, in collaboration with **Ghent University (UGent)** as the primary stakeholder and infrastructure partner. I developed this platform together with my fellow students [Lauren Cattoor](https://lauren-cattoor.netlify.app/) and [Jeremy Gliksman](https://jeremygliksman.be). Our goal was to design, implement, and deploy a secure system running clinical training protocols aimed at preventing relapse in patients recovering from conditions like depression.

Rebuilding this system was not just about migrating to newer programming languages. It required a complete overhaul of the domain model, software architecture, and deployment pipeline to meet clinical standards of data integrity, auditability, and security.

---

## The Legacy Problem: Codebase Drift and Brittle Flows

The previous system, **CogTraining2**, suffered from severe architectural drift. Over its years of use, new features had been repeatedly "duct-taped" onto a non-modular codebase without maintaining strict system boundaries. 

This ad-hoc expansion resulted in:
- **Illogical patient flows**: Users could bypass required onboarding steps or repeat completed trials.
- **Data inconsistency**: Interrupted training sessions often wrote partial, corrupt metrics to the database, compromising the clinical validity of the research data.
- **High maintenance overhead**: Systeembeheerders and developers struggled to patch bugs without introducing regressions in unrelated features.

To build a reliable platform, we turned to Domain-Driven Design (DDD) to align the codebase directly with the underlying clinical protocols.

---

## Domain-Driven Design and Hexagonal Architecture

Clinical research requires absolute traceability and validity of data. Under the guidance of our Howest lecturers **Dimitri Casier** and **Matthias Blomme**, who taught us the principles of Domain-Driven Design and Hexagonal Architecture, we adopted **Domain-Driven Design (DDD)** to build a software model that shares a common, unambiguous vocabulary with the clinical researchers at UGent.

### Ubiquitous Language
We established a strict Ubiquitous Language used consistently across our meetings, thesis documentation, and source code:
- **Experiment**: An immutable research framework with fixed parameters, task sequences, and configurations.
- **Session**: A bounded execution time during which a participant completes a specific task or series of tasks.
- **Trial**: The smallest measurement unit in a task, consisting of a single stimulus and the user's corresponding response.

### Collaborative Event Storming with Post-it Notes

To bridge the gap between technical design and the complex requirements of psychiatric research, we initiated our modeling process with an Event Storming workshop. Rather than working in isolation, we ran this collaborative session directly with our primary stakeholder, Dr. Yannick Vander Zwalmen. 

We used a physical modeling space covered in color-coded post-it notes to map out the entire domain flow from left to right in chronological order:
- **Orange Post-its (Domain Events)**: Represented significant business occurrences that happened in the past (such as `InformedConsentSigned`, `SessionCompleted`, or `ExperimentConcluded`).
- **Blue Post-its (Commands)**: Represented user intentions and actions triggering those events (such as `SignInformedConsent` or `SubmitTrialResponse`).
- **Yellow Post-its (Aggregates)**: Highlighted business entities acting as consistency boundaries to guard state transitions.
- **Pink Post-its (Policies/Process Rules)**: Defined automated reactive rules (such as "when a session is completed, schedule a reminder notification").

By placing and reorganizing these post-it notes alongside the stakeholder, we uncovered implicit rules and resolved conflicting flows in the legacy application. This exercise was essential for defining our Ubiquitous Language, discovering the bounded contexts of our architecture (such as separating the researcher backoffice from the patient training runner), and identifying the correct boundary aggregates needed to guarantee transactional consistency.

<app-image name="cogtraining3-event-storming" alt="CogTraining3 Event Storming Session" caption="Mapping out the domain events and aggregates during the Event Storming sessions."></app-image>

### Tactical Modeling: Aggregates and Domain Events

To enforce database integrity, we modeled the clinical structures as **Aggregates**. For example, the `Participant` aggregate controls all session-related changes. 

To prevent partial or corrupted session metrics from being persisted, the aggregate enforces a strict invariant: the state `isCompleted` is only assigned to a session when *all* trials within that session are fully and atomically completed. Direct access to sessions or trials for manipulation is blocked; all edits must route through the parent `Participant` aggregate via explicit **Commands** (such as `SubmitSessionResults`). A successful command publishes **Domain Events** (like `SessionResultsSubmitted`), which trigger further commands in the system through policies.

### Domain Validation via Value Objects

To enforce strict correctness and type safety across our domain, we relied heavily on **Value Objects**. In Domain-Driven Design, a value object is an immutable record defined solely by its attributes rather than a persistent database identity. 

In clinical research, using primitive types (such as strings or integers) to represent domain concepts (an anti-pattern known as "primitive obsession") introduces logic risks. For instance, representing an email address or a specific test score as a simple string or integer allows invalid states to propagate through the application. We replaced these primitives with custom Value Objects (such as `EmailAddress`, `HashedPassword`, or `ReactionTime`) that enforce:
- **Self-Validation**: A Value Object cannot be created in an invalid state. Its constructor validates its arguments immediately upon creation (for instance, verifying email patterns or ensuring a reaction time is non-negative). If validation fails, it throws a domain exception, preventing invalid data from ever reaching our aggregates.
- **Type Safety and Explicitness**: Value Objects make our domain types explicit. By using `EmailAddress` instead of `string` as a method argument, the compiler guarantees that we cannot accidentally pass a password string where an email is expected, eliminating entire classes of logic errors at build time.
- **Immutability**: Once created, Value Objects cannot be altered. To change a value, a new instance must be instantiated, preventing side effects and sharing of mutable state.

### Process Orchestration via Sagas
Managing the sequential progression of an experiment across different aggregates required a decoupled process coordinator. We implemented the **Saga pattern** alongside an in-memory event bus. 

For instance, our **Create Next Session Saga** functions as follows:
1. It listens for the `SessionCompleted` event dispatched by the in-memory event bus.
2. It queries the `Experiment` aggregate to determine the next task in the sequence.
3. It calculates the starting Inter-Stimulus Interval (ISI) for the next session based on the median ISI of the completed session.
4. It creates the next session and schedules a reminder notification.

### Hexagonal Architecture (Ports and Adapters)
To ensure that changes in external infrastructure (such as swapping a database or updating the UI framework) do not impact the core clinical rules, we isolated the system using **Hexagonal Architecture (Ports and Adapters)**:
- **The Core**: Contains the pure business logic, including the Adaptive ISI algorithms and session completion rules. The Core has no dependencies on databases or UI frameworks.
- **Ports**: Interfaces defining the contracts the core expects from the outside world (such as `IParticipantRepository` or `IPasswordHasher`).
- **Adapters**: Concrete technical implementations of the ports, such as an Entity Framework Core adapter mapping to PostgreSQL or an SMTP adapter for email notifications.

---

## Modernizing UI/UX: Calm Design and Accessibility

In psychiatric and clinical settings, preventing user overstimulation is a direct prerequisite for therapeutic success. The legacy system utilized a sterile, clinical style with sharp angles and high-contrast whites that contributed to visual fatigue. For CogTraining3, we implemented **Calm Design** principles and aligned with WCAG AA accessibility minimums.

### Core Design Principles for Cognitive Training
- **Whitespace Allocation**: Deliberate use of padding and whitespace creates visual breathing room, reducing cognitive load and preventing overstimulation.
- **Single-Purpose Screens**: Every step in the training workflow has exactly one clear action to eliminate user hesitation.
- **Onboarding Steppers**: We integrated interactive stepper components into tutorials to minimize page reloads and maintain user context.

### The Calm Color Palette
We formulated a specific color system based on environmental psychology research, aiming to promote physiological sedation and focus:

- **Nautical Blue (Primary - #536397)**: Used for core interactive elements. Studies indicate that shorter-wavelength warm blues lower heart rate and reduce stress. We selected a warm undertone to avoid triggering feelings of isolation or coldness in patients experiencing depressive phases.
- **Soft Light Blue (Background - #F9FAFB)**: Designed to eliminate screen glare and reduce ocular strain over long training runs. We layered white container cards on top of this background to visually frame the workspace.
- **Muted Gold/Ochre (Accent - #D9BB2B)**: Used to highlight achievements or active selections. Gold tones stimulate activity in lethargic users without inducing the anxiety associated with clinical reds or oranges.
- **Pastel Green (Functional - #A1E5AE)**: Associated with nature and recovery, used to convey success states and encourage progress.

---

## The Clinical Tasks: Precision in Vue.js

The user client supports three cognitive tasks designed to measure and train cognitive control. While the visual interface remains identical to avoid confusing patients, the underlying algorithms differ fundamentally:

1. **PASAT (Paced Auditory Serial Addition Test)**: A task with a fixed structure of 181 trials divided over three blocks. The inter-stimulus intervals decrease progressively (3000ms, 2000ms, and 1500ms) without providing performance feedback to the participant.
2. **APASAT (Adaptive PASAT)**: A variant using an adaptive ISI algorithm. If the user inputs four consecutive correct answers, the interval speeds up by 100ms; if they commit four consecutive errors, it slows down by 100ms.
3. **Speed of Response (Control Task)**: A baseline task where the participant only clicks the last heard digit. It also utilizes an adaptive algorithm to measure absolute reaction speed.

We implemented the frontend using **Vue.js** to build an empathetic, distraction-free patient interface and a clean backoffice for researchers. Vue's component model allowed us to handle the strict timing constraints required for stimuli presentation and reaction time logging.

---

## Choosing the Software Stack

Our software stack was selected based on strict requirements for performance, static type checking, and modular design.

### Backend: .NET 10
We chose **.NET 10 (C#)** for our backend Web API. C#'s strong static typing and runtime type safety were essential to model our DDD aggregates and ensure invariants are validated reliably. Furthermore, **Entity Framework Core** acted as our Object-Relational Mapper (ORM), providing mature database mapping patterns that translated our aggregate structures cleanly to the database. Compiled with JIT and AOT optimizations, .NET 10 offered the necessary execution speed and stability required for clinical trials.

### Database: PostgreSQL
For data persistence, we selected **PostgreSQL** running inside an isolated Podman container. PostgreSQL is known for its strict compliance with ACID (Atomicity, Consistency, Isolation, Durability) transactions. This compliance was critical for CCT research to guarantee that trial records are written sequentially and without corruption. Additionally, its cost-free open-source license aligned with our project constraints.

### Frontend: Vue.js
We implemented the patient and researcher clients using **Vue.js**. Vue's Single File Component (SFC) format and progressive reactivity model allowed us to build lightweight, performant modules. This was particularly important for the patient training interface, where we needed to handle precise timing loops and animations for presenting auditory stimuli and capturing milliseconds-accurate reaction times.

---

## Security and Authentication: A Critical Reflection on JWT

To secure patient records, we implemented claims-based authorization using JSON Web Tokens (JWT). The stateless design of JWTs is a natural fit for containerized applications, as it allows server instances to validate incoming requests using cryptographic signature checks without querying a central session storage.

### Security Implementation and Middleware
The backend validates roles (Administrator, Head Researcher, Researcher, Participant) on every incoming request before serving resources. 

However, in hindsight, our authentication architecture has a clear area for improvement. At the time of development, we were not aware of dedicated identity management platforms like **Keycloak**. In production enterprise systems, manually writing token-issuing, signing, and user-store management logic is generally not recommended due to security risks. A platform like Keycloak would have provided features like Single Sign-On (SSO), user federation, and standardized token management out of the box. 

Consequently, we mitigated this risk by avoiding writing custom cryptographic validation or token handling logic from scratch. Instead, we relied entirely on the built-in authentication middleware and official security libraries of .NET to manage token validation and signature verification.

---

## Systeemarchitectuur: Secure CentOS Hosting at UGent

The CentOS VPS provided by UGent introduced strict enterprise constraints:
- **No external SSH access**: Port 22 was globally blocked on the network.
- **No system accounts**: We could not get individual UGent system credentials.

To enable automated deployments without manual VPN intervention, we requested a custom open TCP port for manual configurations, and designed a secure pull-based CI/CD pipeline using a self-hosted runner.

### Operating System: CentOS
We selected **CentOS** (Red Hat family) for our operating system due to its native **SELinux** (Security-Enhanced Linux) integration. SELinux enforces Mandatory Access Control (MAC), adding a critical layer of security that protects sensitive patient data if a containerized service is compromised. Additionally, CentOS provides Enterprise-grade kernel stability and long-term support cycles, which are essential for clinical hosting environments.

### Containerization: Rootless Podman
To isolate services, we deployed them inside containers. However, rather than Docker, we opted for **Podman** because of its native support for **rootless containers** and its **daemonless architecture**. 

Unlike Docker, which runs as a root-privileged background daemon (`dockerd`), Podman runs containers directly under non-privileged system users. If an attacker compromises the containerized web API, they gain no root access to the host CentOS server.

#### SELinux Contexts and Volume Persistence
Reusing the container security patterns we first encountered at the [Hack The Future hackathon](/blog/2025/11/hack-the-future-2025), we mapped the PostgreSQL data directory to host volumes for persistence. A key issue we solved was SELinux blocking Podman from accessing these directories. When moving configuration files or directory structures on RHEL, they retain their original security context rather than inheriting the parent directory's context. We had to use `restorecon` to reload the SELinux labels, granting the rootless Podman processes the necessary permissions to read the mounted files.

### Reverse Proxy: Manual Nginx with HARICA Certificates
Nginx acts as the reverse proxy, routing incoming traffic to the appropriate rootless containers on the internal Podman network. UGent works with **HARICA** as the Certificate Authority (CA) to provide SSL/TLS certificates. 

Unlike the rest of the containerized stack, we chose to configure Nginx **manually** on the host VPS. This design decision ensures that our automated CI/CD pipeline does not require administrator (root) privileges on the webserver configuration, keeping the host's attack surface as small as possible.

---

## The Automated Deployment Flow

Our pipeline eliminates manual steps, running from code push to container restart:

<app-image name="cogtraining3-deployment" alt="CogTraining3 Deployment Architecture" caption="Deployment workflow from GitHub Actions to the UGent CentOS production VPS using rootless Podman and Ansible."></app-image>

Our deployment pipeline is structured into six distinct, automated steps that transition the application from a developer push to production:

1. **Trigger (GitHub Actions)**: When code is pushed to the master branch of our backend, user client, or backoffice repositories, independent GitHub Actions pipelines are triggered.
2. **Compilation and Containerization**: The workflow compiles the .NET 10 backend (`dotnet publish`), builds Vue.js images using local Containerfiles, and pushes these finalized images to the GitHub Container Registry (GHCR) as secure, versioned artifacts.
3. **Execution Request**: The deployment is triggered manually on GitHub. Because of UGent's inbound network constraints, the deployment does not push commands to the server. Instead, a self-hosted runner running locally on the UGent CentOS host VPS pulls the execution request over an outbound HTTPS connection.
4. **Ansible Playbook Invocation**: The self-hosted runner executes the Ansible playbooks locally. Ansible accesses the local environment to authenticate and pull the latest images down from GHCR.
5. **Container Lifecycle Management**: Ansible stops the existing container processes and restarts the new rootless Podman containers in isolated namespaces, maintaining the host volume mappings for database persistence.
6. **Traffic Routing**: The manually configured Nginx reverse proxy on the host VPS receives external HTTPS traffic, terminates TLS using the HARICA certificates, and routes HTTP requests into the containerized user applications.

By combining a pull-based self-hosted runner with local Ansible orchestration, we complied with UGent's strict networking policies without sacrificing automation.

---

## Academic Presentation and Defense

Upon completing the development and deployment, we presented CogTraining3 to our promoters, professors, clinical researchers, and technical stakeholders.

This presentation allowed us to demonstrate how modern software engineering methodologies and DevOps automation can directly support clinical research, offering both security compliance and architectural reliability.

<app-image name="cogtraining3-presentation" alt="CogTraining3 Thesis Presentation" caption="Presenting CogTraining3 at Ghent University."></app-image>

---

## Conclusion: Bridging Theory and Practice

Rebuilding CogTraining3 highlighted the value of clear architectural boundaries. Domain-Driven Design and Hexagonal Architecture kept the software maintainable and logically sound, preventing the "duct-taping" issues of the past. On the infrastructure side, the automated containerization, rootless configuration, and secure network traversal concepts we first learned at the [Hack The Future hackathon](/blog/2025/11/hack-the-future-2025) provided the exact technical foundation we needed to navigate UGent's CentOS environment.

Furthermore, this thesis demonstrated the immense value of multidisciplinary projects. Bringing software engineering practices (such as Event Storming and DDD) together with clinical psychology research allowed us to build a tool that is both technically robust and scientifically valid. 

Sadly, because the platform processes sensitive patient records and functions as an active research asset for Ghent University, the codebase is closed source for the moment. Nonetheless, the architectural patterns and deployment strategies we used serve as a strong case study for securing and automating medical research deployments under tight network constraints.

---

Interested in reading the full academic paper? You can <a href="https://arnevercruysse.ams3.cdn.digitaloceanspaces.com/files/Bachelorproef-CogTraining3.pdf" download target="_blank" rel="noopener noreferrer">download our bachelor's thesis (PDF, written in Dutch)</a> for a deeper look into this project.
