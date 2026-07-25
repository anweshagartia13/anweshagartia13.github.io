"use client";

import * as React from "react";
import Link from "next/link";
import { Zap, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            LeadDesk <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Mini</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="hover:text-white transition-colors">
            Testimonials
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              Admin Login
            </Button>
          </Link>
          <a href="#contact">
            <Button variant="primary" size="sm" className="gap-1.5">
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-slate-300 hover:bg-slate-900"
            aria-label="Toggle Mobile Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
          >
            Contact
          </a>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link href="/admin" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Admin Dashboard
              </Button>
            </Link>
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Get Started Now
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
