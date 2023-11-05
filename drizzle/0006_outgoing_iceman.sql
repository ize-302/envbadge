ALTER TABLE "environments" ALTER COLUMN "description" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "environments" ADD COLUMN "custom_message" text DEFAULT 'You are viewing {{environment}} mode';