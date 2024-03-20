"use client";
import { ModeToggle } from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ProfileDropDown = () => {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.data?.user.image!} alt="@mns" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              <LogOutIcon className="mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <header className=" rounded mx-auto dark:bg-gray-900 py-4 bg-gray-50 relative z-10">
      <div className="flex container mx-auto items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-lg font-medium">
            Pair Code
          </Link>
          {isLoggedIn && (
            <Link className="ml-4 hover:underline" href="/your_rooms">
              Your Rooms
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center space-x-4">
          {session.data && <ProfileDropDown />}
          {!session.data && (
            <Button onClick={() => signIn("github")}>Sign In</Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
