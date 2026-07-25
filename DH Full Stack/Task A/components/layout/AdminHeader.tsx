"use client";

import * as React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ShieldCheck, User } from "lucide-react";

export function AdminHeader() {
  const { user, isLoaded } = useUser();

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 flex items-center justify-between z-10 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Authenticated</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* Clerk Auth User Button or Fallback Profile */}
        {isLoaded && user ? (
          <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-lg border border-slate-700",
                },
              }}
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-white">
                {user.fullName || user.username || "Admin User"}
              </span>
              <span className="text-[10px] text-slate-400">
                {user.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-white">Senior Sales Engineer</span>
              <span className="text-[10px] text-emerald-400 font-medium">Demo Security Session</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
