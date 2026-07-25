"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { logoutAdminAction } from "@/app/actions/auth-actions";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { toast } from "sonner";
import {
  Bell,
  ShieldCheck,
  Search,
  ExternalLink,
  LogOut,
  User,
} from "lucide-react";

export function AdminHeader() {
  const router = useRouter();
  const { user } = useUser();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleCustomLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutAdminAction();
      toast.success("Logged out successfully.");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="h-16 bg-slate-950/90 border-b border-slate-800 sticky top-0 z-20 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
      {/* Mobile Brand / Left Header */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">LeadDesk Pro</span>
        </Link>

        {/* Global Quick Search Shortcut indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
          <Search className="w-3.5 h-3.5" />
          <span>Quick Admin Search...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800 ml-2">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Public Site Button */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell */}
        <button
          title="Notifications"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
        </button>

        <div className="h-6 w-px bg-slate-800 mx-1" />

        {/* User Button / Custom Admin Logout */}
        <div className="flex items-center gap-2">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Admin User</span>
              </div>
            </div>
          )}

          <button
            onClick={handleCustomLogout}
            disabled={loggingOut}
            title="Sign Out of Admin Console"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
