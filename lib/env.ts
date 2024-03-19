import { z } from "zod";

const envVariables = z.object({
  NEXT_PUBLIC_APP_URL: z.string(),

  UPSTASH_REDIS_REST_TOKEN: z.string(),
  UPSTASH_REDIS_REST_URL: z.string(),

  POSTGRES_PRISMA_URL: z.string(),
  POSTGRES_URL: z.string(),
  POSTGRES_URL_NO_SSL: z.string(),
  POSTGRES_URL_NON_POOLING: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),

  NEXTAUTH_SECRET: z.string(),
  GITHUB_SECRET: z.string(),
  GITHUB_ID: z.string(),

  ADMIN_ID_ARRAY: z.string().optional(),
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
