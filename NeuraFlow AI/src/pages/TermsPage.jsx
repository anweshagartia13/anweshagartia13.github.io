import React from 'react';
import { Scale, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function TermsPage({ setActivePage }) {
  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-6">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
          Legal Agreement
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">Last Updated: July 26, 2026 • Commercial Terms v4.2</p>

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-900/80">
          
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              <span>1. Commercial License & Platform Use</span>
            </h3>
            <p>
              By accessing the NeuraFlow AI platform, APIs, or custom model checkpoints, you agree to comply with these Terms of Service. NeuraFlow AI grants enterprise subscribers a worldwide, non-exclusive, non-transferable license to access our proprietary inference nodes.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <span>2. Intellectual Property & Model Ownership</span>
            </h3>
            <p>
              All inputs, customer datasets, fine-tuned weights, and outputs generated specifically for the client remain the sole and exclusive intellectual property of the customer. NeuraFlow AI retains all rights to underlying foundational framework code and MLOps tooling.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>3. Service Level Agreement (SLA) & Credits</span>
            </h3>
            <p>
              We guarantee 99.95% API uptime for Professional tiers and 99.99% for Enterprise tiers. If monthly uptime drops below our SLA commitment, customer accounts will automatically receive prorated billing credits as outlined in the Master Services Agreement (MSA).
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>4. Acceptable Use & Prohibited Content</span>
            </h3>
            <p>
              Customers shall not utilize NeuraFlow AI systems for malicious software generation, unauthorized deepfakes, illegal surveillance, or activities violating international AI safety laws.
            </p>
          </section>

          <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs">
            <button onClick={() => { setActivePage('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-cyan-400 hover:underline">
              ← View Privacy Policy
            </button>
            <span className="text-slate-500">NeuraFlow AI Legal Department</span>
          </div>

        </div>
      </section>
    </div>
  );
}
