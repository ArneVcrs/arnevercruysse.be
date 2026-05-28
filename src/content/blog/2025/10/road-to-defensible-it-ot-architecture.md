---
title: "Tech&Meet: The Road to Defensible IT/OT Architecture"
date: 2025-10-01
thumbnail: defensible-it-ot
excerpt: "Reflecting on Howest's first Tech&Meet of the year: how to structure defensible industrial architectures, bridge security with operations, and align standards like IEC 62443."
tags: ["tech&meet", "security", "ot", "nis2", "iec-62443"]
---

Howest kicked off the academic year Tech&Meet with a Tech&Meet session led by industrial security consultant **Dieter Sarrazyn** from Secudea. The presentation explored the design principles behind securing Operational Technology (OT) and Information Technology (IT) networks. 

Below is my summary of the core strategies and governance methodologies discussed during the event.

<app-image name="defensible-it-ot" alt="A picture from Dieter Sarrazyn's Tech&Meet session about defensible IT/OT infrastructure"></app-image>

---

## Moving Beyond Reactive Security
A central question raised during the talk was the fundamental purpose of system architecture. In industrial control settings, structural planning prevents the need for costly retrofits following a cyber incident. 

Rather than serving as a static topology map, a robust architecture acts as a blueprint to resolve recurring threat vectors while supporting normal business functions.

A complete security posture must address:
* **Connectivity Nodes**: Including cloud resources, external supplier interfaces, and remote engineering connections.
* **Asset Integrity**: Protecting controllers, device configurations, and logging tools.
* **Interdependence**: Managing how data flows across different trust levels.

---

## Aligning Security with Operations
One of the most practical insights shared was that technical controls fail if they ignore human workflows. When security guidelines create friction on the plant floor, technicians and engineers will bypass those controls to keep production running. 

A viable architecture must align its protection mechanisms with operational realities. This requires a governance model where compliance requirements support physical safety and uptime rather than disrupting them.

Additionally, physical access security remains a critical, yet frequently neglected, component. Because anyone with physical access to a controller or switch can override software controls, secure physical perimeters are essential.

---

## Building a Defensible Posture
A defensible network assumes that a perimeter breach will eventually occur. Instead of relying solely on firewalls, the network must limit lateral movement and contain threats locally.

By leveraging frameworks like **IEC 62443** and the **NIS2 Directive**, organizations can implement:
* **Logical Segmentation**: Separating systems into risk-based zones and restricting cross-zone traffic to monitored communication conduits.
* **Remote Access Management**: Implementing strict controls, multi-factor authentication, and active monitoring for external integrators.
* **Deep Visibility**: Collecting traffic data across internal segments to identify anomalies before physical processes are disrupted.

---

## Enterprise Governance
Maintaining security across a large organization requires connecting corporate standards with operational realities. By aligning high-level information security frameworks (like **ISO/IEC 27001**) with industrial control safety standards (like **IEC 62443**), companies can maintain consistent risk management policies throughout the entire enterprise supply chain.

---

## The Architecture Lifecycle
Securing industrial infrastructure is a continuous, phased process:

1. **Asset Mapping**: Constructing an exhaustive inventory of all connected network nodes and software components.
2. **Zoning**: Partitioning the infrastructure into logical zones based on risk levels.
3. **Access Enforcement**: Designing secure entry points and authentication gateways for remote maintenance.
4. **Active Defense**: Deploying network monitoring and industrial firewalls.
5. **Continuous Assessment**: Evaluating the environment regularly against new attack methodologies and operational shifts.

---

## Conclusion
Defending modern industrial environments is not about establishing an impenetrable barrier. The focus must be on building resilience, maintaining visibility, and managing risk within complex operational settings.
