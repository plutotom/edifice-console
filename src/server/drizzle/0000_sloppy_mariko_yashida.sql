CREATE TABLE IF NOT EXISTS "edifice_console_todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(256),
	"description" text,
	"done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "edifice_console_todo" ("text");