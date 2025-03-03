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
import { redirect } from "next/navigation";
import { UsersSourceDataProvider } from "~/app/_providers/UsersSourceDataProvider";
import { PublicSourcesProvider } from "~/app/_providers/PublicSourcesProvider";
import { CurrentMediaSrcProvider } from "~/app/_providers/CurrentMediaSrcProvider";
import { UsersSubDataProvider } from "~/app/_providers/UsersSubsProvider";
import { PublicSubsProvider } from "~/app/_providers/PublicSubsProvider";
import { RoomSubsProvider } from "~/app/_providers/RoomSubsProvider";
import { CurSubProvider } from "~/app/_providers/CurrentSubProvider";
import { PlayerRefProvider } from "~/app/_providers/PlayerRefProvider";

async function Layout(props: {
  children: ReactNode;
  params: Promise<{
    roomId: string;
    imdbId: string;
    type: "string";
    instanceId: "string";
  }>;
}) {
  const params = await props.params;

  const { children } = props;

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
      <RoomDataProvider initialRoomData={roomData}>
        <MinimalLayout>
          <Entrance roomId={params.roomId} userId={session.user.id} />
        </MinimalLayout>
      </RoomDataProvider>
    );

  const sourceData = await api.source.getMe({
    roomId: roomData.id,
  });

  const mediaCurSrc = sourceData?.mediaSourceId
    ? await api.mediaSource.get({ id: sourceData?.mediaSourceId })
    : undefined;

  const usersSource = await api.room.getUsersSource({ roomId });
  if (!usersSource) return; //TODO: ERROR, IT MUST NEVER HAPPENED

  const initialRoomSources = await api.mediaSource.getAllRoomSources({
    roomId,
  });
  const initialPublicSources = await api.mediaSource.getAllPublicSources({
    imdbId: params.imdbId,
    roomId,
  });

  const initialUsersSource = await api.room.getUsersSubs({ roomId });

  let subtitleData;
  if (sourceData?.subtitleSourceId) {
    subtitleData = await api.subtitle.get({
      id: sourceData.subtitleSourceId,
    });
  }

  const initialPublicSubs = await api.subtitle.getAllPublicSubs({
    roomId,
    imdbId: params.imdbId,
  });
  const initialRoomSubs = await api.subtitle.getAllRoomSubs({ roomId });

  return (
    <RoomDataProvider initialRoomData={roomData}>
      <RoomSettingsProvider>
        <ChatDataProvider>
          {/*NOTE: The source data not must be null!! */}
          <SourceDataProvider initialSourceData={sourceData}>
            <CurrentMediaSrcProvider initialCurMediaSrc={mediaCurSrc}>
              <PublicSourcesProvider
                initialPublicSources={initialPublicSources}
              >
                <RoomSourcesDataProvider
                  initialRoomSourcesData={initialRoomSources}
                >
                  <UsersSourceDataProvider
                    initialUsersSourceData={usersSource.Sources}
                  >
                    <CurSubProvider initialSubtitle={subtitleData}>
                      <PublicSubsProvider initialPublicSubs={initialPublicSubs}>
                        <RoomSubsProvider initialRoomSubs={initialRoomSubs}>
                          <UsersSubDataProvider
                            initialUsersSubData={initialUsersSource}
                          >
                            <PlayerRefProvider>
                              <div className="relative h-full w-full">
                                {children}
                              </div>
                            </PlayerRefProvider>
                          </UsersSubDataProvider>
                        </RoomSubsProvider>
                      </PublicSubsProvider>
                    </CurSubProvider>
                  </UsersSourceDataProvider>
                </RoomSourcesDataProvider>
              </PublicSourcesProvider>
            </CurrentMediaSrcProvider>
          </SourceDataProvider>
        </ChatDataProvider>
      </RoomSettingsProvider>
    </RoomDataProvider>
  );
}

export default Layout;
