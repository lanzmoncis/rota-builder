import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "label must be at least 1 character.",
  }),
  jobTitle: z.string().min(1, {
    message: "Job title must be at least 1 character",
  }),
  dateStarted: z.date({
    required_error: "Please select a date",
  }),
  payrollId: z.string().min(4, {
    message: "Payroll ID must be at least 4 characters",
  }),
  hourlyRate: z.string(),
});
