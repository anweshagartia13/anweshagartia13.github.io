"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h1 className="text-3xl font-extrabold text-white tracking-tight">Something went wrong!</h1>
      <p className="text-sm text-slate-400 max-w-md mt-2 mb-8 leading-relaxed">
        An unhandled error occurred while processing your request. Please try resetting the component session.
      </p>

      <Button variant="primary" size="lg" onClick={() => reset()}>
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}
