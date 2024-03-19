"use client";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";
import Link from "next/link";
import { GithubIcon, Pencil, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TagList, { splitTags } from "@/components/taglist";
import { deleteRoomAction } from "./actions";

type CardProps = React.ComponentProps<typeof Card> & {
  room: Room;
};
function UserRoomCard({ className, room, ...props }: CardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="relative">
        <Button
          variant={"outline"}
          size="icon"
          className="absolute top-2 right-2"
        >
          <Link href={`/edit-room/${room.id}`}>
            <Pencil />
          </Link>
        </Button>
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="ml-4">
              <TrashIcon className="w-4 h-4 mr-2" />
              Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove your
                Room and remove your data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteRoomAction(room.id)}>
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default UserRoomCard;
