import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, ShieldCheck, Zap, MessageSquare, ArrowRight } from 'lucide-react';

export default function FaqPage({ setActivePage }) {
  const [openIdx, setOpenIdx] = useState(0); // Open first by default
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Security & Privacy', 'Deployment & SLA', 'Pricing & IP', 'Integrations'];

  const faqs = [
    {
      question: 'What makes NeuraFlow AI different from generic AI wrappers?',
      answer: 'Unlike basic API wrappers, NeuraFlow AI engineers proprietary low-latency Transformer architectures, custom CUDA kernel optimizations, and dedicated multi-agent orchestration frameworks. We fine-tune model weights directly on your domain data within isolated VPC environments, ensuring superior accuracy, lower latency, and 100% IP ownership.',
      category: 'Deployment & SLA'
    },
    {
      question: 'How do you guarantee data security and zero retention for enterprise IP?',
      answer: 'Security is embedded into every layer of our infrastructure. We offer SOC2 Type II and ISO 27001 certified environments with optional contractual Zero-Data Retention policies. Your training data and model weights are never stored on public nodes or used to train third-party models.',
      category: 'Security & Privacy'
    },
    {
      question: 'What is the typical timeframe from initial consultation to production deployment?',
      answer: 'Our streamlined engineering lifecycle delivers a working Proof of Concept (PoC) in 2 to 3 weeks. Full production integration, including load balancing, MLOps telemetry, and enterprise API connections, typically completes within 4 to 6 weeks.',
      category: 'Deployment & SLA'
    },
    {
      question: 'Can NeuraFlow AI models be deployed on-premise in air-gapped environments?',
      answer: 'Yes. For defense, healthcare, and high-security financial clients, we provide containerized Kubernetes deployments (via Helm charts) ready for air-gapped on-premise GPU clusters or private clouds (AWS GovCloud, Azure Confidential Computing).',
      category: 'Security & Privacy'
    },
    {
      question: 'How does pricing work, and are there hidden API execution costs?',
      answer: 'We believe in transparent, predictable commercial terms. Starter plans begin at $2,999/mo, Professional at $7,499/mo, and Enterprise tiers are customized based on GPU cluster requirements. All plans include generous monthly API request allowances with zero surprise overage fees.',
      category: 'Pricing & IP'
    },
    {
      question: 'What SLA latency guarantees do you offer for real-time applications?',
      answer: 'Our standard enterprise SLA guarantees 99.95% infrastructure uptime with sub-30ms inference latency for conversational streaming and real-time vision analytics. Ultra-low sub-15ms SLAs are available for financial fraud detection.',
      category: 'Deployment & SLA'
    },
    {
      question: 'Do we retain 100% intellectual property ownership of fine-tuned model weights?',
      answer: 'Absoluted. Under our Professional and Enterprise agreements, your organization retains exclusive, unencumbered ownership of all fine-tuned model checkpoints, training datasets, and custom agent weights.',
      category: 'Pricing & IP'
    },
    {
      question: 'How do your autonomous agents handle system exceptions or complex edge cases?',
      answer: 'NeuraFlow Agentic framework incorporates automated Human-in-the-Loop (HITL) routing. When confidence scores fall below configurable thresholds, the agent gracefully escalates the case to designated human operators while logging the interaction for continuous retraining.',
      category: 'Integrations'
    },
    {
      question: 'Can NeuraFlow AI integrate with legacy ERPs like SAP, Oracle, and Salesforce?',
      answer: 'Yes. Our integration team builds custom OpenAPI and GraphQL connectors compatible with SAP S/4HANA, Oracle Cloud, Salesforce, Workday, Snowflake, and proprietary SQL databases.',
      category: 'Integrations'
    },
    {
      question: 'What compliance standards do you adhere to (SOC2, ISO, GDPR, HIPAA)?',
      answer: 'NeuraFlow AI maintains full compliance with SOC 2 Type II, ISO 27001, GDPR, CCPA, and HIPAA regulations. We perform biannual third-party penetration testing and provide detailed compliance documentation upon request.',
      category: 'Security & Privacy'
    },
    {
      question: 'How do you prevent model drift and maintain accuracy over time?',
      answer: 'Our MLOps dashboard includes continuous drift detection telemetry that monitors input feature distributions, latent embeddings, and confidence scores. If data drift is detected, automated shadow retraining pipelines initiate automatically.',
      category: 'Deployment & SLA'
    },
    {
      question: 'What support channels are available during and after deployment?',
      answer: 'Starter plans include 24-hour email/ticket SLA. Professional plans include 24/7 1-hour priority SLA. Enterprise plans feature a dedicated Slack/Teams connect channel with 15-minute emergency response SLAs.',
      category: 'Deployment & SLA'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
          Got Questions? We Have Answers.
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about NeuraFlow AI platform architecture, security, SLAs, pricing, and IP ownership.
        </p>

        {/* Search Input */}
        <div className="max-w-xl mx-auto pt-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by keyword (e.g., SOC2, SLA, Pricing, On-Premise)..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-white/15 rounded-2xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-glow-primary'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion FAQ List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 bg-slate-900/80"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-white text-base sm:text-lg font-heading">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl bg-slate-800 text-cyan-400 border border-white/10 shrink-0 transform transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-blue-600 text-white' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 bg-slate-950/40 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Support CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 text-center border border-white/15 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <h3 className="text-2xl font-bold text-white font-heading mb-2">Still Have Questions?</h3>
          <p className="text-slate-300 text-sm mb-6">Our AI Architects are ready to discuss your specific infrastructure requirement.</p>
          <button
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-glow-primary hover:scale-[1.02] transition-all inline-flex items-center space-x-2"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
