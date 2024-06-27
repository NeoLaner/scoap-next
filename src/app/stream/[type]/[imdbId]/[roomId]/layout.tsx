import { type ReactNode } from "react";
import { RoomDataProvider } from "~/app/_providers/RoomDataProvider";
import { SourceDataProvider } from "~/app/_providers/SourceDataProvider";
import UsersSocketProvider from "~/app/_providers/UsersSocketProvider";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    roomId: string;
    imdbId: string;
    type: "string";
    instanceId: "string";
  };
  searchParams: { season?: string; episode?: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return null;
  const { roomId } = params;
  const roomData = await api.room.get({ roomId });
  if (!roomData) return; //TODO: Error not found
  let sourceData = await api.source.get({
    roomId: roomData?.id,
    userId: session.user.id,
  });

  if (!sourceData)
    sourceData = await api.source.createMe({
      roomId: roomData.id,
    });

  return (
    <RoomDataProvider roomData={roomData}>
      <SourceDataProvider sourceData={sourceData}>
        <UsersSocketProvider>
          <div className="relative h-full w-full">{children}</div>
        </UsersSocketProvider>
      </SourceDataProvider>
    </RoomDataProvider>
  );
}

export default Layout;