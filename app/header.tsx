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
import { LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { getUserAuth } from "@/lib/auth/utils";

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
            {isLoggedIn ? (
              <DropdownMenuItem
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                <LogOutIcon className="mr-2" /> Sign Out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="mr-2"
                onClick={() => signIn("github")}
              >
                <LogInIcon />
              </DropdownMenuItem>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default function Header() {
  const session = useSession();
  return (
    <header className="container rounded mx-auto dark:bg-gray-900 py-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="">
          <Link href="/" className="text-lg font-medium">
            PairCode
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-4">
          {session.data && <ProfileDropDown />}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
