# PulseIQ Architecture & Technical Specification 🏗️

This document outlines the software architecture, system request lifecycle, parser engine mechanics, error boundary strategies, and scalability model for **PulseIQ — Website Health & SEO Analyzer**.

---

## 1. System Overview

PulseIQ is designed around a decoupled, micro-service ready architecture separating the single-page user interface (React + Vite) from the statutory scraping and analytical engine (Node.js + Express).

```
                      +---------------------------------------+
                      |         Browser Client (React)        |
                      |  - Framer Motion Micro-Animations     |
                      |  - SVG Gauges & Speedometer Rendering |
                      +-------------------+-------------------+
                                          |
                                          | HTTP POST /api/analyze
                                          v
                      +-------------------+-------------------+
                      |      Vercel / Express Backend         |
                      |  - Rate Limiting Middleware           |
                      |  - URL Normalizer & Validator         |
                      +-------------------+-------------------+
                                          |
                        +-----------------+-----------------+
                        |                                   |
                        v                                   v
             +----------+----------+               +-------+----------+
             | Cheerio DOM Parser  |               | Auxiliary Probe  |
             |  - Meta Tag Extract |               |  - /robots.txt   |
             |  - Word / Reading   |               |  - /sitemap.xml  |
             |  - Heading Tree     |               +-------+----------+
             +----------+----------+                       |
                        |                                   |
                        +-----------------+-----------------+
                                          |
                                          v
                      +-------------------+-------------------+
                      |     100-Point SEO Rule Matrix         |
                      |  - Weighted Score Calculator          |
                      |  - Warnings & Action Generator      |
                      +-------------------+-------------------+
                                          |
                                          v
                      +-------------------+-------------------+
                      |     Standardized JSON Response        |
                      +---------------------------------------+
```

---

## 2. Request Lifecycle & Sequence

1. **User Request Initiation**: User submits a URL string (e.g. `google.com`) in the frontend Hero input component.
2. **Client Validation & State Switch**: `useAnalyzer` custom hook switches state to `loading`, triggering the interactive step progress animation (`Connecting` -> `Downloading HTML` -> `Parsing Metadata` -> `Calculating SEO` -> `Generating Report`).
3. **HTTP Transport**: `Axios` sends `POST /api/analyze` with JSON payload `{ "url": "google.com" }`.
4. **Url Normalization Middleware**: Backend `validateUrl.js` normalizes the string into a valid HTTP/HTTPS URL (`https://google.com`), enforcing domain syntax constraints.
5. **Parallel Scraping Execution**: `scraperService.js` initiates parallel network requests:
   - Primary `GET` request fetching target HTML with a 10-second timeout safeguard and custom User-Agent.
   - Secondary HEAD/GET probes for `https://target.com/robots.txt` and `https://target.com/sitemap.xml`.
6. **Cheerio Parsing & Metric Extraction**: `seoAnalyzerService.js` parses the HTML DOM into memory:
   - Extracts title, meta description, meta keywords, canonical link, viewport, favicon, language, charset.
   - Calculates total word count (excluding scripts/styles) and estimated reading time.
   - Counts H1, H2, and H3 heading tags.
   - Audits image tags for missing `alt` text.
   - Audits links for internal vs external classification.
   - Extracts OpenGraph (`og:*`) and Twitter (`twitter:*`) cards.
7. **SEO Score Calculation**: Applies deterministic weighted scoring matrix (max 100 points).
8. **Performance Classification**: Classifies server response latency into `Fast` (<200ms), `Average` (200-600ms), or `Slow` (>600ms).
9. **Feedback Generation**: Generates array of warnings and actionable recommendations.
10. **Response Delivery**: Returns 200 OK JSON response to client for instant dashboard rendering.

---

## 3. Parser Engine Deep-Dive

PulseIQ deliberately utilizes **Cheerio** over headless browsers (Puppeteer/Playwright):

| Feature | Cheerio Engine | Headless Browser (Puppeteer) |
| :--- | :--- | :--- |
| **Execution Time** | ~10 - 200 ms | ~3,000 - 15,000 ms |
| **Memory Consumption** | ~15 MB per process | ~350 MB per instance |
| **CPU Load** | Low (Stream Regex & Parsing) | High (Chromium Rendering) |
| **Serverless Scalability**| High (Vercel/Render support) | Restricted by binary size |

---

## 4. Error Handling Strategy

The system enforces strict error boundaries at every tier to prevent process crashes:

- **Invalid URL Input**: Caught by `validateUrl.js` -> HTTP 400 Bad Request JSON.
- **Connection Timeout**: Caught by Axios timeout handler (10s limit) -> HTTP 504 Gateway Timeout JSON.
- **DNS Failure**: Caught by `ENOTFOUND` error handler -> HTTP 404 Not Found JSON (`DNS_ERROR`).
- **Non-HTML Responses**: Validated via `Content-Type` headers (PDF, images, zip files) -> HTTP 400 Bad Request (`NON_HTML_RESPONSE`).
- **Blocked/403 Sites**: Caught gracefully and evaluated for accessible headers without throwing unhandled exceptions.

---

## 5. Scalability & Future Infrastructure

To scale PulseIQ to handle millions of monthly audits, the recommended production architecture includes:

1. **Redis Caching Tier**: Cache audited reports for 1 hour keyed by normalized URL.
2. **Worker Queue (BullMQ + Redis)**: Asynchronous background auditing for bulk domain lists.
3. **Playwright Hybrid Fallback**: Route single-page app (SPA) JavaScript sites to headless Chromium only when Cheerio detects empty `<body>` tags.
4. **CDN Edge Caching**: Deploy API proxies on Cloudflare Workers for edge latency under 30ms.
