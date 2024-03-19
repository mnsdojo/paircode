"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  StreamVideoClient,
  Call,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  CallParticipantsList,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";
import { generateTokenAction } from "./actions";
import { Room } from "@/lib/db/schema/room";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export const PairCodeVideo = ({ room }: { room: Room }) => {
  const session = useSession();
  const router = useRouter();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    if (!room || !session.data) return;

    const initializeClient = async () => {
      try {
        setLoading(true); // Set loading state to true
        const userId = session.data.user?.id;
        const client = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: session.data.user?.name || undefined,
            image: session.data.user?.image || undefined,
          },
          tokenProvider: generateTokenAction,
        });
        setClient(client);

        const call = client.call("default", room.id);
        await call.join({ create: true });
        setCall(call);
      } catch (error) {
        console.error("Error occurred during initialization:", error);
      } finally {
        setLoading(false); // Set loading state back to false
      }
    };

    initializeClient();

    return () => {
      if (call) {
        call
          .leave()
          .then(() => {
            if (client) client.disconnectUser();
          })
          .catch((error) => {
            console.error("Error occurred during cleanup:", error);
          });
      }
    };
  }, [session, room]);

  return (
    <>
      {loading && <p>Loading...</p>} {/* Display loading indicator */}
      {client && call && (
        <StreamVideo client={client}>
          <StreamTheme />
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls onLeave={() => router.push("/")} />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamVideo>
      )}
    </>
  );
};
