---
title: "Hack the Future 2025: Deep Dive into Linux Waters"
date: 2025-11-12
thumbnail: htf-thumb
excerpt: A technical deep-dive into our experience at Hack The Future 2025, where we tackled rootless container namespaces, automated deployment with Ansible, and learned to adapt under time constraints.
tags: [hackathon, linux, podman, ansible, nginx]
---

On November 12, 2025, I participated in the Hack The Future hackathon in Antwerp together with [Lauren Cattoor](https://lauren-cattoor.netlify.app/). We enrolled in "Challenge 112: Deep Dive into Linux Waters", a technical scenario organized by [Piros](https://piros.io/) that focused on advanced Linux system administration, networking, and infrastructure automation.

<app-image name="htf-main" alt="Hack The Future 2025" caption="The briefing of the challenge."></app-image>

---

## Defining the Scope: A Simple Frontend

The assignment gave us the freedom to choose what application architecture we wanted to deploy. Because the underlying technologies (Ansible, Podman, and RHEL-specific configurations) were entirely new to us, we made a deliberate decision to limit the application scope. 

First we decided upon deploying a microservice-based application with multiple containers. We quickly scratched that idea though, and chose to deploy only a static frontend. This allowed us to focus our limited time and mental bandwidth on the infrastructure, the deployment pipeline, and the configuration management, rather than debugging application code or database connections.

---

## Network Topology: Bastion Hosts and SSH Agents

Before we could configure the target web server, we had to establish a secure connection. The network topology for the challenge isolated the web server inside a private subnet, meaning it was only accessible via a bastion host (jump host).

This setup forced us to learn how to configure SSH agents and utilize agent forwarding. Rather than copying our private keys to the intermediate bastion host, we used SSH agent forwarding to pass our credentials securely from our local machine through the jump host.

---

## Infrastructure as Code with Ansible

Our primary goal was to automate the deployment process as much as possible. Instead of manually configuring RHEL via SSH, we wanted our entire setup to be defined declaratively using Ansible.

This meant writing playbooks to handle:
- Server provisioning and software package installation.
- Managing user accounts and permissions.
- Setting up the Nginx reverse proxy configuration.
- Generating systemd service files to manage container lifecycles.

We quickly realized that Ansible requires strict discipline. Writing playbooks that are idempotent (meaning they can run repeatedly without altering the system state or generating errors) requires careful design.

---

## Rootless Podman VS Docker

A technical challenge we faced was wrapping our heads around how Podman handles rootless containers. Coming from a background where we had only worked with Docker for containerization, we expected a centralized daemon running with root privileges. Podman's rootless model works entirely differently: containers run inside user namespaces without a daemon.

This model led to a confusing troubleshooting session. After triggering a container deployment, we logged into the server as one user to verify the state. Running `podman ps` returned an empty list. 

After digging into the documentation, we discovered the issue: rootless Podman containers are isolated within the namespace of the specific system user that spawned them. Because the deployment was running under a different user account, the containers were completely invisible to our current session. To interact with them, we had to switch to the correct user context and use user-scoped systemd commands (`systemctl --user`). This namespace separation was a valuable lesson in how modern Linux security models isolate processes.

Beyond namespaces, SELinux policies on RHEL introduced another layer of permissions troubleshooting. When we moved files (like configuration files or static HTML assets) across different directories on the server to set up container volumes, the containers failed to read them. We learned that moving files in Linux often preserves their original SELinux security context rather than inheriting the context of the destination directory. This mismatch blocked Podman from accessing the assets, requiring us to explicitly reload and restore the SELinux labels using `restorecon` before the containers could access the mounted files.

---

## Reverse Proxies and Security: Nginx & Certbot

Prior to this hackathon, the concept of a reverse proxy was highly abstract to me; I did not fully grasp its purpose or mechanics until I had to set one up myself.

Configuring Nginx required us to define block rules that listen on port 80 and forward requests to the correct internal container port. Additionally, we had to secure the connection by setting up TLS using Certbot to fetch and install Let's Encrypt certificates.

During the final pitches, it was interesting to see how other teams designed their architectures. While we opted for a traditional Nginx configuration, several teams utilized Traefik, a modern, Go-based reverse proxy that automatically discovers container configurations and handles TLS certificates dynamically.

---

## Learning on the Fly

Faced with a short timespan to learn these technologies, we relied on associative learning. Rather than reading documentation from the ground up, we constantly compared new concepts to tools we already knew and looked for equivalents:

- We mapped Ansible tasks and plays to manual shell scripts and execution flows we were familiar with.
- We translated Docker CLI commands and configurations into Podman's daemonless syntax, isolating where they behaved identically and where the rootless permissions diverged.

By bridging the gap between our existing knowledge and the new stack, we were able to quickly grasp the core concepts needed to construct a functional deployment plan.

---

## Pitch and Results

By the time the final deadline arrived, our automated deployment pipeline was not fully complete. Rather than trying to patch together a flawed live demo, we focused our final presentation on our architectural decisions, our troubleshooting methodology, and most importantly the lessons we learned.

This analytical and transparent approach stood out. Out of 20 competing teams, we placed 6th. It showed us that being able to diagnose failures, map out technical systems, and communicate engineering trade-offs is just as critical as writing code.

---

## Key Takeaways

Our first hackathon provided several key insights:

- **Rootless containerization changes management**: Podman's daemonless, user-scoped architecture increases security but requires a solid understanding of Linux namespaces and user sessions.
- **Idempotency is key in automation**: Designing Ansible playbooks to run cleanly at any point requires robust state checks rather than simple command execution.
- **Map new tech to known patterns**: Learning under time pressure is most effective when you actively search for equivalents in your existing knowledge base.
- **Secure access requires proper tooling**: Navigating a jump host configuration demonstrated the importance of SSH agent forwarding to maintain credential security across intermediate servers.
- **Inspiration for future projects**: This is perhapst the most important takeaway. The exposure to Podman, Ansible and Red Hat Enterprise Linux during this challenge planted the seeds for my subsequent software engineering project, where I integrated these technologies into a fully automated deployment pipeline. You can read more about that in [my software engineering project post](/blog/2026/01/cogtraining3-project).
