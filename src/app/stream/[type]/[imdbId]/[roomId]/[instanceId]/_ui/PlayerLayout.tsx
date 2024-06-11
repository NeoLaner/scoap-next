import jwt from "jsonwebtoken";
import "@vidstack/react/player/styles/base.css";
import PlayerMedia from "./PlayerMedia";
import { api } from "~/trpc/server";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import EpisodesPanel from "./EpisodesPanel";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import StreamsServer from "~/app/stream/[type]/[imdbId]/[roomId]/[instanceId]/_ui/StreamsServer";
import { env } from "~/env";
import PlayerSocket from "./PlayerSocket";
import { useUserData } from "~/app/_hooks/useUserData";
import { getServerAuthSession } from "~/server/auth";

interface TokenPayload {
  userId: string;
  instanceId: string;
}

export const generateToken = (userId: string, instanceId: string): string => {
  // Define the payload
  const payload: TokenPayload = {
    userId,
    instanceId,
  };

  // Sign the token with the payload, secret key, and optional options
  const token = jwt.sign(payload, env.NEXTAUTH_SECRET!, {
    expiresIn: "12h", // Token expiration time
  });

  return token;
};

async function PlayerLayout({
  params,
  searchParams,
}: {
  params: { roomId: string; imdbId: string; type: string; instanceId: string };
  searchParams: { season?: string; episode?: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return null;
  return (
    <div className="flex">
      <PlayerMedia />
      {/* Right Panel */}
      <div>
        {/* just for series */}
        <EpisodesPanel />

        <StreamsServer
          params={params}
          searchParams={searchParams}
          className="absolute right-0 top-[0] z-30 h-full w-full bg-app-color-gray-1 md:w-[420px]"
        />
      </div>
      {/* Socket */}
      <PlayerSocket token={generateToken(session.user.id, params.instanceId)} />
    </div>
  );
}

export default PlayerLayout;
