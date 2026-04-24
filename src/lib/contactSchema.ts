/** Contact schema: shared validation for client + server to prevent bad submissions. */
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number.")
    .max(20, "Phone number is too long."),
  email: z.string().email("Please enter a valid email.").optional().or(z.literal("")),
  subject: z.string().min(2, "Please add a short subject.").max(80),
  message: z.string().min(10, "Please add a short message.").max(1200),
  preferredTime: z.string().optional().or(z.literal("")),
  // Honeypot: bots will often fill hidden fields; humans won’t.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactPayload = z.infer<typeof contactSchema>;

