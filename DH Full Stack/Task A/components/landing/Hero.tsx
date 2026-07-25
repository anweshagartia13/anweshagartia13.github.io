"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden glow-gradient bg-grid-pattern">
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[200px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg shadow-indigo-950/40"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next-Gen Lead Capture & SaaS Pipeline Engine</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Capture Leads. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">
              Track Customers.
            </span>{" "}
            <br />
            Close Deals Faster.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Streamline your lead acquisition funnel with real-time Zod validation, instant Resend email notifications, live status toggling, and interactive analytics.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a href="#contact">
              <Button size="lg" variant="primary" className="w-full sm:w-auto px-8 text-base shadow-xl shadow-indigo-600/30">
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 text-base border-slate-700 bg-slate-900/60 hover:bg-slate-800">
                <span>View Admin Dashboard</span>
              </Button>
            </Link>
          </motion.div>

          {/* Animated Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-extrabold text-white">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
                <span>1200+</span>
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                Leads Managed
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-extrabold text-white">
                <Award className="w-6 h-6 text-emerald-400" />
                <span>98%</span>
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                Customer Satisfaction
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-extrabold text-white">
                <Users className="w-6 h-6 text-purple-400" />
                <span>50+</span>
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                Active Businesses
              </p>
            </div>
          </motion.div>
        </div>

        {/* CRM Dashboard Preview Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 relative max-w-5xl mx-auto rounded-3xl border border-slate-800/80 bg-slate-900/90 shadow-2xl shadow-indigo-950/60 overflow-hidden p-3 sm:p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800 mb-3 bg-slate-950/60 rounded-xl">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-slate-500 font-mono ml-2">leaddesk.app/admin</span>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total Leads</span>
                <p className="text-lg font-bold text-white mt-0.5">1,248</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-blue-400 font-bold uppercase">New Leads</span>
                <p className="text-lg font-bold text-blue-400 mt-0.5">342</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-amber-400 font-bold uppercase">Contacted</span>
                <p className="text-lg font-bold text-amber-400 mt-0.5">519</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-emerald-400 font-bold uppercase">Closed Deals</span>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">387</p>
              </div>
            </div>

            <div className="h-28 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900 border border-slate-800/80 p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Live Conversion Pipeline
                </span>
                <p className="text-sm font-medium text-slate-200">
                  +28.4% growth in qualification rate this month
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-400 font-semibold">API Sync Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
