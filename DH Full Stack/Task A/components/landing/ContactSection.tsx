"use client";

import * as React from "react";
import { LeadForm } from "@/components/leads/LeadForm";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Start Capturing Leads
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready To Accelerate Sales?
          </p>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Submit your information below to experience our interactive lead capture workflow.
          </p>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
