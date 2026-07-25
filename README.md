# PULSE IQ — Website Health & SEO Analyzer ⚡

> **PULSE IQ** is a modern, production-ready SaaS application designed to audit any URL in real time and deliver insights across SEO, performance metrics, open graph metadata, technical headers, and content structure.

Built for the **Digital Heroes Training Task** assessment.

---

## 🌟 Key Features

- **Instant Automated Audit**: Input any URL to receive a 30+ parameter audit report in seconds.
- **Cheerio HTML Parser**: High-speed, robust HTML DOM parsing with zero browser overhead.
- **100-Point SEO Score Engine**: Evaluates title length, meta description, HTTPS, canonical URL, H1 hierarchy, OpenGraph, Twitter card, robots.txt, and sitemap.xml presence.
- **Performance Speedometer**: Classifies response times (`Fast` <200ms, `Average` 200-600ms, `Slow` >600ms) with visual speedometer gauge.
- **Social Sharing Preview Card**: Interactive visual preview for OpenGraph & Twitter Cards.
- **Heading Hierarchy Visualizer**: Interactive distribution charts for H1, H2, and H3 tags.
- **Intelligent Feedback Generator**: Provides categorized warnings and actionable recommendations.
- **Step Progress Loader**: Animated multi-step progress bar replacing basic spinners.
- **Comprehensive Error Safeguards**: Gracefully handles invalid URLs, timeouts, non-HTML responses, blocked hosts, 404/500 status codes, and DNS resolution failures.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS (Dark SaaS Theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Scraper & Parser**: Axios + Cheerio
- **Rate Limiting**: `express-rate-limit`

---

## 📁 Project Folder Structure

```
Task A/
├── backend/
│   ├── config/
│   │   └── constants.js          # Scoring weights & timeout thresholds
│   ├── controllers/
│   │   └── analyzerController.js # Handles POST /api/analyze requests
│   ├── middleware/
│   │   ├── validateUrl.js        # Normalizes & validates input URLs
│   │   └── errorHandler.js       # Global JSON error handling
│   ├── routes/
│   │   └── analyzerRoutes.js     # API route definitions
│   ├── services/
│   │   ├── scraperService.js     # Axios fetcher & robots/sitemap checker
│   │   └── seoAnalyzerService.js # Cheerio DOM parser & scoring algorithm
│   ├── utils/
│   │   └── urlHelper.js          # URL normalization & link resolution
│   ├── .env.example
│   ├── server.js                 # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Brand header with status indicator
│   │   │   ├── Footer.jsx        # Mandatory Digital Heroes training credit
│   │   │   ├── HeroSection.jsx   # Hero title, search input & example buttons
│   │   │   ├── LoadingSteps.jsx  # Multi-step progress animation
│   │   │   ├── SeoScoreCircle.jsx# Circular SVG score gauge (0-100)
│   │   │   ├── Speedometer.jsx   # Performance speedometer gauge
│   │   │   ├── StatCard.jsx      # Summary metric cards
│   │   │   ├── HeadingHierarchy.jsx# H1-H3 hierarchy breakdown
│   │   │   ├── OgPreviewCard.jsx # OpenGraph / Twitter link preview
│   │   │   ├── ChecklistCard.jsx # Categorized warnings & recommendations
│   │   │   ├── Dashboard.jsx     # Main audit dashboard layout
│   │   │   └── SkeletonLoader.jsx# Animated skeleton UI
│   │   ├── hooks/
│   │   │   └── useAnalyzer.js    # Custom audit state management hook
│   │   ├── services/
│   │   │   └── api.js            # Axios API layer
│   │   ├── App.jsx               # Application root
│   │   ├── index.css             # Tailwind base & glassmorphism utilities
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── package.json                  # Root monorepo script orchestrator
└── README.md
```

---

## ⚡ API Specification

### `POST /api/analyze`

#### Request Body
```json
{
  "url": "https://google.com"
}
```

#### Response Example (200 OK)
```json
{
  "success": true,
  "url": "https://google.com/",
  "analyzedAt": "2026-07-25T17:15:00.000Z",
  "statusCode": 200,
  "statusText": "OK",
  "responseTime": 142,
  "contentType": "text/html; charset=UTF-8",
  "pageTitle": "Google",
  "metaDescription": "Search the world's information, including webpages, images, videos and more.",
  "metaKeywords": null,
  "canonicalURL": "https://www.google.com/",
  "favicon": "https://www.google.com/favicon.ico",
  "language": "en",
  "charset": "UTF-8",
  "httpsEnabled": true,
  "h1Count": 1,
  "h2Count": 0,
  "h3Count": 0,
  "paragraphCount": 12,
  "wordCount": 420,
  "estimatedReadingTime": "3 min read",
  "imageCount": 4,
  "imagesMissingAlt": 0,
  "internalLinks": 15,
  "externalLinks": 3,
  "viewportPresent": true,
  "robotsMeta": null,
  "robotsTxtExists": true,
  "sitemapExists": true,
  "openGraphTags": {
    "present": true,
    "title": "Google",
    "description": "Search engine",
    "image": "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
  },
  "twitterCard": {
    "present": true
  },
  "performanceRating": "Fast",
  "seoScore": 95,
  "warnings": [],
  "recommendations": [
    "Keep page titles under 60 characters for optimal display in SERPs."
  ]
}
```

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 2. Installation
Clone the repository and install all dependencies:

```bash
# Install root dependencies
npm install

# Install backend & frontend dependencies
npm run install:all
```

### 3. Environment Variables Setup

Create `.env` in `backend/`:
```env
PORT=5000
NODE_ENV=development
```

Create `.env` in `frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Running Locally
Run both backend API and Vite dev server simultaneously:

```bash
npm run dev
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

---

## 🚀 Production Deployment

### Backend Deployment (Render)
1. Connect your GitHub repository to Render.
2. Select **Web Service**.
3. Set **Root Directory**: `backend`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node server.js`
6. Add environment variable: `PORT=5000`

### Frontend Deployment (Vercel)
1. Import project into Vercel.
2. Set **Root Directory**: `frontend`
3. Set **Framework Preset**: Vite
4. Add environment variable:
   - `VITE_API_URL`: Your deployed Render backend URL (e.g. `https://pulse-iq-api.onrender.com`)

---

## 📜 Credit

Built for [Digital Heroes](https://digitalheroesco.com) Training Task.
