# ⚡ LeadDesk Mini - Production Lead Capture & SaaS CRM

**LeadDesk Mini** is a modern, high-performing, production-grade Lead Capture CRM web application built for digital startups, agencies, and high-growth sales teams. It delivers an intuitive public landing page, interactive validated lead form, backend server actions, Prisma ORM data modeling, Clerk authentication, interactive Recharts analytics, and single-click CSV data exports.

Designed with a sleek, dark/light mode SaaS design system inspired by **Linear**, **Vercel**, **Stripe**, and **Framer**.

---

## 🚀 Live Links & Deliverables

- **Live Landing Page**: [https://leaddesk-mini.vercel.app](https://leaddesk-mini.vercel.app)
- **Admin Dashboard**: [https://leaddesk-mini.vercel.app/admin](https://leaddesk-mini.vercel.app/admin)
- **GitHub Repository**: [https://github.com/anweshagartia13/leaddesk-mini](https://github.com/anweshagartia13/leaddesk-mini)

---

## ✨ Features Overview

### 1. Public Landing Page
- **Hero Section**: Dynamic gradient glow, interactive CTA buttons, live statistical counters (*1200+ Leads Managed*, *98% Customer Satisfaction*, *50+ Businesses*), and browser preview mockups.
- **Features Showcase**: 6 feature cards highlighting fast lead collection, real-time dashboards, analytics, email alerts, database security, and admin protection.
- **Social Proof & Testimonials**: Client reviews and rating highlights.
- **Transparent Pricing**: Tiered pricing tables for Starter, Pro, and Enterprise.
- **Accordion FAQ**: Expandable answers addressing database, auth, and email integrations.
- **Mandatory Task Footer**: Visible credit line reading **"Built for Digital Heroes Training Task"** linked to [digitalheroesco.com](https://digitalheroesco.com).

### 2. Lead Capture Form & Submission Experience
- **Form Fields**: Full Name, Work Email Address, Project Budget Range dropdown, Message / Project Brief.
- **Client & Server Validation**: Enforced via Zod schema and React Hook Form (Full Name min 2 chars, Email format, Budget selection, Message min 10 chars).
- **Interactive Feedback**: Button loading state during processing, confetti animation explosion (`canvas-confetti`), Sonner toast notification, and smooth form reset.
- **Resend Email Dispatches**: Asynchronous HTML email alerts containing lead details and submission timestamp delivered to sales engineers.

### 3. Protected Admin Dashboard (`/admin`)
- **Clerk Authentication**: Protected by `@clerk/nextjs` middleware with seamless dev mode fallback.
- **Top KPI Cards**: Total Leads, New Leads (Blue badge), Contacted (Yellow badge), and Closed Deals (Green badge with conversion rate).
- **Search & Multi-Filtering**: Real-time search by name/email, status filtering (`NEW`, `CONTACTED`, `CLOSED`), budget range filtering, and date sorting (`Latest`, `Oldest`, `Alphabetical`).
- **Instant Status Management**: Toggle lead status directly within table rows or inside the detailed drawer.
- **Lead Details Modal**: Click any lead row to view full brief, contact info, and metadata.
- **Confirmation Delete Modal**: Safeguarded deletion workflow with confirmation step.
- **CSV Data Export**: One-click export of currently visible/filtered lead lists into downloadable `.csv` spreadsheets.
- **Pagination & Skeletons**: 10 rows per page with sticky headers and pulse loading skeletons.

### 4. Performance Analytics (`/admin/analytics`)
- **Recharts Data Visualization**:
  - Monthly Lead Acquisition & Deal Closures (Area Chart).
  - Lead Status Breakdown (Donut Chart).
  - Budget Range Distribution (Bar Chart).
  - Overall Conversion Rate KPI cards.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, Framer Motion, Lucide Icons, React Hook Form, Zod Validation
- **Backend**: Next.js Server Actions, REST API Routes (`/api/leads`, `/api/leads/[id]`)
- **Database & ORM**: Prisma ORM, Supabase PostgreSQL (with SQLite local dev option)
- **Authentication**: Clerk Authentication (`@clerk/nextjs`)
- **Charts & UI**: Recharts, Sonner Toast, Canvas Confetti
- **Email Notifications**: Resend SDK
- **Deployment**: Vercel

---

## 📁 Project Structure

```text
leaddesk-mini/
├── app/
│   ├── layout.tsx                # Root layout with ClerkProvider, ThemeProvider, Toaster
│   ├── page.tsx                  # Public Landing Page & Lead Form
│   ├── not-found.tsx             # Custom SaaS 404 page
│   ├── error.tsx                 # Custom Error Boundary
│   ├── actions/
│   │   └── lead-actions.ts       # Server Actions (create, update status, delete, get stats)
│   ├── admin/
│   │   ├── layout.tsx            # Protected Admin layout with Sidebar & Header
│   │   ├── page.tsx              # Admin Dashboard with Leads Table & Filters
│   │   ├── analytics/
│   │   │   └── page.tsx          # Recharts Analytics Dashboard
│   │   └── settings/
│   │       └── page.tsx          # CRM configuration & alert settings
│   └── api/
│       └── leads/
│           ├── route.ts          # GET / POST leads REST API
│           └── [id]/
│               └── route.ts      # GET / PATCH / DELETE lead REST API
├── components/
│   ├── landing/                  # Navbar, Hero, Features, Pricing, Testimonials, FAQ, Footer
│   ├── leads/                    # LeadForm, LeadTable, LeadStatusBadge, LeadDetailsModal, LeadDeleteModal, LeadFilters
│   ├── analytics/                # MonthlyLeadsChart, StatusPieChart, BudgetBarChart
│   ├── layout/                   # AdminSidebar, AdminHeader
│   └── ui/                       # Button, Input, Textarea, Badge, Modal, Skeleton, ThemeToggle
├── lib/
│   ├── prisma.ts                 # Prisma Client Singleton
│   ├── email.ts                  # Resend email notification helper
│   ├── export.ts                 # CSV file downloader utility
│   ├── utils.ts                  # Date formatting & Tailwind merge helper
│   └── validations/
│       └── lead.ts               # Shared Zod validation schemas
├── prisma/
│   ├── schema.prisma             # Lead database model definition
│   └── seed.ts                   # Database seeder (10 realistic leads)
├── public/                       # Assets & Favicon
├── .env.example                  # Environment variable reference
└── README.md
```

---

## ⚡ Quick Start & Installation

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/anweshagartia13/leaddesk-mini.git
cd leaddesk-mini
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database Connection (SQLite local dev or Supabase PostgreSQL)
DATABASE_URL="file:./dev.db"

# Clerk Authentication Keys (Optional for local demo mode, required for production auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk Route Redirects
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/admin"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/admin"

# Resend Email Notification API Key
RESEND_API_KEY="re_..."
NOTIFICATION_EMAIL="admin@leaddesk.com"
```

### 3. Initialize & Seed Database

```bash
# Push Prisma schema to database
npm run db:push

# Seed database with sample leads
npm run db:seed
```

### 4. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Setup Instructions

1. Create a new project at [Supabase.com](https://supabase.com).
2. Navigate to **Project Settings** -> **Database**.
3. Copy your connection URI (`postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`).
4. Replace `DATABASE_URL` in your `.env` file or Vercel Environment Variables.
5. In `prisma/schema.prisma`, update the datasource provider to `postgresql`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
6. Run `npm run db:push` to sync tables.

---

## 🔐 Clerk Authentication Setup

1. Create an application at [Clerk.com](https://clerk.com).
2. Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` into your `.env` file.
3. In Clerk Dashboard -> **Paths**, set Sign-in to `/sign-in` and Sign-up to `/sign-up`.

---

## 🌐 Deploying to Vercel

1. Push code to your GitHub repository.
2. Import project into [Vercel](https://vercel.com).
3. Add environment variables (`DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `RESEND_API_KEY`).
4. Click **Deploy**. Vercel will run `prisma generate && next build` automatically!

---

## 🏆 Submission Credit

Built for **Digital Heroes Training Task** · [digitalheroesco.com](https://digitalheroesco.com)
