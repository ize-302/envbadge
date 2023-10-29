import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("Missing environment variable: DATABASE_URL");
}

neonConfig.fetchConnectionCache = true;

const sql = neon(DATABASE_URL!);
export const db = drizzle(sql, { schema });
