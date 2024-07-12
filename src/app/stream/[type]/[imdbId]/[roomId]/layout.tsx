import { type ReactNode } from "react";
import { RoomDataProvider } from "~/app/_providers/RoomDataProvider";
import { RoomSettingsProvider } from "~/app/_providers/RoomSettingsProvider";
import { SourceDataProvider } from "~/app/_providers/SourceDataProvider";
import { SourcesDataProvider } from "~/app/_providers/SourcesDataProvider";
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
}) {
  const session = await getServerAuthSession();
  if (!session) return null;
  const { roomId } = params;
  console.log("🍢🍢 ROOM ID", params);

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

  const roomSources = await api.room.getRoomSources({ roomId });

  return (
    <RoomDataProvider initialRoomData={roomData}>
      <SourceDataProvider initialSourceData={sourceData}>
        <SourcesDataProvider initialSourcesData={roomSources?.Sources}>
          <RoomSettingsProvider>
            {/* <UsersSocketProvider>
        </UsersSocketProvider> */}
            <div className="relative h-full w-full">{children}</div>
          </RoomSettingsProvider>
        </SourcesDataProvider>
      </SourceDataProvider>
    </RoomDataProvider>
  );
}

export default Layout;
