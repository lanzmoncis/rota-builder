import * as z from "zod";

export const EmployeeFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
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
  hourlyRate: z.string().min(1, {
    message: "Rate must be at least 1",
  }),
});

export const AddShiftFormSchema = z.object({
  department: z.string().min(1, {
    message: "Department must be at least 1 character.",
  }),
  shiftTime: z.string().min(1, {
    message: "Shift time must be at least 1 character.",
  }),
});
