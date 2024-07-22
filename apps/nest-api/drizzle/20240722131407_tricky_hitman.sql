DO $$ BEGIN
 CREATE TYPE "public"."weekday" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservation" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"reservation_date" timestamp NOT NULL,
	CONSTRAINT "reservation_email_unique" UNIQUE("email")
);
