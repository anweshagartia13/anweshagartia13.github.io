"use client";

import * as React from "react";
import { Zap, LayoutDashboard, BarChart3, Mail, Database, ShieldCheck } from "lucide-react";

const featuresList = [
  {
    icon: Zap,
    title: "Fast Lead Collection",
    description:
      "Instant client and server side Zod schema validation ensuring only high-quality, verified lead entries reach your sales team.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: LayoutDashboard,
    title: "Real Time Dashboard",
    description:
      "Manage all incoming leads with live search, status toggles (New, Contacted, Closed), budget filters, and pagination.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: BarChart3,
    title: "Interactive Analytics",
    description:
      "Visualize monthly acquisition trends, status breakdown donut charts, and budget distribution with Recharts graphs.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Mail,
    title: "Instant Email Alerts",
    description:
      "Automated Resend integration triggers rich HTML email notifications directly to your sales engineers on every submission.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Database,
    title: "Secure Supabase Database",
    description:
      "Backed by Prisma ORM and Supabase PostgreSQL with type-safe schema migrations, indexing, and dual SQLite dev support.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Clerk Admin Protection",
    description:
      "Enterprise-grade authentication with Clerk protecting sensitive /admin endpoints and user session handling.",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Powerful CRM Architecture
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need To Close Deals
          </p>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            Designed for modern tech startups and growth teams that require clean code, speed, and seamless lead pipeline management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group relative p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40 backdrop-blur-md"
              >
                <div className={`w-12 h-12 rounded-2xl border ${feat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
