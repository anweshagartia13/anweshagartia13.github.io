import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export default function BrochureModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDownloaded(true);
    
    // Trigger virtual file download
    const element = document.createElement('a');
    const file = new Blob([
      `NEURAFLOW AI - ENTERPRISE AI SOLUTIONS WHITE PAPER (2026 EDITION)
      
----------------------------------------------------------------------
Tagline: Transforming Businesses with Artificial Intelligence
Website: https://neuraflow.ai
Contact: enterprise@neuraflow.ai
----------------------------------------------------------------------

1. EXECUTIVE SUMMARY
NeuraFlow AI builds custom machine learning pipelines, agentic chatbots, computer vision architectures, and automated intelligence engines for global enterprise leaders.

2. CORE OFFERINGS
- Autonomous Agentic Chatbots (RAG + Fine-Tuned LLaMA-3 / GPT-4o)
- Computer Vision & Automated Visual Inspection
- High-Frequency Fraud & Anomaly Analytics
- Smart Inventory & Supply Chain Forecasting
- Private Cloud AI Infrastructure Deployment (AWS / Azure / On-Prem)

3. SECURITY & COMPLIANCE
- SOC 2 Type II Certified
- ISO 27001 Security Standard
- Full GDPR & HIPAA Data Governance
- Zero-Data Retention Model Options

Thank you for requesting our 2026 Enterprise Brochure!`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'NeuraFlow_AI_Enterprise_Brochure_2026.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-white/20 shadow-2xl relative bg-slate-900 overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {!isDownloaded ? (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-glow-primary">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">Executive Report</span>
                <h3 className="text-xl font-extrabold text-white font-heading">
                  Download 2026 AI Solutions Brochure
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              Get detailed architectural specs, enterprise benchmark comparisons, and ROI case studies across Healthcare, FinTech, Retail, and Manufacturing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Sarah Jenkins"
                  className="w-full px-4 py-3 bg-slate-950/90 border border-white/15 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@enterprise.com"
                  className="w-full px-4 py-3 bg-slate-950/90 border border-white/15 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Global Inc."
                  className="w-full px-4 py-3 bg-slate-950/90 border border-white/15 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-semibold text-sm shadow-glow-primary hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free PDF Whitepaper</span>
                </button>
              </div>
            </form>

            <div className="mt-4 flex items-center justify-center space-x-2 text-[11px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Confidential. Instant Download.</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-heading">Download Started!</h3>
            <p className="text-slate-300 text-sm mb-6">
              Thank you, {formData.name}. The 2026 NeuraFlow AI Enterprise PDF has been saved to your device.
            </p>
            <button
              onClick={() => {
                setIsDownloaded(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
