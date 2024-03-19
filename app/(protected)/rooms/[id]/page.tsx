import TagList, { splitTags } from "@/components/taglist";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRoom } from "@/services/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { PairCodeVideo } from "./video-player";

interface Props {
  params: {
    id: string;
  };
}

async function RoomPage({ params }: Props) {
  if (!params.id) {
    notFound();
  }
  const room = await getRoom(params?.id);
  if (!room) {
    return <h1>No Room Found</h1>;
  }
  return (
    <div className="">
      <div className="grid grid-cols-4 h-full ">
        <div className="col-span-3 p-4 pr-2 ">
          <div className="rounded-lg border  bg-card text-card-foreground shadow-sm p-4 min-h-screen">
            <PairCodeVideo room={room!} />
          </div>
        </div>
        <div className="col-span-1 p-4 pl-2 ">
          <Card>
            <CardHeader>
              <CardTitle>{room?.name}</CardTitle>
              <CardDescription>{room?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <TagList tags={splitTags(room?.tags!)} />
            </CardContent>
            <CardFooter>
              <Link
                className="flex items-center gap-2 mb-4"
                href={room?.githubRepo!}
              >
                <GithubIcon />
                Github Project
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
