import { type ReactNode } from "react";
import StreamHeader from "./_ui/StreamHeader";
import StreamMenuFooter from "./_ui/StreamMenuFooter";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import { getServerAuthSession } from "~/server/auth";

async function layout({
  streams,
  children,
  params,
}: {
  params: { imdbId: string; type: "movie" | "series" };
  streams: ReactNode;
  children: ReactNode;
}) {
  const { imdbId, type } = params;
  const session = await getServerAuthSession();
  if (!session) return null;
  let mediaData = {} as MetaInfo;
  if (type === "movie") mediaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") mediaData = await StremioService.getMetaSeries(imdbId);

  if (!mediaData) return <div>Not found</div>;

  return (
    <section className="relative h-full w-full overflow-hidden">
      <StreamHeader />
      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between gap-4 md:flex-row">
        {children}
      </div>

      <div className="absolute right-0">{streams}</div>
      <StreamMenuFooter userId={session.user.id} />
    </section>
  );
}

export default layout;
