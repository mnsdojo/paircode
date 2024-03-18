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
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        </CardContent>
        <CardFooter>
          <Button asChild variant={"secondary"}>
            <Link href={`room/${room.id}`}>Join Room</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RoomCard;
