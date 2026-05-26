---
title: How I Built This Website
date: 2026-05-26
thumbnail: angular
excerpt: A look behind the scenes at the tech stack, architecture, and some fun implementation details of arnevercruysse.be.
tags: [angular, web-development, typescript]
---

In this post I'll walk through how I built this website, from the tech stack down to the deployment. The full source code is available on [GitHub](https://github.com/ArneVcrs/arnevercruysse.be).

> Note that this is the state of the website in May of 2026, implementation details are prone to change in the future, but the overall structure should remain consistent.

---

## Tech Stack

The site is a **static Angular 21 application**. Here are the packages that power it:

- **Angular 21** with standalone components, signals, and the latest control flow syntax
- **Content Collections** for transforming markdown blog posts into type-safe TypeScript data at build time
- **Marked** for markdown-to-HTML parsing
- **Zod** for schema validation on blog post frontmatter
- **SCSS** for styling
- **DigitalOcean Spaces** as a CDN for images

Currently this site is being hosted on [Combell](https://www.combell.com/en/).

---

## Project Architecture

The project follows a clean separation of concerns:

```
src/
├── app/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route-level page components
│   │   ├── home/
│   │   ├── about/
│   │   └── blog/
│   │       ├── post-list/
│   │       └── post-detail/
│   └── services/
│       └── blog.service.ts
├── content/
│   └── blog/               # Markdown blog posts
└── styles.scss             # Global design tokens
```

All routes are lazy-loaded using dynamic imports, so the browser only downloads the code for a page when you actually navigate to it.

---

## The Blog System

Blog posts live as markdown files in `src/content/blog`, organized by date. Each file has a YAML frontmatter block with metadata like title, date, tags, and an excerpt. At build time, [content-collections](https://www.content-collections.dev/) picks them up, validates frontmatter with Zod, parses the markdown body with `marked`, and calculates a reading time. The result is exported as fully typed TypeScript that the Angular app can import directly, no API calls needed:

```typescript
import { allBlogPosts, type BlogPost } from 'content-collections';
```

During development, `content-collections watch` runs alongside `ng serve` so that any changes to markdown files are picked up instantly.

---

## CDN-Backed Image Components

A nice overengineered detail of this project are the custom `<app-image>` and `<app-thumbnail>` components. Instead of bundling images in the repo, all images are hosted on a **DigitalOcean Spaces CDN**. The components take a simple `name` input and automatically construct responsive `srcset` attributes, serving both a 1280px and a 2880px WebP variant with a JPG fallback:

```typescript
public srcSet = computed(() =>
  `${this.base()}/${this.name()}_1280.webp 1280w,
   ${this.base()}/${this.name()}_2880.webp 2880w`
);
public src = computed(() => `${this.base()}/${this.name()}_1280.jpg`);
```

The base URL comes from a simple `config.json`, keeping the CDN origin configurable without touching component code. This means images stay out of the git history, get served from edge locations close to the visitor, and the browser picks the right resolution automatically.

These components are also registered as **Angular custom elements**, which means they can be used directly inside the rendered HTML of markdown blog posts, like `<app-image name="main-pfp" alt="...">`. No special markdown plugins required.

---

## Deployment

Deployment is deliberately low-tech: a single bash script. It reads connection details from a `.env` file, runs the production build, and uses `rsync` over SSH to sync the output to the server:

```bash
npm run build
rsync -avz --delete \
  -e "ssh -p $SERVER_PORT -i $SSH_IDENTITY" \
  "$LOCAL_BUILD_DIR" \
  "$SERVER_USER@$SERVER_IP:$REMOTE_DIR"
```

Just one command and the site is live. Sometimes simple is better, [complexity bad](https://grugbrain.dev/).

---

## Wrapping Up

Angular might be a little overkill for a personal website, but it is the framework I know and enjoy, and this project proves it works perfectly fine for a content-driven static site.

The full source code is open: [github.com/ArneVcrs/arnevercruysse.be](https://github.com/ArneVcrs/arnevercruysse.be). Feel free to look around, and don't hesitate to reach out if you have any questions!
