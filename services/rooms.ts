import { db } from "@/lib/db";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

import { Room, room } from "@/lib/db/schema/room";
import { getUserAuth } from "@/lib/auth/utils";

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getYourRooms() {
  const { session } = await getUserAuth();
  if (!session) {
    throw new Error("User Not Authenticated");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function deleteRoom(roomId: string) {
  unstable_noStore();
  await db.delete(room).where(eq(room.id, roomId));
}

export async function editRoom(roomData: Room) {
  try {
    const updated = await db
      .update(room)
      .set(roomData)
      .where(eq(room.id, roomData.id))
      .returning();
    return updated[0];
  } catch (error) {
    console.log(error);
  }
}
