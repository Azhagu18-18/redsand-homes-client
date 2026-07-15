import { z } from "zod";

export const subscribeNewsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

export type SubscribeNewsletterInput = z.infer<
  typeof subscribeNewsletterSchema
>;