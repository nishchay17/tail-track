import { ZodError } from "zod";

export type ErrorResult = { error: true; message: string };
export type SuccessResult<T> = { error: false; data: T; message?: string };

export function getErrorResult(message: string): ErrorResult {
  return { error: true, message };
}

export function getSuccessResult<T>({
  data,
  message,
}: {
  data: T;
  message?: string;
}): SuccessResult<T> {
  return { error: false, data, message };
}

export function handleParseError(error: any) {
  if (!(error as ZodError).isEmpty) {
    console.log((error as ZodError).flatten().fieldErrors);
    return getErrorResult(
      Object.values((error as ZodError).flatten().fieldErrors).join(", ")
    );
  }
  return getErrorResult("Something went wrong");
}
export function handleDbError(error: any) {
  return getErrorResult(error.message);
}
