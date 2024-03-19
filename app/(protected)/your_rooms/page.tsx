import { Button } from "@/components/ui/button";
import { getYourRooms } from "@/services/rooms";
import Link from "next/link";
import React from "react";
import { unstable_noStore } from "next/cache";
import UserRoomCard from "./room_card";

async function Page() {
    unstable_noStore();
  const rooms = await getYourRooms();
  return (
    <main className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-medium mb-4 sm:mb-0">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((d) => (
          <UserRoomCard key={d.id} room={d} />
        ))}
      </div>
    </main>
  );
}

export default Page;
