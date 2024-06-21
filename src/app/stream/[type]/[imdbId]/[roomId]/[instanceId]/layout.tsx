import { type ReactNode } from "react";
import { InstanceDataProvider } from "~/app/_providers/InstanceDataProivder";
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
  const { roomId, instanceId } = params;
  const roomData = await api.room.get({ roomId });
  const instanceData = await api.instance.get({ instanceId });
  let sourceData = await api.source.get({
    instanceId,
    userId: session.user.id,
  });

  if (!sourceData)
    sourceData = await api.source.create({
      instanceId,
      userId: session.user.id,
    });

  return (
    <RoomDataProvider roomData={roomData}>
      <InstanceDataProvider instanceData={instanceData}>
        <SourceDataProvider sourceData={sourceData}>
          <UsersSocketProvider>
            <div className="relative h-full w-full">{children}</div>
          </UsersSocketProvider>
        </SourceDataProvider>
      </InstanceDataProvider>
    </RoomDataProvider>
  );
}

export default Layout;
