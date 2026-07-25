"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { loginAdminAction } from "@/app/actions/auth-actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { Lock, User, Eye, EyeOff, LogIn, KeyRound, Sparkles } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleFillDemo = () => {
    setUsername("admin@leaddesk.pro");
    setPassword("DemoPassword123!");
    toast.info("Auto-filled demo credentials!", {
      description: "Click 'Sign In as Admin' to authenticate.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Missing Credentials", {
        description: "Please enter both username and password.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await loginAdminAction({
        usernameOrEmail: username,
        password,
      });

      if (res.success) {
        toast.success("Admin Authentication Successful!", {
          description: "Redirecting to Admin Command Center...",
        });
        router.push("/admin");
        router.refresh();
      } else {
        toast.error("Authentication Failed", {
          description: res.error || "Invalid username or password.",
        });
      }
    } catch {
      toast.error("Connection Error", {
        description: "Failed to connect to authentication service.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Demo Credentials Quick Banner */}
      <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-indigo-400 shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-white block">Demo Admin Credentials</span>
            <span className="text-indigo-400/90 font-mono text-[11px]">
              admin@leaddesk.pro / DemoPassword123!
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shrink-0 transition-colors inline-flex items-center gap-1 shadow-md shadow-indigo-600/30"
        >
          <Sparkles className="w-3 h-3" />
          <span>Auto Fill</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username / Admin Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Username or Admin Email
          </label>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <Input
              type="text"
              placeholder="e.g. admin@leaddesk.pro or admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              className="pl-10 w-full"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Admin Secret Password
          </label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="pl-10 pr-10 w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/25"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In as Admin</span>
        </Button>
      </form>
    </div>
  );
}
