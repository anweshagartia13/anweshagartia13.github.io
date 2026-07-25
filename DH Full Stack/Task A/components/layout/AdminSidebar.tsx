"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Zap,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen border-r border-slate-800/80 bg-slate-950/90 backdrop-blur-xl transition-all duration-300 z-20 shrink-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top Header Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight text-base">LeadDesk</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                Admin Console
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2">
          {!collapsed && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Navigation
            </span>
          )}
        </div>

        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative",
                isActive
                  ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"
                )}
              />
              {!collapsed && <span>{item.name}</span>}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-slate-500" />
          {!collapsed && <span>Public Landing Page</span>}
        </Link>
      </div>
    </aside>
  );
}
