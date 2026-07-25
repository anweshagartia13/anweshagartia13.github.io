import { z } from "zod";

export const BUDGET_OPTIONS = [
  "Under $500",
  "$500-$1000",
  "$1000-$5000",
  "Above $5000",
] as const;

export const STATUS_OPTIONS = ["NEW", "CONTACTED", "CLOSED"] as const;

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters long." })
    .max(100, { message: "Full Name cannot exceed 100 characters." }),
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email({ message: "Please enter a valid email address (e.g. name@company.com)." }),
  budget: z.enum(BUDGET_OPTIONS, {
    errorMap: () => ({ message: "Please select a budget range." }),
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),
});

export const updateLeadStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(STATUS_OPTIONS),
});

export type LeadFormData = z.infer<typeof leadSchema>;
export type UpdateLeadStatusData = z.infer<typeof updateLeadStatusSchema>;
