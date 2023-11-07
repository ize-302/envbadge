import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  user_id: text("user_id"),
  created_at: timestamp("created_at").defaultNow(),
  last_updated: timestamp("last_updated").defaultNow(),
  badge_style: text("badge_style").default("default"),
  badge_position: text("badge_position").default("bottom-left"),
  custom_message: text("custom_message").default(
    "You are viewing {{environment}} mode"
  ),
});

export const environments = pgTable("environments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  project_id: uuid("project_id").notNull(),
  show_badge: boolean("show_badge").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

// interfaces
export interface IProject {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  last_updated: Date;
  badge_style: string;
  badge_position: string;
  custom_message: string;
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
