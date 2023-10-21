import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("Missing environment variable: DATABASE_URL");
}

const client = new Client({
  connectionString: DATABASE_URL,
});

await client.connect();

export const db = drizzle(client, { schema: schema });
