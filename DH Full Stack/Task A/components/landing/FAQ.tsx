"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does LeadDesk Mini connect with my Supabase database?",
    a: "LeadDesk Mini uses Prisma ORM configured for Supabase PostgreSQL (`DATABASE_URL`). You simply run `npx prisma db push` to synchronize schema models.",
  },
  {
    q: "Is the Admin Panel protected against unauthenticated users?",
    a: "Yes! The `/admin` routes are protected using Clerk Middleware (`@clerk/nextjs`). Unauthenticated visitors are automatically directed to sign in.",
  },
  {
    q: "How are lead submission emails sent?",
    a: "Lead form submissions call a Next.js Server Action (`createLeadAction`), which uses the Resend SDK to generate and dispatch formatted HTML email alerts.",
  },
  {
    q: "Can I export my lead list into CSV format?",
    a: "Absolutely! The Admin Dashboard features an 'Export CSV' button that formats your filtered leads into a downloadable spreadsheet file.",
  },
  {
    q: "What validation rules are enforced on the lead form?",
    a: "Full Name requires at least 2 characters, Email requires a valid email format, Budget is a mandatory dropdown selection, and Message requires at least 10 characters.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-950/90 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? We Have Answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
