# Architectural Decision Records (ADRs) 📄

This document records the major software engineering and technology decisions made while designing **PulseIQ — Website Health & SEO Analyzer**.

---

## Decision 1: Why Express.js for Backend API

### Problem
The backend requires a fast, non-blocking HTTP API layer to receive audit requests, process scraping middleware, handle CORS, enforce rate limits, and sanitize errors.

### Solution
Selected **Express.js** as the backend web application framework.

### Reasoning
- Lightweight footprint with minimal memory consumption (~30MB RSS).
- Mature middleware ecosystem (`cors`, `express-rate-limit`).
- Seamless integration with Vercel Serverless Functions and traditional Node.js servers (Render).

### Trade-offs
- Lacks built-in dependency injection or opinionated ORM structures compared to NestJS.

### Future Improvements
- Migrate to NestJS or Fastify if enterprise multi-tenant role management is introduced.

---

## Decision 2: Why React + Vite for Frontend Framework

### Problem
The user interface must render complex data visualizers (circular progress gauges, speedometer needles, heading hierarchy bar charts, OpenGraph link previews) with high-performance 60fps animations.

### Solution
Selected **React 18** paired with **Vite** as the frontend build tool.

### Reasoning
- React's component model enables modular UI construction (`SeoScoreCircle`, `Speedometer`, `OgPreviewCard`).
- Vite provides instant HMR (<100ms) and highly optimized ES module bundling (~360kB gzip bundle).

### Trade-offs
- Initial client-side render requires JS execution in the browser.

### Future Improvements
- Add Next.js App Router SSR if static marketing pages require search engine indexing.

---

## Decision 3: Why Tailwind CSS for Styling Design System

### Problem
The UI requires a modern dark SaaS aesthetic (`#0F172A` Slate background, `#1E293B` Slate card containers, `#3B82F6` Accent Blue) with custom glassmorphism effects and responsive layouts.

### Solution
Selected **Tailwind CSS**.

### Reasoning
- Utility-first approach eliminates custom CSS bloat and naming conflicts.
- Built-in JIT compiler generates only used CSS classes (final CSS bundle < 30kB).

### Trade-offs
- HTML template class strings can become lengthy without reusable abstraction components.

### Future Improvements
- Extract repeated card designs into CVA (Class Variance Authority) variants.

---

## Decision 4: Why Cheerio over Headless Browsers (Puppeteer / Playwright)

### Problem
Target webpages must be parsed to extract 35+ metadata parameters without incurring the 10+ second latency and heavy CPU/RAM costs of headless Chrome browsers.

### Solution
Selected **Cheerio** for stream DOM parsing.

### Reasoning
- Cheerio parses HTML strings in under 10 milliseconds.
- Consumes <15MB RAM per process versus 350MB+ for headless Chromium.
- Operates reliably within serverless function memory caps (1024MB).

### Trade-offs
- Cheerio does not execute client-side JavaScript for Single Page Applications (SPAs) built with client-side React/Vue without SSR.

### Future Improvements
- Implement a hybrid router: use Cheerio by default; fallback to Playwright only if `<body>` contains `<div id="root">` with zero static text.

---

## Decision 5: Why Axios for HTTP Scraping Transport

### Problem
The backend engine must fetch external website HTML with custom User-Agent spoofing, timeout limits, max response size limits, and max redirect caps.

### Solution
Selected **Axios**.

### Reasoning
- Out-of-the-box support for `timeout`, `maxRedirects`, and `maxContentLength`.
- Consistent response data formatting across Node.js environments.

### Trade-offs
- Adds a small external dependency footprint compared to native Node.js `fetch`.

### Future Improvements
- Transition to native `fetch` with `AbortController` when Node.js native HTTP pooling handles max content caps automatically.

---

## Decision 6: Why Client-Side Rendering with Custom State Hook (`useAnalyzer`)

### Problem
The auditing workflow consists of multiple transient UI states: `idle`, `loading`, `success`, and `error`.

### Solution
Encapsulated state logic inside a dedicated React custom hook (`useAnalyzer.js`).

### Reasoning
- Decouples UI presentation (`App.jsx`) from API fetch side effects.
- Facilitates celebratory confetti triggers (`canvas-confetti`) when SEO score >= 80.

### Trade-offs
- State is local to the current browser session.

### Future Improvements
- Persist recent URL audit history to LocalStorage or IndexedDB.
