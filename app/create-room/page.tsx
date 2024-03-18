import React from "react";
import CreateRoomForm from "./_form";
import GoBack from "./_goback";
function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <div className="flex items-center gap-2">
        <GoBack />
        <h1 className="text-5xl font-extrabold lg:text-6xl ml-4">
          Create Room
        </h1>
      </div>
      <CreateRoomForm />
    </div>
  );
}
export default Page;
