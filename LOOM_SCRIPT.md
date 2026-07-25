# PulseIQ — Loom Video Walkthrough Script (6–7 Minutes)

This document provides a timed, word-for-word presentation script and screen recording guide for demonstrating **PulseIQ — Website Health & SEO Analyzer** to engineering assessors and hiring managers.

---

## ⏱️ Video Presentation Overview

| Time | Section | Screen Focus | Key Highlights |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:45** | Introduction & Problem Statement | Hero Page (`https://pulse-iq-frontend.vercel.app`) | SDE assessment context, why Lighthouse is heavy, PulseIQ solution |
| **0:45 – 1:45** | Architecture & Technical Design | `docs/ARCHITECTURE.md` & IDE | Decoupled React/Vite + Express/Cheerio, zero headless browser overhead |
| **1:45 – 3:15** | Live Product Demonstration | Live Web App (Dashboard) | Search `google.com`, animated progress loader, score gauge, speedometer, OG preview |
| **3:15 – 4:15** | Automated Testing & Coverage | Terminal & `npm test` | 44/44 Jest & Supertest unit/integration tests passing (95%+ coverage) |
| **4:15 – 5:15** | Developer Diagnostics Portal | Hidden `/developer` Route | Telemetry, environment indicators, build timestamps |
| **5:15 – 6:15** | Engineering Decisions & Self-Critique | `docs/DECISIONS.md` | Trade-offs of Cheerio vs Puppeteer, caching, Redis, rate limiting |
| **6:15 – 7:00** | Roadmap & Closing Remarks | `docs/ROADMAP.md` & Footer | Mandatory Digital Heroes footer link, future scale plans |

---

## 🎙️ Timed Script

### 0:00 – 0:45 | Introduction & Problem Statement
> *"Hello everyone! My name is Anwesha Gartia, and today I am excited to present **PulseIQ — Website Health & SEO Analyzer**, a production-grade mini Google Lighthouse dashboard built for the Digital Heroes SDE Training Task.*
> 
> *Traditional web auditing tools like Lighthouse require heavy headless browsers that take 15 to 30 seconds to spin up, making real-time user-facing audits sluggish. PulseIQ solves this by providing a lightning-fast, 30+ parameter technical SEO audit in under 200 milliseconds using lightweight stream parsing."*

---

### 0:45 – 1:45 | System Architecture & Tech Stack
> *"Let's look at the system architecture. On the frontend, we use React 18, Vite, Tailwind CSS with a modern dark SaaS aesthetic, and Framer Motion for smooth micro-animations.
> 
> On the backend, we built an Express REST API leveraging Cheerio for zero-overhead HTML DOM parsing, combined with Axios for HTTP transport and custom User-Agent spoofing to bypass bot blocks.
> 
> Rather than relying on heavy headless browser instances, our custom Cheerio engine parses HTML streams directly, measuring server response latency via high-precision performance timers and running parallel HEAD probes to verify `/robots.txt` and `/sitemap.xml` presence at domain root."*

---

### 1:45 – 3:15 | Live Product Demonstration
> *"Now let's see PulseIQ in action! Here on our live production site deployed to Vercel at `pulse-iq-frontend.vercel.app`, we have our Hero section with quick-trigger example chips for Google, GitHub, and OpenAI.
> 
> When I click 'Analyze' for `https://google.com`, notice that instead of a plain loading spinner, PulseIQ displays a multi-step animated checklist showing real-time stage progression: Connecting, Downloading HTML, Parsing Metadata, Calculating SEO, and Generating Dashboard.
> 
> Upon completion, we are presented with our Audit Dashboard:
> - **SEO Health Score Gauge**: An interactive SVG radial meter showing Google's score of 40/100.
> - **Performance Speedometer**: Displays the server response speed.
> - **Primary Metrics Grid**: Cards for Word Count, Reading Time, Language, Charset, Images with missing alt counts, Hyperlinks, and Mobile Viewport readiness.
> - **Heading Hierarchy Bar Chart**: Shows distribution of H1, H2, and H3 elements.
> - **Social Sharing Card Preview**: Renders a live mock preview of how the link appears when shared on Twitter or OpenGraph platforms.
> - **Actionable Recommendations & Warnings**: Categorized checklists highlighting missing meta descriptions, low word counts, and missing alt text."*

---

### 3:15 – 4:15 | Automated Test Suite & Code Quality
> *"Clean architecture and test-driven reliability are fundamental to senior engineering. In our terminal, let's run `npm test`.
> 
> As you can see, our Jest and Supertest automated test suite executes 5 complete test files comprising 44 total tests with 100% pass rate:
> 1. `parser.test.js`: Verifies happy paths, missing titles, missing meta descriptions, empty HTML, broken syntax, and large payloads.
> 2. `api.test.js`: Tests `POST /api/analyze` against valid domains, invalid URLs, empty bodies, non-HTML responses, 404s, and 500 errors without server crashes.
> 3. `validator.test.js`: Verifies URL normalization, HTTPS protocol enforcement, and hostname parsing.
> 4. `seoScore.test.js`: Validates all 11 scoring rules against exact score fixtures (100, 85, 70, 45, 0).
> 5. `utils.test.js`: Verifies link resolution algorithms.
> 
> Statement coverage exceeds **95%**, function coverage is at **100%**, and line coverage is at **95%**."*

---

### 4:15 – 5:15 | Developer Diagnostics Portal (`/developer`)
> *"We also implemented an internal Developer Diagnostics view accessible at `/developer`.
> 
> This dashboard provides real-time operational telemetry: API health status, API version (`v1.0.0`), production build environment, execution latency, and live test coverage bars. It allows engineering teams to monitor system health without digging into server logs."*

---

### 5:15 – 6:15 | Engineering Decisions & Self-Critique
> *"Let's discuss our engineering trade-offs:
> - **Cheerio vs Puppeteer**: We chose Cheerio for its 20x speed advantage and low memory footprint. The trade-off is that client-side SPA JavaScript rendering (like single-page React apps without SSR) isn't executed. In production, we can add a hybrid fallback to Playwright for JS-heavy sites.
> - **Caching**: Currently, requests fetch fresh HTML. If scaled commercially, implementing a Redis caching layer with a 1-hour TTL would reduce outbound bandwidth by up to 60%.
> - **Rate Limiting & Security**: We implemented `express-rate-limit` (60 requests per 15 minutes), custom User-Agent headers, timeout safeguards (10s), and max payload caps (10MB) to prevent Denial of Service attacks."*

---

### 6:15 – 7:00 | Roadmap & Conclusion
> *"Looking ahead to Version 1.1, our roadmap includes Redis caching, authentication, PDF report exports, and full Lighthouse CLI integration.
> 
> Finally, as required by the assessment guidelines, every view includes our mandatory credit line in the footer: **'Built for Digital Heroes Training Task'** with 'Digital Heroes' linking directly to `https://digitalheroesco.com`.
> 
> Thank you for your time and review!"*
