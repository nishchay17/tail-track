import { ZodError } from "zod";
import { requestBody } from "./schema";
import { parseZodError } from "./utils";

export async function validateAnalyticsBody(request: Request) {
  let body = null;
  try {
    body = await request.json();
  } catch (error) {
    throw new Error("Invalid request body");
  }
  if (!body) {
    throw new Error("Request body is empty");
  }
  try {
    return requestBody.parse(body);
  } catch (e) {
    throw new Error(parseZodError(e as ZodError<any>));
  }
}
