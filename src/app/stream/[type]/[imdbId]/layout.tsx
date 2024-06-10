import { type ReactNode } from "react";
import StreamHeader from "./_ui/StreamHeader";
import StreamMenuFooter from "./_ui/StreamMenuFooter";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import { getServerAuthSession } from "~/server/auth";
import { MetaDataProvider } from "~/app/_providers/MetaProvider";

async function layout({
  children,
  params,
}: {
  params: { imdbId: string; type: "movie" | "series" };
  children: ReactNode;
}) {
  const { imdbId, type } = params;
  const session = await getServerAuthSession();
  if (!session) return null;
  let metaData = {} as MetaInfo;
  if (type === "movie") metaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") metaData = await StremioService.getMetaSeries(imdbId);

  if (!metaData) return <div>Not found</div>;

  return (
    <section className="relative h-full w-full overflow-hidden">
      <StreamHeader />

      <MetaDataProvider metaData={metaData}>
        <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between gap-4 md:flex-row">
          {children}
        </div>

        <StreamMenuFooter userId={session.user.id} />
      </MetaDataProvider>
    </section>
  );
}

export default layout;
