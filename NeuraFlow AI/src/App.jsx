import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import CookieBanner from './components/CookieBanner';
import BrochureModal from './components/BrochureModal';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

import { ArrowUp, MessageSquareCode, Sparkles } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync page state with window location hash for deep-linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const validPages = ['home', 'about', 'services', 'portfolio', 'pricing', 'testimonials', 'blog', 'faq', 'contact', 'careers', 'privacy', 'terms', '404'];
        if (validPages.includes(hash)) {
          setActivePage(hash);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when activePage changes
  const handleSetActivePage = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={handleSetActivePage} onOpenBrochure={() => setIsBrochureOpen(true)} />;
      case 'about':
        return <AboutPage setActivePage={handleSetActivePage} />;
      case 'services':
        return <ServicesPage setActivePage={handleSetActivePage} />;
      case 'portfolio':
        return <PortfolioPage setActivePage={handleSetActivePage} />;
      case 'pricing':
        return <PricingPage setActivePage={handleSetActivePage} />;
      case 'testimonials':
        return <TestimonialsPage setActivePage={handleSetActivePage} />;
      case 'blog':
        return <BlogPage setActivePage={handleSetActivePage} />;
      case 'faq':
        return <FaqPage setActivePage={handleSetActivePage} />;
      case 'contact':
        return <ContactPage />;
      case 'careers':
        return <CareersPage />;
      case 'privacy':
        return <PrivacyPage setActivePage={handleSetActivePage} />;
      case 'terms':
        return <TermsPage setActivePage={handleSetActivePage} />;
      case '404':
        return <NotFoundPage setActivePage={handleSetActivePage} />;
      default:
        return <HomePage setActivePage={handleSetActivePage} onOpenBrochure={() => setIsBrochureOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col justify-between selection:bg-blue-600 selection:text-white bg-grid-pattern relative">
      
      {/* Background Ambient Spotlight Gradients */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Header Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handleSetActivePage}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenBrochure={() => setIsBrochureOpen(true)}
      />

      {/* Dynamic Main Page Content */}
      <main className="flex-grow z-10">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer setActivePage={handleSetActivePage} />

      {/* Interactive AI Chatbot Widget */}
      <ChatbotWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      {/* Brochure Download Modal */}
      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />

      {/* Cookie Consent Banner */}
      <CookieBanner onNavigate={handleSetActivePage} />

      {/* Floating Action Buttons (Back to Top & Quick Consultation) */}
      {showBackToTop && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-2">
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="p-3.5 rounded-full bg-slate-800/90 border border-white/20 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
}
