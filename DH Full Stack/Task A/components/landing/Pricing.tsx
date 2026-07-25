"use client";

import * as React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Starter Lead Desk",
    price: "$29",
    period: "/month",
    description: "Perfect for indie hackers and early stage startups building their first lead pipeline.",
    features: [
      "Up to 500 Active Leads",
      "Public Lead Capture Form",
      "Client & Server Zod Validation",
      "SQLite / Postgres Database",
      "Email Support",
    ],
    highlighted: false,
    cta: "Start Free Trial",
  },
  {
    name: "Pro Growth Suite",
    price: "$79",
    period: "/month",
    description: "Designed for scaling SaaS products needing automated lead alerts and analytics.",
    features: [
      "Unlimited Lead Storage",
      "Protected Clerk Admin Panel",
      "Instant Resend Email Alerts",
      "Interactive Recharts Graphs",
      "One-Click CSV Data Export",
      "Live Lead Status Toggles",
      "Priority 24/7 Support",
    ],
    highlighted: true,
    cta: "Get Started Pro",
  },
  {
    name: "Enterprise Custom",
    price: "$199",
    period: "/month",
    description: "Dedicated infrastructure, custom webhooks, and tailored multi-user RBAC.",
    features: [
      "Custom Subdomain & Branding",
      "Dedicated Supabase Instance",
      "Custom Webhook Integration",
      "SLA 99.9% Uptime Guarantee",
      "Dedicated Account Manager",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Transparent Pricing
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simple Plans That Scale With Your Business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? "bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/60 scale-105"
                  : "bg-slate-900/50 border border-slate-800"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-400 min-h-[36px]">{plan.description}</p>

                <div className="my-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-sm font-medium text-slate-400">{plan.period}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-slate-800 text-sm text-slate-300">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <a href="#contact">
                  <Button
                    variant={plan.highlighted ? "primary" : "outline"}
                    className="w-full justify-center"
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
