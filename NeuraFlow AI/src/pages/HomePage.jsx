import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Bot, 
  Eye, 
  BarChart3, 
  Cpu, 
  Cloud, 
  Workflow, 
  Award, 
  Play, 
  X,
  Building2,
  TrendingUp,
  Star,
  Users
} from 'lucide-react';
import HeroAnimation from '../components/HeroAnimation';

export default function HomePage({ setActivePage, onOpenBrochure }) {
  const [typedText, setTypedText] = useState('');
  const fullText = "Transforming Businesses with Artificial Intelligence";
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  const partnerLogos = [
    { name: 'Apex Global', tier: 'Fortune 100' },
    { name: 'OmniHealth AI', tier: 'Healthcare' },
    { name: 'Horizon Financial', tier: 'FinTech' },
    { name: 'NextGen Retail', tier: 'E-Commerce' },
    { name: 'AgriTech One', tier: 'AgriTech' },
    { name: 'Starlight Cloud', tier: 'SaaS Leader' }
  ];

  const stats = [
    { value: '99.94%', label: 'Model Precision', desc: 'Verified across enterprise benchmarks' },
    { value: '$140M+', label: 'Client Cost Saved', desc: 'Generated through AI workflow automation' },
    { value: '450+', label: 'Custom AI Models', desc: 'Deployed across 18 industrial sectors' },
    { value: '2.4B+', label: 'Monthly API Requests', desc: 'Sub-30ms latency infrastructure' }
  ];

  const features = [
    {
      icon: Cpu,
      title: 'Proprietary Neural Engine',
      description: 'Custom Transformer architectures engineered specifically for low-latency inference and domain-specific decision making.'
    },
    {
      icon: ShieldCheck,
      title: 'Zero-Trust SOC2 Security',
      description: 'End-to-end encrypted model weights with strict zero-data retention policy ensuring your proprietary IP remains yours.'
    },
    {
      icon: Workflow,
      title: 'Autonomous Agent Pipelines',
      description: 'Multi-agent orchestration frameworks capable of resolving multi-step business logic without human intervention.'
    },
    {
      icon: Cloud,
      title: 'Hybrid Multi-Cloud Stack',
      description: 'Deploy on AWS, GCP, Azure, or air-gapped on-premise GPU clusters with automated auto-scaling.'
    },
    {
      icon: Zap,
      title: 'Sub-30ms Inference SLA',
      description: 'Optimized TensorRT and CUDA kernels tailored for real-time video processing, fraud detection, and streaming chatbots.'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Telemetry & Drift',
      description: 'Continuous model health diagnostics, automated data drift detection, and seamless zero-downtime retraining.'
    }
  ];

  const servicesPreview = [
    {
      title: 'AI Chatbots & Autonomous Agents',
      desc: 'Context-aware conversational agents with deep enterprise database integration.',
      icon: Bot,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Computer Vision & Visual Inspection',
      desc: 'Real-time object recognition, anomaly detection, and automated video analytics.',
      icon: Eye,
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Predictive Analytics & Forecasting',
      desc: 'Machine learning algorithms that forecast supply chain demand and financial risk.',
      icon: TrendingUp,
      color: 'from-cyan-600 to-blue-600'
    }
  ];

  const techStack = [
    'PyTorch', 'TensorFlow', 'OpenAI', 'Anthropic Claude', 'LangChain', 'Pinecone', 'CUDA', 'AWS SageMaker', 'Kubernetes', 'Docker'
  ];

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        
        {/* Glow Lights */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-glow-primary">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Next-Gen Enterprise AI Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading min-h-[120px] sm:min-h-[140px]">
              {typedText}
              <span className="inline-block w-1.5 h-10 bg-cyan-400 ml-1 animate-pulse" />
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              We help businesses automate operations, unlock hidden predictive insights, and scale 10x faster with cutting-edge custom AI solutions engineered for commercial dominance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-glow-primary hover:shadow-glow-secondary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-slate-100 font-bold text-sm border border-white/15 hover:border-cyan-500/40 transition-all flex items-center justify-center space-x-2"
              >
                <span>Book Free Consultation</span>
              </button>
            </div>

            {/* Micro Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 border-t border-white/10">
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Zero Data Training Lock</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>24/7 Enterprise SLA</span>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Animation */}
          <div className="lg:col-span-6 relative">
            <HeroAnimation />
          </div>

        </div>
      </section>

      {/* Trusted Companies Ribbon */}
      <section className="py-10 border-y border-white/10 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 font-heading">
            Trusted by Industry Pioneers & Enterprise Leaders Worldwide
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {partnerLogos.map((logo, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl glass-card border border-white/5 hover:border-blue-500/30 text-center transition-all duration-300 group"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Building2 className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <span className="font-extrabold text-sm text-slate-300 group-hover:text-white transition-colors font-heading">
                    {logo.name}
                  </span>
                </div>
                <span className="block text-[10px] text-slate-500 mt-1">{logo.tier}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-heading mb-2">
                {stat.value}
              </div>
              <h4 className="text-lg font-bold text-white mb-1 font-heading">{stat.label}</h4>
              <p className="text-xs text-slate-400">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
            Engineered for Commercial Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Why Enterprise Leaders Choose NeuraFlow AI
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From architecture design to production MLOps, we deliver secure, high-performance artificial intelligence tailored to your business objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 relative group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] mb-6 shadow-glow-primary group-hover:scale-110 transition-transform">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                    <IconComp className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-heading">{feat.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-slate-950/60 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Our Offerings</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-2">
                Turnkey Enterprise AI Services
              </h2>
            </div>
            <button
              onClick={() => {
                setActivePage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-sm font-semibold border border-cyan-500/30 flex items-center space-x-2 shrink-0"
            >
              <span>View All 8 Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesPreview.map((srv, idx) => {
              const IconComponent = srv.icon;
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${srv.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-heading">{srv.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{srv.desc}</p>
                  </div>
                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setActivePage('services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1.5"
                    >
                      <span>Learn Technical Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Technology Stack Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Enterprise Stack</span>
          <h2 className="text-3xl font-extrabold text-white font-heading mt-2">
            Built on Industry-Standard AI Frameworks
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="px-5 py-3 rounded-2xl bg-slate-900/90 border border-white/10 text-slate-200 text-sm font-semibold hover:border-cyan-500/40 hover:text-cyan-300 transition-all shadow-md"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories / Video Case Study Feature */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Star className="w-3.5 h-3.5 fill-emerald-400" />
                <span>Featured Enterprise Case Study</span>
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                How Apex Global Automated 84% of Claims Processing with NeuraFlow Agentic AI
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                "By deploying NeuraFlow AI’s custom fine-tuned visual and document extraction agents, our claim throughput time dropped from 4 days to under 12 minutes while cutting error rates by 99%."
              </p>

              <div className="flex items-center space-x-4 pt-2">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">Julian Drake</h4>
                  <p className="text-xs text-slate-400">Chief Technology Officer, Apex Financial</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 aspect-video bg-slate-950 flex items-center justify-center group cursor-pointer shadow-glow-primary"
                onClick={() => setVideoModalOpen(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-purple-900/60 group-hover:opacity-80 transition-opacity" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 text-white flex items-center justify-center shadow-glow-accent group-hover:scale-110 transition-transform relative z-10">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-slate-900/80 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">
                  Watch 2-Min Executive Demo
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* High Conversion Call To Action */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-10 sm:p-16 border border-white/20 text-center relative overflow-hidden bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-slate-900">
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
              Ready to Accelerate Your Enterprise with AI?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Book a 30-minute strategic consultation with our Principal AI Architects to receive your custom AI roadmap.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Free Consultation</span>
              </button>

              <button
                onClick={onOpenBrochure}
                className="px-8 py-4 rounded-2xl bg-slate-800 text-slate-100 hover:bg-slate-700 font-bold text-sm border border-white/15 transition-all"
              >
                Download PDF Whitepaper
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Mock Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-card rounded-3xl max-w-3xl w-full p-6 border border-white/20 shadow-2xl relative bg-slate-900">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white font-heading">Apex Global Case Study Breakdown</h3>
              <button onClick={() => setVideoModalOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video rounded-2xl bg-slate-950 border border-white/10 flex flex-col items-center justify-center text-center p-8">
              <Play className="w-12 h-12 text-cyan-400 animate-pulse mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">Simulated Video Player</h4>
              <p className="text-xs text-slate-400 max-w-md">
                Demonstrating 84% automated claims classification, real-time OCR extraction, and automated audit logging.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
