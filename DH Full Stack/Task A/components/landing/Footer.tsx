"use client";

import * as React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">LeadDesk Mini</span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Production-quality lead capture and CRM pipeline platform. Built with Next.js 15, React 19, TypeScript, Prisma ORM, Supabase PostgreSQL, Clerk Auth, and TailwindCSS.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Lead Capture Form
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Next.js 15
                </a>
              </li>
              <li>
                <a href="https://prisma.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Prisma ORM
                </a>
              </li>
              <li>
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Supabase DB
                </a>
              </li>
              <li>
                <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Clerk Authentication
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Mandatory Requirement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} LeadDesk Mini SaaS. All rights reserved.</p>

          {/* REQUIRED CREDIT LINE */}
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            <span>Built for</span>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Digital Heroes Training Task
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
