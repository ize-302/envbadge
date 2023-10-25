import type { Config } from "drizzle-kit";
const { DATABASE_URL } = process.env;

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: DATABASE_URL as string,
  },
} satisfies Config;
