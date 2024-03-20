import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/lib/env.mjs";
import * as schema from "./schema/auth";
import * as roomSchema from "./schema/room";
export const client = neon(env.DATABASE_URL);

export const db = drizzle(client as any, {
  schema: { ...schema, ...roomSchema },
});
