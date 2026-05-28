---
title: "Learning Go Through Advent Of Code Puzzles"
date: 2026-04-15
thumbnail: advent-of-code
excerpt: "Reflecting on how hands-on, problem-oriented learning always beats passive reading when picking up a new programming language."
tags: ["golang", "programming-challenges", "advent-of-code"]
---

Passive learning rarely translates into coding proficiency. For me, reading programming textbooks or scanning documentation in isolation simply does not work. The most effective way to internalize a new language is to write code to solve immediate, concrete problems. Recently, I have been using **Advent of Code (AoC)** to learn **Go (Golang)** using this hands-on philosophy.

<app-image name="golang" alt="The Go programming language logo and a gopher"></app-image>

---

## Learning by Doing: A Task-Oriented Approach

When learning Go, I bypassed traditional study guides. Instead, I structured my learning around immediate objectives. The process looks like this:

1. **Identify the immediate need**: For example, "I need to parse the contents of a text file line-by-line."
2. **Consult targeted documentation**: Search for how Go's standard library handles file I/O (e.g., using `bufio.NewScanner`).
3. **Implement and iterate**: Build the specific block of code and verify its output.

By focusing on solving small, modular problems sequentially, language syntax and paradigms become natural parts of your toolkit rather than abstract concepts.

---

## Why Advent of Code Fits This Model

Advent of Code's puzzles align perfectly with this problem-driven style of learning. Rather than build large-scale applications right away, you are forced to solve discrete algorithmic challenges. Implementing array manipulations, grid traversals, and string formatting in Go helps build immediate familiarity with the compiler's strict type checking and pointers.

---

## Going AI-Free: Slowing Down to Learn

In my daily development workflows, I frequently use artificial intelligence to speed up coding, generate boilerplates, and automate tedious tasks. However, when it comes to learning a new language like Go, I make a deliberate choice to use no AI at all. 

Bypassing the AI copilot has allowed me to slow down and learn at my own pace, writing every line of code myself without external pressure. Finding solutions through trial, reading compilation errors, and browsing the official documentation has made the process incredibly satisfying and fun.

---

## Learning the "Go Way": Picking Up Idiomatic Patterns

Go is famously opinionated, emphasizing simple, explicit, and "idiomatic" patterns. Unlike other languages that encourage complex class hierarchies or deep object-oriented designs, Go favors flat structures, explicit error handling, and small interfaces. 

By writing AoC solutions without AI assistance, I was forced to search for how native Go developers write code. Rather than letting a Copilot copy-paste patterns from other languages, I browsed the official Go documentation, explored community codebases, and searched through the O'Reilly book *Learning Go: An Idiomatic Approach to Real-World Go Programming*. This combination helped me pick up on truly idiomatic Go patterns: handling errors immediately with `if err != nil`, preferring composition over inheritance, and utilizing Go's explicit type systems naturally.

---


## Designing Unified, Two-Part Solutions

Every puzzle in Advent of Code is split into two halves, with the second half modifying or expanding the initial prompt's constraints. This layout serves as a test of your architectural choices:

*   **Part 1**: Solving the baseline problem.
*   **Part 2**: Adapting to a scale change or new rule logic.

Rather than focusing on writing highly decoupled, reusable helper functions, I treat these exercises like a programming competition. I keep most of the logic directly inside the `main` function. The goal is readability and speed: keeping the entire execution path visible in a single, top-to-bottom flow. However, I still enjoy configuring the solution so that both parts can be executed in a single run, switching inline parameters or flags inside `main` to transition from Part 1 to Part 2 without duplicating the entire script.

---

## Summary

Picking up a language is best achieved when driven by practical utility. Bypassing theoretical readings in favor of task-oriented challenges like Advent of Code makes learning Go highly engaging. If you want to master a new language, find a concrete problem, break it into specific tasks, and start coding.

You can view my complete set of solutions in my [Advent of Code GitHub repository](https://github.com/ArneVcrs/AdventOfCode).
