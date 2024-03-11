import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const config = {
  schema: "./lib/db/schema/*",
  out: "./lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL,
  },
  breakpoints: true,
};

export default config;
