// import "dotenv/config";
import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig("./");

export default {
  schema: "./app/database/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
