CREATE TABLE IF NOT EXISTS "environments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"url" text NOT NULL,
	"project_id" text NOT NULL,
	"show_badge" boolean DEFAULT true
);
