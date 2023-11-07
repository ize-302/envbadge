ALTER TABLE "projects" ADD COLUMN "custom_message" text DEFAULT 'You are viewing {{environment}} mode';--> statement-breakpoint
ALTER TABLE "environments" DROP COLUMN IF EXISTS "custom_message";