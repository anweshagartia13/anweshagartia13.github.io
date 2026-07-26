import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight, CheckCircle, X, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  const jobs = [
    {
      id: 1,
      title: 'Principal AI Research Engineer',
      department: 'AI Core Lab',
      location: 'San Francisco, CA / Remote',
      type: 'Full-Time',
      salary: '$240,000 – $320,000 + Equity',
      desc: 'Lead the architectural design of sparse transformer quantization kernels and multi-agent consensus algorithms.',
      requirements: [
        'PhD or MS in CS, Artificial Intelligence, or Physics',
        '5+ years experience building PyTorch / CUDA custom kernels',
        'Demonstrated track record of NeurIPS, ICML, or ICLR publications'
      ]
    },
    {
      id: 2,
      title: 'Senior MLOps & Infrastructure Engineer',
      department: 'Platform Engineering',
      location: 'London, UK / Remote',
      type: 'Full-Time',
      salary: '£130,000 – £180,000 + Equity',
      desc: 'Architect high-throughput Kubernetes GPU clusters, Ray serving pipelines, and sub-30ms auto-scaling systems.',
      requirements: [
        'Expertise in Kubernetes, Ray Serve, Terraform, and AWS SageMaker',
        'Experience managing 100+ GPU nodes in production',
        'Deep understanding of model quantization (INT8 / INT4)'
      ]
    },
    {
      id: 3,
      title: 'Senior Full-Stack AI Engineer',
      department: 'Product Development',
      location: 'San Francisco, CA / Remote',
      type: 'Full-Time',
      salary: '$190,000 – $250,000 + Equity',
      desc: 'Build sleek, real-time React & TypeScript web interfaces, streaming WebSockets, and AI telemetry dashboards.',
      requirements: [
        '5+ years with React, Next.js, Node.js, and WebSockets',
        'Proven eye for Stripe/Linear/Vercel design aesthetic',
        'Experience building streaming chat & dashboard UIs'
      ]
    },
    {
      id: 4,
      title: 'Lead AI Product Designer (UI/UX)',
      department: 'Design',
      location: 'Remote Global',
      type: 'Full-Time',
      salary: '$160,000 – $210,000 + Equity',
      desc: 'Craft intuitive human-AI interactions, prompt workflow canvases, and glassmorphic enterprise design systems.',
      requirements: [
        'Mastery of Figma, micro-animations, and Tailwind design systems',
        'Strong portfolio showcasing SaaS dashboards & AI tools',
        'Passion for clean, minimal, futuristic aesthetics'
      ]
    }
  ];

  const handleApply = (e) => {
    e.preventDefault();
    setIsApplied(true);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}
  };

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold uppercase tracking-wider">
          Join Our Mission
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
          Careers at NeuraFlow AI
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          We are building the future of enterprise artificial intelligence. Work alongside world-class researchers and engineers.
        </p>
      </section>

      {/* Perks Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <h4 className="font-bold text-white text-lg font-heading mb-2">Unlimited Compute Access</h4>
            <p className="text-xs text-slate-300">Dedicated H100 and A100 GPU clusters for experimental research without budget constraints.</p>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <h4 className="font-bold text-white text-lg font-heading mb-2">Remote-First Culture</h4>
            <p className="text-xs text-slate-300">Work from anywhere in the world with flexible hours, home office stipends, and global retreats.</p>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <h4 className="font-bold text-white text-lg font-heading mb-2">Top Compensation & Equity</h4>
            <p className="text-xs text-slate-300">Top 1% market compensation, comprehensive healthcare, and generous early-stage equity grants.</p>
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h3 className="text-2xl font-bold text-white font-heading mb-8">Open Positions</h3>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-widest">
                  {job.department}
                </span>

                <h4 className="text-xl font-bold text-white font-heading">{job.title}</h4>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{job.type}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{job.salary}</span>
                  </span>
                </div>

                <p className="text-slate-300 text-xs pt-1">{job.desc}</p>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-glow-primary transition-all shrink-0 flex items-center space-x-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-white/20 shadow-2xl relative bg-slate-900 overflow-hidden">
            
            <button
              onClick={() => { setSelectedJob(null); setIsApplied(false); }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!isApplied ? (
              <form onSubmit={handleApply} className="space-y-4">
                <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-widest">{selectedJob.department}</span>
                <h3 className="text-2xl font-bold text-white font-heading">Apply for {selectedJob.title}</h3>
                
                <p className="text-xs text-slate-300 leading-relaxed">{selectedJob.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input type="text" required placeholder="Alex Mercer" className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input type="email" required placeholder="alex@domain.com" className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn or Portfolio URL</label>
                  <input type="url" required placeholder="https://linkedin.com/in/alexmercer" className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Why NeuraFlow AI?</label>
                  <textarea rows="3" required placeholder="Tell us about your AI research or engineering background..." className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-500 resize-none" />
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-glow-primary hover:scale-[1.01] transition-all flex items-center justify-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">Application Received!</h3>
                <p className="text-xs text-slate-300">Thank you for applying to NeuraFlow AI. Our recruiting team will review your profile and be in touch soon.</p>
                <button onClick={() => { setSelectedJob(null); setIsApplied(false); }} className="px-6 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold">Done</button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
