"use server";

import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { Room, room } from "@/lib/db/schema/room";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "userId" | "id">) {
  const { session } = await getUserAuth();
  if (!session) {
    throw new Error("You must be logged in before creating this room");
  }
  const res = await db
    .insert(room)
    .values({ ...roomData, userId: session?.user.id! })
    .returning();

  revalidatePath("/");
  return res[0];
}
