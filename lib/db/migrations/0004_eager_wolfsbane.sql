CREATE TABLE IF NOT EXISTS "platforms" (
	"id" smallint PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"games_count" integer NOT NULL,
	"image_background" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "platforms" ("slug");