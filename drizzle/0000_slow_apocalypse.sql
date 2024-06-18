DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'manager', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(30) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"surname" varchar(30) NOT NULL,
	"ban" boolean DEFAULT false NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL
);
