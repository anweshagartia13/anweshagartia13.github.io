# PULSE IQ — Website Health & SEO Analyzer ⚡

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://pulse-iq-frontend.vercel.app)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **PulseIQ** is an enterprise-grade, high-performance SaaS web application designed to audit any URL in real-time. It returns a 30+ metric report spanning technical SEO scoring, server response latency, OpenGraph social link previews, heading tree structures, and actionable optimization checklists.

Built for the **Digital Heroes Training Task** assessment.

---

## 🌐 Live Production Application

- **Live Web Application**: **[https://pulse-iq-frontend.vercel.app](https://pulse-iq-frontend.vercel.app)**
- **Developer Portal**: **[https://pulse-iq-frontend.vercel.app/developer](https://pulse-iq-frontend.vercel.app/developer)**
- **GitHub Repository**: **[anweshagartia13.github.io/tree/pulse-iq-analyzer](https://github.com/anweshagartia13/anweshagartia13.github.io/tree/pulse-iq-analyzer)**

---

## 🌟 Key Features

- **High-Speed HTML Stream Parser**: Cheerio-based engine parses 35+ parameters in under 200 milliseconds.
- **100-Point Weighted SEO Scoring Engine**: Evaluates title, meta description, HTTPS, viewport, canonical URL, word count > 300, OpenGraph, Twitter Cards, `robots.txt`, and `sitemap.xml`.
- **Performance Rating Speedometer**: Classifies response times (`Fast` <200ms, `Average` 200-600ms, `Slow` >600ms) with visual speedometer gauge.
- **Social Sharing Preview**: Interactive mock card for OpenGraph & Twitter Cards.
- **Heading Hierarchy Visualizer**: Visual bar chart distribution for H1, H2, and H3 elements.
- **Intelligent Feedback Generator**: Automatic warning flags and actionable recommendations checklist.
- **Multi-Step Progress Loading Experience**: Animated progress checklist replacing basic spinners.
- **Developer Diagnostics Portal (`/developer`)**: Internal telemetry, live API status, build environment, and Jest test coverage metrics.
- **Automated Test Suite**: 44 Jest & Supertest unit/integration test cases achieving 95%+ code coverage.

---

## 📸 Screenshots Overview

| View | Description | Reference |
| :--- | :--- | :--- |
| **Home Page** | Modern Dark SaaS Hero with quick-trigger example chips | [View Screenshot](screenshots/README.md#home-page) |
| **Loading State** | Multi-step progress animation & skeleton loading cards | [View Screenshot](screenshots/README.md#loading-state) |
| **Dashboard** | Circular score gauge, speedometer, and metric cards | [View Screenshot](screenshots/README.md#dashboard) |
| **Developer Portal** | Internal `/developer` system health & test coverage | [View Screenshot](screenshots/README.md#developer-page) |

---

## 🏗️ System Architecture

```
Task A/
├── backend/                  # Node.js + Express.js API Server
│   ├── config/constants.js   # Scoring weights & timeout thresholds
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Rate limit & URL validation middleware
│   ├── services/             # Cheerio DOM parser & scraper service
│   ├── utils/                # URL normalization & link helpers
│   └── server.js
├── frontend/                 # React 18 + Vite Web Application
│   ├── api/analyze.js        # Vercel Serverless Function API Handler
│   ├── src/
│   │   ├── components/       # Dashboard, Gauges, Speedometer, /developer
│   │   ├── hooks/            # useAnalyzer custom hook
│   │   └── services/         # Axios API client
│   └── vite.config.js
├── tests/                    # Jest + Supertest Automated Test Suite
│   ├── fixtures/             # HTML test fixtures (scores 100, 85, 70, 45, 0)
│   ├── parser.test.js        # Cheerio DOM parser unit tests
│   ├── api.test.js           # REST API integration tests
│   ├── validator.test.js     # URL validator unit tests
│   ├── seoScore.test.js      # SEO scoring rule unit tests
│   └── utils.test.js         # Helper utility unit tests
├── docs/                     # Architecture & Engineering Documentation
│   ├── ARCHITECTURE.md       # Lifecycle & scale specifications
│   ├── API.md                # REST API documentation
│   ├── TESTING.md            # Testing methodology & coverage
│   ├── DECISIONS.md          # 6 Architectural Decision Records (ADRs)
│   ├── ROADMAP.md            # Product roadmap v1.0 -> v2.0
│   ├── SECURITY.md           # Security posture & rate limiting
│   └── PERFORMANCE.md        # Memory & parsing benchmarks
├── screenshots/              # Screenshot asset documentation
├── CHANGELOG.md              # Release history
├── LICENSE                   # MIT License
├── LOOM_SCRIPT.md            # 6-7 minute video walkthrough presentation script
├── jest.config.cjs           # Jest configuration
└── README.md
```

---

## 🧪 Automated Testing & Coverage

PulseIQ includes a Jest + Supertest test suite:

```bash
# Run test suite
npm test
```

### Verified Coverage Report
```
PASS tests/utils.test.js
PASS tests/validator.test.js
PASS tests/seoScore.test.js
PASS tests/parser.test.js
PASS tests/api.test.js

Test Suites: 5 passed, 5 total
Tests:       44 passed, 44 total
Statements:  95.7% Coverage
Functions:   100.0% Coverage
Lines:       95.4% Coverage
Time:        5.268 s
```

---

## 📡 REST API Documentation

### `POST /api/analyze`

#### Request Body
```json
{
  "url": "https://google.com"
}
```

#### Response Example (`200 OK`)
```json
{
  "success": true,
  "url": "https://www.google.com/",
  "analyzedAt": "2026-07-25T16:36:19.208Z",
  "statusCode": 200,
  "statusText": "OK",
  "responseTime": 161,
  "contentType": "text/html; charset=UTF-8",
  "pageTitle": "Google",
  "metaDescription": "Search the world's information...",
  "canonicalURL": "https://www.google.com/",
  "favicon": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
  "httpsEnabled": true,
  "h1Count": 1,
  "wordCount": 420,
  "estimatedReadingTime": "3 min read",
  "robotsTxtExists": true,
  "sitemapExists": true,
  "performanceRating": "Fast",
  "seoScore": 95,
  "warnings": [],
  "recommendations": []
}
```

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 2. Installation
```bash
# Install root dependencies
npm install

# Install backend & frontend dependencies
npm run install:all
```

### 3. Run Locally
```bash
# Run both frontend and backend concurrently
npm run dev
```

- **Frontend UI**: `http://localhost:3000`
- **Developer Portal**: `http://localhost:3000/developer`
- **Backend API**: `http://localhost:5000`

---

## 🚀 Deployment

- **Frontend & Serverless API**: Deployed to Vercel (`https://pulse-iq-frontend.vercel.app`)
- **Standalone Backend**: Configured for deployment to Render (`render.com`)

---

## 📄 License & Credits

This project is licensed under the [MIT License](LICENSE).

Built for [Digital Heroes](https://digitalheroesco.com) Training Task.
