"use client";

import * as React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "LeadDesk Mini completely transformed how our sales team manages incoming inbound leads. The instant email notifications and status toggling cut our response time by 75%.",
    author: "Marcus Vance",
    role: "Head of Growth",
    company: "Linear Flow",
    rating: 5,
  },
  {
    quote:
      "The UI aesthetics are second to none. It feels like software built by Vercel and Stripe engineers. Zod validation means zero spam entries in our Supabase DB.",
    author: "Sophia Chen",
    role: "VP of Product",
    company: "TechMatrix Co",
    rating: 5,
  },
  {
    quote:
      "Having full CSV exports and Recharts analytics out of the box saved us weeks of custom dashboard development. Best CRM template we've ever deployed.",
    author: "Alexander Wright",
    role: "Founding Engineer",
    company: "Apex Capital",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-950/80 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Social Proof & Praise
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted By High-Growth Engineering Teams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-slate-400">
                    {t.role} · <span className="text-indigo-400 font-semibold">{t.company}</span>
                  </p>
                </div>
                <Quote className="w-6 h-6 text-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
