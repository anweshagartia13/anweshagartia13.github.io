import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import RoiCalculator from '../components/RoiCalculator';
import confetti from 'canvas-confetti';

export default function PricingPage({ setActivePage }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelectPlan = (planName) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Fallback
    }
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const plans = [
    {
      name: 'Starter',
      tagline: 'Ideal for scale-ups deploying their first production AI agent',
      monthlyPrice: '$2,999',
      annualPrice: '$2,399',
      popular: false,
      features: [
        'Up to 2 Custom AI Models / Agents',
        '100,000 Monthly API Requests included',
        'Standard 99.9% Uptime SLA',
        'RAG Vector DB Integration (Up to 1GB text)',
        'Standard Email & Ticket Support',
        'Shared Cloud Infrastructure'
      ],
      cta: 'Get Started with Starter'
    },
    {
      name: 'Professional',
      tagline: 'Built for growing enterprises demanding dedicated throughput & custom ML pipelines',
      monthlyPrice: '$7,499',
      annualPrice: '$5,999',
      popular: true,
      features: [
        'Up to 8 Custom AI Models / Agents',
        '1,000,000 Monthly API Requests included',
        'Guaranteed 99.95% Sub-30ms Latency SLA',
        'Dedicated Vector DB (Up to 50GB)',
        'Fine-Tuned LLM Model Weight Ownership',
        'SOC2 & GDPR Compliance Data Pipeline',
        '24/7 Priority Engineer Support',
        'Dedicated Private VPC Deployment'
      ],
      cta: 'Start Professional Plan'
    },
    {
      name: 'Enterprise',
      tagline: 'Unrestricted scale, custom hardware clusters, & dedicated AI research team',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      popular: false,
      features: [
        'Unlimited Custom AI Models & Agents',
        'Custom High-Frequency API Throughput',
        'Air-Gapped On-Premise / Hybrid Deployment',
        'Zero-Data Retention Contractual Guarantees',
        'Dedicated Principal AI Solutions Architect',
        'Custom CUDA / TensorRT Kernel Tuning',
        '24/7 Dedicated Slack Channel & Phone SLA',
        'Custom Employee AI Training Workshops'
      ],
      cta: 'Contact Executive Sales'
    }
  ];

  const comparison = [
    { feature: 'Custom Fine-Tuned Models', starter: '2 Models', pro: '8 Models', enterprise: 'Unlimited' },
    { feature: 'Monthly API Requests', starter: '100,000', pro: '1,000,000', enterprise: 'Custom Unlimited' },
    { feature: 'Inference Latency SLA', starter: '< 100ms', pro: '< 30ms Guaranteed', enterprise: '< 15ms Ultra-Low' },
    { feature: 'Data Privacy & SOC2', starter: 'Standard', pro: 'Dedicated VPC', enterprise: 'Air-Gapped On-Prem' },
    { feature: 'Model Weight Ownership', starter: 'Shared License', pro: 'Full IP Ownership', enterprise: 'Full IP Ownership' },
    { feature: 'Support SLA', starter: '24h Response', pro: '1h Priority SLA', enterprise: '15m Dedicated SLA' }
  ];

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
          Transparent Commercial Investment
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
          Flexible Pricing Plans
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Scale effortlessly with predictable monthly pricing or unlock 20% annual savings on enterprise AI deployments.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="pt-6 flex items-center justify-center space-x-4">
          <span className={`text-sm font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly Billing</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-16 h-9 rounded-full bg-slate-800 border border-white/20 p-1 flex items-center transition-colors relative"
          >
            <div className={`w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-md transform transition-transform ${
              isAnnual ? 'translate-x-7' : 'translate-x-0'
            }`} />
          </button>
          <span className={`text-sm font-semibold flex items-center space-x-1.5 ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
              Save 20%
            </span>
          </span>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-3xl p-8 border relative flex flex-col justify-between transition-all duration-300 ${
                plan.popular 
                  ? 'border-blue-500/60 shadow-glow-primary bg-slate-900/90 scale-105 z-10' 
                  : 'border-white/10 hover:border-white/20 bg-slate-900/60'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 text-white text-xs font-bold shadow-lg flex items-center space-x-1 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white font-heading mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-400 min-h-[36px] mb-6 leading-relaxed">{plan.tagline}</p>

                <div className="mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice !== 'Custom' && (
                    <span className="text-xs text-slate-400 ml-1">/ month {isAnnual ? '(billed annually)' : ''}</span>
                  )}
                </div>

                <div className="space-y-3 mb-8 text-xs text-slate-300">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-glow-primary hover:scale-[1.02]'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 bg-slate-900/80">
          <h3 className="text-2xl font-bold text-white font-heading mb-6 text-center">
            Detailed Feature Comparison Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-4 font-bold">Key Enterprise Features</th>
                  <th className="py-4 px-4 font-bold text-slate-300">Starter</th>
                  <th className="py-4 px-4 font-bold text-cyan-400">Professional</th>
                  <th className="py-4 px-4 font-bold text-purple-400">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-4 px-4 font-semibold text-white">{row.feature}</td>
                    <td className="py-4 px-4 text-slate-400">{row.starter}</td>
                    <td className="py-4 px-4 text-cyan-300 font-medium">{row.pro}</td>
                    <td className="py-4 px-4 text-purple-300 font-semibold">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <RoiCalculator />
      </section>

    </div>
  );
}
