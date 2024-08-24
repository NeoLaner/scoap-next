import { type ReactNode } from "react";
import { ChatDataProvider } from "~/app/_providers/ChatDataProvider";
import { RoomDataProvider } from "~/app/_providers/RoomDataProvider";
import { RoomSettingsProvider } from "~/app/_providers/RoomSettingsProvider";
import { SourceDataProvider } from "~/app/_providers/SourceDataProvider";
import { RoomSourcesDataProvider } from "~/app/_providers/RoomSourcesDataProvider";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Entrance from "./_ui/Entrance";
import MinimalLayout from "~/app/_ui/MinimalLayout";
import ProtectedRoute from "~/app/_ui/ProtectedRoute";
import { redirect } from "next/navigation";
import { UsersSourceDataProvider } from "~/app/_providers/UsersSourceDataProvider";

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
  if (!session) return redirect("/api/auth/signin");
  const { roomId } = params;
  const roomData = await api.room.get({ roomId });
  const isOwner = roomData?.ownerId === session.user.id;
  if (!roomData) return; //TODO: Error not found

  const isAllowedGuests = roomData.allowedGuestsId.filter(
    (id) => session.user.id === id,
  );

  if (
    (!isOwner && !(isAllowedGuests.length > 0)) ||
    (!isOwner && !roomData.online)
  )
    return (
      <ProtectedRoute>
        <RoomDataProvider initialRoomData={roomData}>
          <MinimalLayout>
            <Entrance roomId={params.roomId} userId={session.user.id} />
          </MinimalLayout>
        </RoomDataProvider>
      </ProtectedRoute>
    );

  const sourceData = await api.source.get({
    roomId: roomData?.id,
    userId: session.user.id,
  });

  const usersSource = await api.room.getUsersSource({ roomId });
  if (!usersSource) return; //TODO: ERROR, IT MUST NEVER HAPPENED

  const initialRoomSource = await api.mediaSource.getAllRoomSources({ roomId });
  return (
    <ProtectedRoute>
      <RoomDataProvider initialRoomData={roomData}>
        <RoomSettingsProvider>
          <ChatDataProvider>
            <SourceDataProvider
              initialSourceData={{
                videoLink: sourceData?.MediaSource?.videoLink ?? "",
              }}
            >
              <RoomSourcesDataProvider
                initialRoomSourcesData={initialRoomSource}
              >
                <UsersSourceDataProvider
                  initialUsersSourceData={usersSource.Sources}
                >
                  <div className="relative h-full w-full">{children}</div>
                </UsersSourceDataProvider>
              </RoomSourcesDataProvider>
            </SourceDataProvider>
          </ChatDataProvider>
        </RoomSettingsProvider>
      </RoomDataProvider>
    </ProtectedRoute>
  );
}

export default Layout;
