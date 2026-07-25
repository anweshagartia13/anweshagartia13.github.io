"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Activity,
  Settings,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    {
      name: "Lead Pipeline",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Analytics & ROI",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Activity & Audit Logs",
      href: "/admin/activity",
      icon: Activity,
    },
    {
      name: "CRM Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-extrabold text-white tracking-tight block leading-none">
              LeadDesk <span className="text-indigo-400">Pro</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mt-1">
              Enterprise CRM
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Management Console
        </p>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-md shadow-indigo-950/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
            </Link>
          );
        })}
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 rounded-xl border border-indigo-500/30",
              },
            }}
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">
              {user?.fullName || user?.primaryEmailAddress?.emailAddress || "Admin Console"}
            </p>
            <p className="text-[10px] text-indigo-400 font-mono font-medium truncate">
              System Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
