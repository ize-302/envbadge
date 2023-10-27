import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name"),
  base_url: text("base_url"),
  user_id: text("user_id"),
  created_at: timestamp("created_at").defaultNow(),
  last_updated: timestamp("last_updated").defaultNow(),
});

export const environments = pgTable("environments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  project_id: integer("project_id").notNull(),
  show_badge: boolean("show_badge").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

// interfaces
export interface IProject {
  id: number;
  name: string;
  base_url: string;
  user_id: string;
  created_at: Date;
  last_updated: Date;
}

export interface IEnvironment {
  id: number;
  name: string;
  description: string;
  url: string;
  project_id: string;
  show_badge: boolean;
}
