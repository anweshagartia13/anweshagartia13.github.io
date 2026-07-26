import React from 'react';
import { 
  Target, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Award, 
  Users, 
  Linkedin, 
  Twitter, 
  Github, 
  CheckCircle2, 
  Building, 
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AboutPage({ setActivePage }) {
  const values = [
    {
      icon: Target,
      title: 'Engineering Rigor',
      description: 'We do not build hype. Every model architecture is subjected to empirical validation, stress tests, and statistical benchmarks before commercial deployment.'
    },
    {
      icon: ShieldCheck,
      title: 'Zero-Trust Privacy',
      description: 'Your data belongs strictly to you. We strictly enforce zero-retention policies, differential privacy, and isolated VPC model weight deployment.'
    },
    {
      icon: Zap,
      title: 'High Velocity Execution',
      description: 'From architecture design to production PoC in 3 weeks. We eliminate bureaucratic overhead so your enterprise captures immediate first-mover advantage.'
    },
    {
      icon: Compass,
      title: 'Ethical Transparency',
      description: 'Full explainability and auditability for every algorithmic decision, eliminating bias and complying with international AI governance frameworks.'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Foundation in San Francisco',
      desc: 'Founded by Stanford AI researchers and former Google DeepMind engineers focused on high-throughput transformer optimization.'
    },
    {
      year: '2022',
      title: 'Series A & First 100M Inferences',
      desc: 'Secured $28M Series A funding and scaled proprietary inference engine to process 100 million requests monthly for Fortune 500 partners.'
    },
    {
      year: '2024',
      title: 'Agentic Workflow Breakthrough',
      desc: 'Released NeuraAgentic framework, enabling multi-step autonomous decision making with 99.9% reliability across complex enterprise databases.'
    },
    {
      year: '2026',
      title: 'Global Expansion & 450+ Models',
      desc: 'Expanded offices to London, Tokyo, and Singapore with over 450 enterprise AI deployments generating $140M+ in verified client ROI.'
    }
  ];

  const team = [
    {
      name: 'Dr. Elena Rostova',
      role: 'Co-Founder & Chief Executive Officer',
      bio: 'Ex-Google DeepMind Principal Researcher, PhD Computer Science Stanford. Pioneer in sparse transformer optimization.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Marcus Vance',
      role: 'Co-Founder & Chief Technology Officer',
      bio: 'Former VP Infrastructure at Stripe, M.S. Computer Engineering MIT. Scaled global distributed real-time systems to 5B+ daily calls.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      socials: { linkedin: '#', twitter: '#', github: '#' }
    },
    {
      name: 'Dr. Aris Thorne',
      role: 'VP of AI Research & Alignment',
      bio: 'Former Research Fellow at OpenAI, PhD Applied Physics Harvard. Specialist in automated alignment, safety, and reinforcement learning.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      socials: { linkedin: '#', github: '#' }
    },
    {
      name: 'Sophia Chen',
      role: 'VP of Product & Enterprise Growth',
      bio: 'Ex-Senior Product Lead at Vercel. Led product growth for developer ecosystems scaling from $10M to $150M ARR.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      socials: { linkedin: '#', twitter: '#' }
    }
  ];

  const achievements = [
    { label: 'Gartner Cool Vendor in AI', year: '2025' },
    { label: 'Forbes Cloud 100 Rising Star', year: '2025' },
    { label: 'SOC2 Type II & ISO 27001 Certified', year: 'Annual' },
    { label: '#1 Benchmark in Medical Image Accuracy', year: '2026' }
  ];

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold uppercase tracking-wider">
          Pioneering Human-Centric AI
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
          About NeuraFlow AI
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          We bridge the gap between academic AI research and real-world commercial impact. Our mission is to empower global organizations to build, deploy, and scale intelligent systems securely.
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-heading">Our Mission</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To democratize state-of-the-art artificial intelligence for enterprise organizations, creating autonomous workflows that eliminate friction, protect privacy, and multiply operational throughput tenfold.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-heading">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              A future where every enterprise operates with an intelligent digital nervous system—seamlessly predicting market shifts, assisting human experts, and operating with zero operational friction.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Guiding Philosophy</span>
          <h2 className="text-3xl font-extrabold text-white font-heading">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const IconC = val.icon;
            return (
              <div key={idx} className="glass-card glass-card-hover rounded-3xl p-6 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 border border-white/10 flex items-center justify-center mb-4">
                  <IconC className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">{val.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Company Timeline */}
      <section className="py-20 bg-slate-950/60 border-y border-white/10 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Our Journey</span>
            <h2 className="text-3xl font-extrabold text-white font-heading">Interactive Company Timeline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {timeline.map((item, idx) => (
              <div key={idx} className="glass-card rounded-3xl p-6 border border-white/10 relative flex flex-col justify-between">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-heading mb-3">
                  {item.year}
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-heading">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Meet the Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">World-Class Talent</span>
          <h2 className="text-3xl font-extrabold text-white font-heading">Meet Our Executive Leadership</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 group">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              <div className="p-6 space-y-2">
                <h4 className="text-lg font-bold text-white font-heading">{member.name}</h4>
                <span className="block text-xs font-semibold text-cyan-400">{member.role}</span>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">{member.bio}</p>

                <div className="flex items-center space-x-3 pt-3">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="text-slate-400 hover:text-blue-400">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} className="text-slate-400 hover:text-cyan-400">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} className="text-slate-400 hover:text-white">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements & Awards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Industry Recognition</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
                Recognized for Breakthrough Innovation
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              {achievements.map((ach, idx) => (
                <div key={idx} className="p-4 bg-slate-950/80 rounded-2xl border border-white/10">
                  <span className="block text-xs text-slate-400">{ach.year}</span>
                  <span className="font-bold text-sm text-white font-heading">{ach.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
