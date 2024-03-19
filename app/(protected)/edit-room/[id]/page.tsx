import React from "react";

import { EditRoomForm } from "./edit_form";
import GoBack from "../../create-room/_goback";
import { getRoom } from "@/services/rooms";
import { unstable_noStore } from "next/cache";
async function Page({ params }: { params: { id: string } }) {
  unstable_noStore();
  const room = await getRoom(params.id);

  if (!room) {
    return <div>Room Not Found</div>;
  }
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <div className="flex items-center gap-2">
        <GoBack />
        <h1 className="text-5xl font-extrabold lg:text-6xl ml-4">Edit Room</h1>
      </div>
      <EditRoomForm room={room} />
    </div>
  );
}
export default Page;
