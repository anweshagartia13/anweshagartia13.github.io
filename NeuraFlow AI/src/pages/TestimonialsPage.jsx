import React, { useState } from 'react';
import { Star, Quote, Building2, ShieldCheck, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';

export default function TestimonialsPage({ setActivePage }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Healthcare', 'FinTech', 'E-Commerce', 'SaaS', 'Logistics'];

  const testimonials = [
    {
      id: 1,
      name: 'Julian Drake',
      role: 'Chief Technology Officer',
      company: 'Apex Global Financial',
      category: 'FinTech',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'NeuraFlow AI transformed our claims auditing department. Their fine-tuned document extraction agents process multi-page financial policies in seconds with 99.4% accuracy. They are by far the best AI engineering team we have worked with.'
    },
    {
      id: 2,
      name: 'Dr. Marcus Vance',
      role: 'Chief Medical Information Officer',
      company: 'OmniHealth Hospital Systems',
      category: 'Healthcare',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'The 3D diagnostic vision assistance model built by NeuraFlow AI reduced our emergency scan triage backlog from 3 weeks to under 2 hours. Their strict adherence to HIPAA and zero-data retention made security compliance effortless.'
    },
    {
      id: 3,
      name: 'Samantha Sterling',
      role: 'VP of Global Supply Chain',
      company: 'NextGen Logistics',
      category: 'Logistics',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'We saved over $22M in warehouse carrying costs during our first year using NeuraFlow’s predictive inventory engine. Their real-time spatial analytics models operate seamlessly even during peak holiday surges.'
    },
    {
      id: 4,
      name: 'David Chen',
      role: 'Head of E-Commerce Growth',
      company: 'Starlight Digital Outlets',
      category: 'E-Commerce',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'Their autonomous agent chatbot handles 80% of our customer service inquiries instantly, boosting customer satisfaction scores to 4.9/5 while drastically lowering support agent burnout.'
    },
    {
      id: 5,
      name: 'Rachel Kincaid',
      role: 'VP of Product Engineering',
      company: 'Horizon Cloud Software',
      category: 'SaaS',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'NeuraFlow AI built custom vector database search pipelines for our enterprise platform in less than 3 weeks. Their sub-30ms latency SLA is unmatched in the industry.'
    },
    {
      id: 6,
      name: 'Robert Thorne',
      role: 'Director of Agronomy',
      company: 'AgriTech One Systems',
      category: 'Healthcare',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'Deploying edge computer vision models directly onto drone hardware seemed impossible until NeuraFlow AI stepped in. We achieved a 31% reduction in water usage across 250,000 acres.'
    }
  ];

  const filteredTestimonials = activeFilter === 'All'
    ? testimonials
    : testimonials.filter(t => t.category === activeFilter);

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
          Verified Enterprise Feedback
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
          Client Success & Testimonials
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Read how CTOs, VPs of Engineering, and Healthcare Directors rely on NeuraFlow AI to power their core business operations.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-glow-primary'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-blue-500/20 absolute top-6 right-6" />

              <div>
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center space-x-3">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">{item.name}</h4>
                  <span className="block text-[11px] text-cyan-400 font-medium">{item.role}</span>
                  <span className="block text-[10px] text-slate-400 flex items-center space-x-1 mt-0.5">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    <span>{item.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-center">
          <h3 className="text-2xl font-bold text-white font-heading mb-6">
            Enterprise Security & Compliance Certified
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
              <span className="font-bold text-xs text-white">SOC 2 Type II Certified</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="font-bold text-xs text-white">ISO 27001 Compliant</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-purple-400 mb-2" />
              <span className="font-bold text-xs text-white">GDPR & HIPAA Ready</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
              <Award className="w-8 h-8 text-amber-400 mb-2" />
              <span className="font-bold text-xs text-white">99.99% Uptime Guarantee</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
