import React, { useState } from 'react';
import { 
  Cpu, 
  Mail, 
  Send, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  Github, 
  Twitter, 
  Linkedin, 
  Youtube, 
  CheckCircle2 
} from 'lucide-react';

export default function Footer({ setActivePage }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/10 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 mb-16 border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
                <Mail className="w-3.5 h-3.5" />
                <span>Stay Ahead in AI</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight mb-2">
                Subscribe to NeuraFlow AI Insights
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Get weekly research breakdowns, benchmark results, and tactical guides on enterprise AI deployment delivered directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="flex items-center space-x-3 p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl animate-in fade-in duration-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <p className="text-sm font-medium">Thank you for subscribing! Check your email for our latest AI playbook.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your business email"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-white/15 rounded-2xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm rounded-2xl shadow-glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
              <p className="text-[11px] text-slate-500 mt-2.5">
                No spam. Unsubscribe anytime. View our <button onClick={() => handleNavigate('privacy')} className="underline hover:text-slate-300">Privacy Policy</button>.
              </p>
            </div>

          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => handleNavigate('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white font-heading">
                Neura<span className="text-blue-500">Flow</span> AI
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Transforming Enterprises with Next-Generation Artificial Intelligence, Autonomous Agent Workflows, and Custom Predictive Systems.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>500 Howard Street, Suite 400, San Francisco, CA 94105</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>contact@neuraflow.ai</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>+1 (800) 555-NEURA</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-white/40 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {['home', 'about', 'services', 'portfolio', 'pricing', 'testimonials', 'careers'].map((page) => (
                <li key={page}>
                  <button 
                    onClick={() => handleNavigate(page)} 
                    className="hover:text-cyan-400 transition-colors flex items-center space-x-1 capitalize"
                  >
                    <span>{page}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => handleNavigate('services')} className="hover:text-blue-400 transition-colors">AI Chatbots & Agents</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-blue-400 transition-colors">Machine Learning Models</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-blue-400 transition-colors">Computer Vision Systems</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-blue-400 transition-colors">Natural Language Processing</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-blue-400 transition-colors">Predictive Analytics</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-blue-400 transition-colors">Cloud AI Orchestration</button></li>
            </ul>
          </div>

          {/* Column 4: Legal & Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Resources & Trust</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => handleNavigate('blog')} className="hover:text-cyan-400 transition-colors">AI Blog & Case Studies</button></li>
              <li><button onClick={() => handleNavigate('faq')} className="hover:text-cyan-400 transition-colors">Help Center & FAQ</button></li>
              <li><button onClick={() => handleNavigate('contact')} className="hover:text-cyan-400 transition-colors">Schedule AI Audit</button></li>
              <li><button onClick={() => handleNavigate('privacy')} className="hover:text-cyan-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => handleNavigate('terms')} className="hover:text-cyan-400 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => handleNavigate('404')} className="hover:text-cyan-400 transition-colors">System Diagnostics</button></li>
            </ul>

            <div className="pt-2">
              <div className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs flex items-center space-x-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SOC2 Type II & ISO27001 Certified Enterprise Infrastructure</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 NeuraFlow AI Technologies Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => handleNavigate('privacy')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <button onClick={() => handleNavigate('terms')} className="hover:text-slate-300 transition-colors">Terms of Service</button>
            <button onClick={() => handleNavigate('faq')} className="hover:text-slate-300 transition-colors">Security</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
