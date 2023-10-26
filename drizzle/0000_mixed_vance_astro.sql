CREATE TABLE IF NOT EXISTS "environments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"url" text NOT NULL,
	"project_id" integer NOT NULL,
	"show_badge" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"base_url" text,
	"user_id" text,
	"created_at" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now()
);
