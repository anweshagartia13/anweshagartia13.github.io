import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles, 
  Moon, 
  Sun, 
  MessageSquareCode,
  Download,
  Briefcase
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenChat, onOpenBrochure }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 p-[2px] shadow-glow-primary group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                Neura<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Flow</span>
              </span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-md tracking-widest uppercase">
                AI
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-glow-primary' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenChat}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-300 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200 flex items-center space-x-1.5 text-xs font-medium"
              title="Launch NeuraBot AI Assistant"
            >
              <MessageSquareCode className="w-4 h-4 text-purple-400" />
              <span>Ask AI</span>
            </button>

            {/* Download Brochure Button */}
            <button
              onClick={onOpenBrochure}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-all duration-200 flex items-center space-x-1 text-xs font-medium"
              title="Download Enterprise Brochure"
            >
              <Download className="w-4 h-4 text-blue-400" />
            </button>

            {/* Book Free Consultation Primary Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-glow-primary hover:shadow-glow-secondary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group overflow-hidden"
            >
              <span className="relative flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                <span>Book Consultation</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

          </div>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 border border-white/10 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-slate-900/95 border-b border-white/10 backdrop-blur-xl p-6 shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-2 gap-2 mb-6">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-glow-primary' 
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
            <button
              onClick={() => { onOpenChat(); setIsMobileMenuOpen(false); }}
              className="w-full py-3 px-4 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 font-semibold flex items-center justify-center space-x-2 text-sm"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>Launch AI Chat Assistant</span>
            </button>

            <button
              onClick={() => { onOpenBrochure(); setIsMobileMenuOpen(false); }}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 border border-white/10 text-slate-200 font-semibold flex items-center justify-center space-x-2 text-sm"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Download PDF Brochure</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow-glow-primary flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
