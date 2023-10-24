import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name"),
  base_url: text("base_url"),
  user_id: text("user_id"),
});
