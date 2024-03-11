import { z } from "zod";

export const requestBody = z.object({
  namespace: z.string().trim().min(1),
  meta: z.any().optional(),
});

export type RequestBody = z.infer<typeof requestBody>;
