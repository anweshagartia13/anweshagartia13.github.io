"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Send, CheckCircle2, Sparkles } from "lucide-react";

import { leadSchema, LeadFormData, BUDGET_OPTIONS } from "@/lib/validations/lead";
import { createLeadAction } from "@/app/actions/lead-actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      budget: "$1000-$5000",
      message: "",
    },
  });

  const triggerConfetti = () => {
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } catch {
      console.log("Confetti trigger fallback");
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const res = await createLeadAction(data);

      if (res.success) {
        toast.success("Lead Submitted Successfully!", {
          description: "Thank you for reaching out. We will get back to you within 2 hours.",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
        });
        triggerConfetti();
        reset();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error("Submission Failed", {
          description: res.error || "Please check your inputs and try again.",
        });
      }
    } catch {
      toast.error("An unexpected error occurred", {
        description: "Please try submitting the form again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/40">
      {/* Decorative Top Ambient Light */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-indigo-500/15 blur-3xl pointer-events-none rounded-full" />

      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get Started Today</span>
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Request a Personalized Demo</h3>
        <p className="text-sm text-slate-400 mt-1">
          Fill out the lead form below to talk with our team and receive a instant workflow preview.
        </p>
      </div>

      {isSubmitted && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold text-emerald-200">Thank you! Lead capture confirmed.</p>
            <p className="text-emerald-400/80">Our sales engineering team is reviewing your project details.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <Input
          label="Full Name"
          placeholder="e.g. Sarah Jenkins"
          {...register("name")}
          error={errors.name?.message}
          disabled={isSubmitting}
        />

        {/* Email Address */}
        <Input
          label="Work Email Address"
          type="email"
          placeholder="s.jenkins@company.com"
          {...register("email")}
          error={errors.email?.message}
          disabled={isSubmitting}
        />

        {/* Budget Dropdown */}
        <div className="w-full space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Project Budget Range
          </label>
          <select
            {...register("budget")}
            disabled={isSubmitting}
            className="flex h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
                {opt}
              </option>
            ))}
          </select>
          {errors.budget?.message && (
            <p className="text-xs text-rose-400 font-medium">{errors.budget.message}</p>
          )}
        </div>

        {/* Message */}
        <Textarea
          label="Project Details & Requirements"
          placeholder="Tell us about your team size, workflow requirements, or current CRM pain points..."
          {...register("message")}
          error={errors.message?.message}
          disabled={isSubmitting}
          rows={4}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full mt-2"
        >
          <Send className="w-4 h-4" />
          <span>Submit Lead Request</span>
        </Button>
      </form>
    </div>
  );
}
