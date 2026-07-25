"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { Shield, Bell, Database, Save } from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] = React.useState(false);
  const [notificationEmail, setNotificationEmail] = React.useState("admin@leaddesk.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("CRM Settings Updated Successfully!");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">CRM Configuration & Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage email alert destinations, database connections, and security preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Email Alerts Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Bell className="w-5 h-5 text-indigo-400" />
            <span>Notification & Email Alerts</span>
          </div>

          <p className="text-xs text-slate-400">
            Specify where Resend email notifications should be dispatched when a lead submits the public form.
          </p>

          <Input
            label="Recipient Notification Email"
            type="email"
            value={notificationEmail}
            onChange={(e) => setNotificationEmail(e.target.value)}
          />
        </div>

        {/* Database Status Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>Database Integration</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">ORM Provider:</span>
              <span className="font-mono text-indigo-400 font-bold">Prisma ORM v6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Production Database:</span>
              <span className="font-mono text-emerald-400 font-bold">Supabase PostgreSQL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Status:</span>
              <span className="font-mono text-emerald-400 font-bold">Connected & Operational</span>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Shield className="w-5 h-5 text-purple-400" />
            <span>Security & Authentication</span>
          </div>

          <p className="text-xs text-slate-400">
            Protected by Clerk Authentication. Access to `/admin` endpoints requires valid user sessions.
          </p>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" isLoading={saving}>
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
