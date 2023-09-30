CREATE TABLE IF NOT EXISTS "games_to_platforms" (
	"game_id" uuid NOT NULL,
	"platform_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "games_to_platforms" ("game_id","platform_id");