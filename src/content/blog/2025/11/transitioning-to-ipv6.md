---
title: "Tech&Meet: Transitioning to IPv6"
date: 2025-11-25
thumbnail: transitioning-to-ipv6
excerpt: "My takeaways from Nico Declerck's Tech&Meet session on the transition to IPv6: moving past the NAT crutch, addressing unfamiliarity, and preparing for an IPv6-only future."
tags: ["tech&meet", "networking", "ipv6", "dns"]
---

Howest recently hosted a Tech&Meet session where Nico Declerck discussed a critical but often avoided topic: the transition of our networks to IPv6. Nico paired deep infrastructure concepts with lighthearted anecdotes about historic breweries in Bruges, turning a dense networking topic into an engaging and memorable session.

Instead of focusing on low-level binary calculations, the presentation highlighted the strategic business and operational reasons to phase out IPv4. Here are the core insights from the session.

---

## 1. IPv6 is Not a New Standard
The most common excuse for delaying migration is the belief that IPv6 is still experimental. However, the standard was actually finalized back in 1995.

This means we have three decades of battle-tested documentation, mature routing hardware, and robust operating system support. The primary blocker is not technology or tooling; it is the industry's reluctance to step outside the comfort zone of legacy systems.

---

## 2. The Fallacy of NAT as a Security Solution
Network Address Translation (NAT) was originally created as a temporary fix to delay IPv4 address exhaustion. Unfortunately, it has become a permanent fixture in modern network design. Many administrators mistake it for a security feature, but in reality, NAT simply adds routing overhead, makes troubleshooting harder, and introduces latency.

IPv6 restores direct end-to-end communication across the internet. With 340 undecillion addresses available, scarcity is no longer a factor.

This massive scale simplifies scenarios like corporate mergers. When two companies using the same private IPv4 space merge, they face complex double-NAT setups or extensive IP renumbering projects. In contrast, IPv6 allows each organization to use unique global prefixes, making infrastructure integration seamless and conflict-free.

---

## 3. The Dual-Stack Trap
Most migration plans rely on running a Dual-Stack configuration, where IPv4 and IPv6 operate simultaneously.

While Dual-Stack serves as a helpful transition phase, it should not be the permanent end state. Running both protocols doubles your administrative burden, requiring duplicate firewall rules, separate routing tables, and double the security monitoring. Moving to a pure IPv6-only network simplifies your architecture and reduces the overall attack surface.

<app-image name="transitioning-to-ipv6" alt="A picture from Nico Declerck's Tech&Meet session about transitioning to IPv6"></app-image>

---

## Conclusion
The key takeaway is that IPv6 is already the standard powering mobile carriers, cloud environments, and modern internet service providers. Testing local subnets and preparing for an IPv6-only architecture is a necessity today, not a task to postpone for the future.
