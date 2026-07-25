import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "blue" | "yellow" | "green" | "purple" | "outline" | "slate";
}

export function Badge({ className, variant = "slate", ...props }: BadgeProps) {
  const variants = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    yellow: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    outline: "border border-slate-700 text-slate-300",
    slate: "bg-slate-800/60 text-slate-300 border-slate-700/50",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-800/60", className)}
      {...props}
    />
  );
}
