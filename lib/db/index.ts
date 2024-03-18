import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env.mjs";
import * as schema from "./schema/auth";
import * as roomSchema from "./schema/room";
export const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema: { ...schema, ...roomSchema } });
