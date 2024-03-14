import { z } from "zod";

export const requestBody = z.object({
  namespace: z.string().trim().min(1),
  meta: z.any().optional(),
});
export type RequestBody = z.infer<typeof requestBody>;

export const apiTokenFormSchema = z.object({
  name: z.string().min(2).max(50),
});
export type apiTokenFormType = z.infer<typeof apiTokenFormSchema>;
