import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  Calendar, 
  MessageSquare,
  Twitter,
  Linkedin,
  Github,
  Youtube
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: 'AI Chatbots & Autonomous Agents',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState('sf');

  const offices = [
    {
      id: 'sf',
      city: 'San Francisco (Global HQ)',
      address: '500 Howard Street, Suite 400, San Francisco, CA 94105',
      phone: '+1 (800) 555-NEURA',
      hours: 'Mon - Fri: 8:00 AM - 8:00 PM PST',
      mapQuery: 'San+Francisco+Howard+Street'
    },
    {
      id: 'london',
      city: 'London (EMEA HQ)',
      address: '25 Bank Street, Level 18, Canary Wharf, London E14 5JP',
      phone: '+44 (20) 7946-0912',
      hours: 'Mon - Fri: 8:00 AM - 6:00 PM GMT',
      mapQuery: 'Canary+Wharf+London'
    },
    {
      id: 'tokyo',
      city: 'Tokyo (APAC HQ)',
      address: 'Roppongi Hills Mori Tower 28F, Minato City, Tokyo 106-6108',
      phone: '+81 (3) 5555-0143',
      hours: 'Mon - Fri: 9:00 AM - 7:00 PM JST',
      mapQuery: 'Roppongi+Hills+Tokyo'
    },
    {
      id: 'singapore',
      city: 'Singapore (ASEAN Hub)',
      address: '1 Marina Boulevard, Level 20, One Marina Boulevard, Singapore 018989',
      phone: '+65 6789-0123',
      hours: 'Mon - Fri: 9:00 AM - 6:00 PM SGT',
      mapQuery: 'One+Marina+Boulevard+Singapore'
    }
  ];

  const currentOffice = offices.find(o => o.id === selectedOffice);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          Let's Build Together
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight">
          Book a Free Consultation
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Speak directly with our Principal AI Architects to evaluate your data requirements, model options, and receive a customized deployment roadmap.
        </p>
      </section>

      {/* Main Grid: Form + Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-12 border border-white/15 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-2xl relative">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white font-heading">Schedule Consultation</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Enterprise Corp"
                      className="w-full px-4 py-3 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Solution Interest</label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                  >
                    <option>AI Chatbots & Autonomous Agents</option>
                    <option>Custom Machine Learning Models</option>
                    <option>Computer Vision & Visual Analytics</option>
                    <option>Natural Language Processing (NLP)</option>
                    <option>Predictive Analytics & Forecasting</option>
                    <option>Business Process Automation</option>
                    <option>Strategic AI Consulting</option>
                    <option>Cloud AI & MLOps Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Scope & Details</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, data availability, and desired timeline..."
                    className="w-full px-4 py-3 bg-slate-950 border border-white/15 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm rounded-2xl shadow-glow-primary hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Consultation Request</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-extrabold text-white font-heading">Consultation Scheduled!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-cyan-300 font-semibold">{formData.fullName}</span>. One of our Principal AI Architects will review your inquiry and reach out within 2 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right: Global Locations & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Details Card */}
            <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6 bg-slate-900/80">
              <h3 className="text-xl font-bold text-white font-heading">Direct Contact Info</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start space-x-3 text-slate-300">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white">Business Email</span>
                    <span>contact@neuraflow.ai</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-300">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white">Telephone</span>
                    <span>+1 (800) 555-NEURA</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-300">
                  <Clock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white">Working Hours</span>
                    <span>Monday – Friday: 8:00 AM – 8:00 PM EST</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center space-x-3">
                <span className="text-xs text-slate-400 font-semibold">Social Networks:</span>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-cyan-400">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-blue-400">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Global Office Location Selector */}
            <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4 bg-slate-900/80">
              <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>Global Office Hubs</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {offices.map((office) => (
                  <button
                    key={office.id}
                    onClick={() => setSelectedOffice(office.id)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                      selectedOffice === office.id
                        ? 'bg-blue-600 text-white shadow-glow-primary'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {office.city.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 space-y-2 text-xs text-slate-300">
                <h4 className="font-bold text-white text-sm font-heading">{currentOffice.city}</h4>
                <p className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{currentOffice.address}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{currentOffice.phone}</span>
                </p>
              </div>

              {/* Google Maps Representation */}
              <div className="h-44 rounded-2xl overflow-hidden border border-white/10 relative bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2 animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white">{currentOffice.city} Office</span>
                <span className="text-[11px] text-slate-400 mt-1">Interactive Map Representation Active</span>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
