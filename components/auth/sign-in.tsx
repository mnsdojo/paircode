"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { signIn, signOut } from "next-auth/react";

import { useSession } from "next-auth/react";
function SignIn() {
  const { data: session } = useSession();
  if (session) {
    return <Button onClick={() => signOut()}>Sign out</Button>;
  }

  return <Button onClick={() => signIn("github")}>Sign In</Button>;
}

export default SignIn;
