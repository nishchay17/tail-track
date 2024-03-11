import { z } from "zod";

const envVariables = z.object({
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  UPSTASH_REDIS_REST_URL: z.string(),
});

try {
  envVariables.parse(process.env);
} catch (error) {
  throw new Error("Env dont match schema, please check lib/env");
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
