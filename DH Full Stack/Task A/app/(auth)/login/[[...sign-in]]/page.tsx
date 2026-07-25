import { SignIn } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-8 text-center space-y-2 z-10">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">
            LeadDesk <span className="text-indigo-400">Pro</span>
          </span>
        </Link>
        <p className="text-xs text-slate-400 font-medium">
          Enterprise Lead Capture & CRM Admin Authorization
        </p>
      </div>

      {/* Clerk Sign In Box */}
      <div className="z-10 bg-slate-900/90 border border-slate-800 rounded-3xl p-2 shadow-2xl shadow-indigo-950/40">
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
    </div>
  );
}
