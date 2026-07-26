import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Database, Key } from 'lucide-react';

export default function PrivacyPage({ setActivePage }) {
  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-6">
        <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
          Legal & Compliance
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">Last Updated: July 26, 2026 • Effective Date: January 1, 2026</p>

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-900/80">
          
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>1. Zero-Data Training Guarantee</span>
            </h3>
            <p>
              At NeuraFlow AI Technologies Inc., we recognize that proprietary business datasets and prompt telemetry represent our enterprise clients' most valuable intellectual property. We guarantee that customer data submitted to our API or fine-tuning pipelines is **never used to train or improve public foundational models**.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
              <Lock className="w-5 h-5 text-blue-400" />
              <span>2. SOC 2 Type II & Encryption Standards</span>
            </h3>
            <p>
              All customer data in transit is encrypted using TLS 1.3 with AES-256 GCM algorithms. Data at rest within dedicated vector databases or model checkpoint storage is encrypted using customer-managed KMS keys. We undergo annual independent SOC 2 Type II and ISO 27001 audits.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
              <Database className="w-5 h-5 text-purple-400" />
              <span>3. Data Retention & Isolation</span>
            </h3>
            <p>
              Under our Zero-Data Retention option, API request payloads and model outputs exist in volatile GPU RAM solely during inference execution and are purged immediately upon completion. Temporary logs for diagnostic debugging are automatically deleted after 30 days.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
              <Eye className="w-5 h-5 text-emerald-400" />
              <span>4. GDPR & CCPA Compliance Rights</span>
            </h3>
            <p>
              European Union and California residents retain full rights to request access, rectification, portability, or complete erasure of personal data processed by our systems. Contact our Data Protection Officer at <span className="text-cyan-400">privacy@neuraflow.ai</span> for expedited processing.
            </p>
          </section>

          <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs">
            <button onClick={() => { setActivePage('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-cyan-400 hover:underline">
              View Terms & Conditions →
            </button>
            <span className="text-slate-500">NeuraFlow AI Security Operations</span>
          </div>

        </div>
      </section>
    </div>
  );
}
