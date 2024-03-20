"use server";

import { getUserAuth } from "@/lib/auth/utils";
import { Room } from "@/lib/db/schema/room";
import { editRoom, getRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const { session } = await getUserAuth();

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

  const room = await getRoom(roomData.id);

  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized");
  }

  await editRoom({ ...roomData, userId: room.userId });

  revalidatePath("/your_rooms");
  revalidatePath(`/edit-room/${roomData.id}`);
  redirect("/your_rooms");
}
