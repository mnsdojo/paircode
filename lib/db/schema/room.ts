import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { sql } from "drizzle-orm";

export const room = pgTable("room", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  language: text("language").notNull(),
  githubRepo: text("github"),
  description: text("description").notNull(),
});

export type Room = typeof room.$inferSelect;
