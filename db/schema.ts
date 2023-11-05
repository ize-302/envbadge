import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  user_id: text("user_id"),
  created_at: timestamp("created_at").defaultNow(),
  last_updated: timestamp("last_updated").defaultNow(),
});

export const environments = pgTable("environments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  project_id: uuid("project_id").notNull(),
  show_badge: boolean("show_badge").default(true),
  created_at: timestamp("created_at").defaultNow(),
  custom_message: text("custom_message").default(
    "You are viewing {{environment}} mode"
  ),
});

// interfaces
export interface IProject {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  last_updated: Date;
}

export interface IEnvironment {
  id: string;
  name: string;
  description: string;
  url: string;
  project_id: string;
  show_badge: boolean;
  created_at: Date;
}
