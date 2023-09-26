CREATE TABLE IF NOT EXISTS "games" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"released_at" date NOT NULL,
	"background_image" text NOT NULL,
	"rating" numeric(3, 2) NOT NULL,
	"rating_top" smallint NOT NULL,
	"ratings_count" integer NOT NULL,
	"metacritic" integer NOT NULL,
	"playtime" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games_to_genres" (
	"game_id" uuid NOT NULL,
	"genre_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "genres" (
	"id" smallint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"games_count" integer NOT NULL,
	"image_background" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "games" ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "games_to_genres" ("game_id","genre_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "genres" ("slug");