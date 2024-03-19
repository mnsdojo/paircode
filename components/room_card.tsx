import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/lib/db/schema/room";
import { cn } from "@/lib/utils";

import React from "react";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";
import TagList, { splitTags } from "./taglist";

type CardProps = React.ComponentProps<typeof Card> & {
  room: Room;
};
function RoomCard({ className, room, ...props }: CardProps) {
  return (
    <div>
      <Card className={cn("", className)} {...props}>
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>{room.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href={room.githubRepo!}
            className="flex items-center gap-2 mb-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
          <TagList tags={splitTags(room?.tags!)} />
        </CardContent>
        <CardFooter>
          <Button asChild variant={"secondary"}>
            <Link href={`rooms/${room.id}`}>Join Room</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RoomCard;
