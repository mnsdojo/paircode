"use server";

import { getUserAuth } from "@/lib/auth/utils";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const { session } = await getUserAuth();
  if (!session) {
    throw new Error("No Session found");
  }
  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const api_secret = process.env.GET_STREAM_API_SECRET!;
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(session.user.id);
  return token;
}
