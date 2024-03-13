import { z } from "zod";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDate(offset: number = 0) {
  const dateXDaysAgo = subDays(new Date(), offset);
  return format(dateXDaysAgo, "dd/MM/yyyy");
}

export function parseZodError(error: z.ZodError) {
  return error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");
}

export function waitFor(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function retry(
  promise: () => Promise<any>,
  maxRetries: number = 3,
  onRetry: (e: Error) => Boolean = () => true
) {
  async function retryWithBackoff(retries: number): Promise<any> {
    try {
      if (retries > 0) {
        const timeToWait = 2 ** retries * 100;
        await waitFor(timeToWait);
      }
      return await promise();
    } catch (e) {
      if (retries < maxRetries) {
        const keepRetry = onRetry(e as Error);
        if (!keepRetry) throw e;
        return retryWithBackoff(retries + 1);
      } else {
        throw e;
      }
    }
  }
  return retryWithBackoff(0);
}
