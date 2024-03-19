"use server";

import { getUserAuth } from "@/lib/auth/utils";
import { deleteRoom, getRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  const { session } = await getUserAuth();
  if (!session) {
    throw new Error("User not Authenticated");
  }

  const room = await getRoom(roomId);
  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized");
  }
  await deleteRoom(roomId);
  revalidatePath("/your_rooms");
}
