import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 bg-grid-pattern text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
        <Compass className="w-8 h-8 animate-spin" />
      </div>

      <h1 className="text-6xl font-extrabold text-white tracking-tight">404</h1>
      <h2 className="text-xl font-semibold text-indigo-300 mt-2">Page Not Found</h2>
      <p className="text-sm text-slate-400 max-w-md mt-2 mb-8 leading-relaxed">
        The requested URL does not exist or might have been relocated within the LeadDesk Mini application.
      </p>

      <Link href="/">
        <Button variant="primary" size="lg">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Button>
      </Link>
    </div>
  );
}
