"use client";

import * as React from "react";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { AdminLoginForm } from "@/components/auth/AdminLoginForm";
import { ShieldCheck, UserCheck, KeyRound } from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = React.useState<"credentials" | "clerk">("credentials");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-6 text-center space-y-2 z-10">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">
            LeadDesk <span className="text-indigo-400">Pro</span>
          </span>
        </Link>
        <p className="text-xs text-slate-400 font-medium">
          Enterprise Lead Capture & Admin Authorization Console
        </p>
      </div>

      {/* Main Glassmorphic Login Container */}
      <div className="z-10 w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl space-y-6">
        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("credentials")}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === "credentials"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Admin UI Login</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("clerk")}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === "clerk"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Clerk OAuth SSO</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "credentials" ? (
          <AdminLoginForm />
        ) : (
          <div className="flex justify-center pt-2">
            <SignIn
              appearance={{
                elements: {
                  card: "bg-transparent shadow-none border-none",
                  headerTitle: "text-white font-bold",
                  headerSubtitle: "text-slate-400 text-xs",
                  socialButtonsBlockButton: "bg-slate-950 border border-slate-800 text-slate-200 hover:bg-slate-800",
                  formFieldLabel: "text-slate-300 text-xs font-semibold uppercase tracking-wider",
                  formFieldInput: "bg-slate-950 border border-slate-800 text-slate-100 rounded-xl focus:border-indigo-500",
                  formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/25",
                  footerActionLink: "text-indigo-400 hover:underline",
                },
              }}
              routing="path"
              path="/login"
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/admin"
            />
          </div>
        )}
      </div>

      {/* Footer Back Link */}
      <div className="mt-6 text-center z-10">
        <Link href="/" className="text-xs text-slate-400 hover:text-indigo-300 transition-colors font-medium">
          ← Back to LeadDesk Pro Landing Page
        </Link>
      </div>
    </div>
  );
}
