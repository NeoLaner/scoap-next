import { type ReactNode } from "react";
import FilePlayer from "./_ui/FilePlayer";
import { api } from "~/trpc/server";
import StremioService from "~/app/_services/stremIo/stremIoServices";

async function layout({
  params,
}: {
  params: { roomId: string };
  children: ReactNode;
}) {
  const { roomId } = params;
  const room = await api.room.get({ roomId });

  const metaInfo = await StremioService.getMetaMovie(room?.imdbId);

  return (
    <section className="relative h-full w-full overflow-hidden">
      <FilePlayer source={room?.source} metaInfo={metaInfo} />
    </section>
  );
}

export default layout;
