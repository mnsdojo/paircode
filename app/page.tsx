import RoomCard from "@/components/room_card";
import { Button } from "@/components/ui/button";
import { getRooms } from "@/services/rooms";
import Link from "next/link";
import React from "react";
import SearchBar from "./search-bar";

interface Props {
  searchParams: {
    search: string;
  };
}
async function Page({ searchParams }: Props) {
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-medium mb-4 sm:mb-0">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((d) => (
          <RoomCard key={d.id} room={d} />
        ))}
      </div>
    </main>
  );
}

export default Page;
