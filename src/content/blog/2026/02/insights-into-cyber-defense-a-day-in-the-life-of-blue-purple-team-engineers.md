---
title: "Tech&Meet: Insights Into Cyber Defense: A Day in the Life of Blue and Purple Team Engineers"
date: 2026-02-17
thumbnail: blue-and-purple-team-engineers
excerpt: "Key insights from Easi's Tech&Meet session: comparing defensive roles, incident analysis walkthroughs, and hardware configurations in network protection."
tags: ["tech&meet", "security", "blue-team", "purple-team", "soc"]
---

While offensive security often attracts attention, defensive engineering is the foundation of organizational stability. A recent Howest Tech&Meet guest lecture featured Raf and Pieter from Easi, who detailed their day-to-day work in defensive cybersecurity operations. The presentation contrasted real-time incident monitoring with long-term infrastructure security.

<app-image name="blue-and-purple-team-engineers" alt="A picture from the Tech&Meet session about blue and purple teaming"></app-image>

---

## Defensive Disciplines (Blue vs. Purple)

The session highlighted two main areas of defensive security operations:

- **Active Incident Response (Purple Team)**: Focused on active alert analysis and threat triage. Raf described the process of tracking security events via SIEM logs, identifying malicious traffic patterns, and coordinating incident containment.
- **Infrastructure and System Configuration (Blue Team)**: Pieter discussed this architectural role, which focuses on managing security policies, configuring networking equipment, and deploying defensive hardware controls across the organization.

---

## Practical Demonstrations

The presenters shared concrete examples of their daily tools:

### Investigating Alerts (Raf)
Raf demonstrated a simulated incident response. When an endpoint agent flagged a suspicious script running on a host, we saw how the security analyst pivots to SIEM dashboards to isolate the computer and block control servers.

### Infrastructure Implementation (Pieter)
Pieter explained the hardware side of security operations. This includes configuring next-generation firewalls for deep packet filtering, deploying Network Access Control (NAC) devices to verify physical connections, and managing secure VPN gateways.

---

## Insights for Developers

For software engineers, understanding defensive workflows is highly beneficial. Designing secure code requires a basic knowledge of how security teams monitor logs, check network traffic, and handle endpoint alerts. Building applications with these defensive systems in mind reduces vulnerability and simplifies auditing.

---

## Conclusion

Defensive security requires continuous monitoring, collaboration, and robust infrastructure. Understanding the workflows of analysts and engineers provides valuable context for building and maintaining secure software networks. Many thanks to Raf, Pieter, and Howest for this interesting session.
