import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { type ReactNode } from "react";
import { ChatDataProvider } from "~/app/_providers/ChatDataProvider";
import { RoomDataProvider } from "~/app/_providers/RoomDataProvider";
import { RoomSettingsProvider } from "~/app/_providers/RoomSettingsProvider";
import { SourceDataProvider } from "~/app/_providers/SourceDataProvider";
import { SourcesDataProvider } from "~/app/_providers/SourcesDataProvider";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Entrance from "./_ui/Entrance";
import MinimalLayout from "~/app/_ui/MinimalLayout";

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
}) {
  const session = await getServerAuthSession();
  if (!session) return null;
  const { roomId } = params;
  const roomData = await api.room.get({ roomId });
  const isOwner = roomData?.ownerId === session.user.id;
  if (!roomData) return; //TODO: Error not found

  const isAllowedGuests = roomData.allowedGuestsId.filter(
    (id) => session.user.id === id,
  );

  if (!isOwner && !(isAllowedGuests.length > 0))
    return (
      <RoomDataProvider initialRoomData={roomData}>
        <MinimalLayout>
          <Entrance roomId={params.roomId} userId={session.user.id} />
        </MinimalLayout>
      </RoomDataProvider>
    );

  let sourceData = await api.source.get({
    roomId: roomData?.id,
    userId: session.user.id,
  });

  if (!sourceData)
    sourceData = await api.source.createMe({
      roomId: roomData.id,
    });

  const roomSources = await api.room.getRoomSources({ roomId });

  return (
    <RoomDataProvider initialRoomData={roomData}>
      <RoomSettingsProvider>
        <ChatDataProvider>
          <SourceDataProvider initialSourceData={sourceData}>
            <SourcesDataProvider initialSourcesData={roomSources?.Sources}>
              {/* <UsersSocketProvider>
        </UsersSocketProvider> */}
              <div className="relative h-full w-full">{children}</div>
            </SourcesDataProvider>
          </SourceDataProvider>
        </ChatDataProvider>
      </RoomSettingsProvider>
    </RoomDataProvider>
  );
}

export default Layout;
