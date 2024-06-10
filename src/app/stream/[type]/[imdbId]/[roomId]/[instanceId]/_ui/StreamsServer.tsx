import { getStreamsFromTorrentIo } from "~/lib/streams/getStreams";
import Streams from "./Streams";
import { getServerAuthSession } from "~/server/auth";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
async function StreamsServer({
  params,
  searchParams,
  className,
}: {
  params: { imdbId: string; type: string };
  searchParams?: { season?: string; episode?: string };
  className?: string;
}) {
  const session = await getServerAuthSession();
  if (!session) return null;
  const { type, imdbId } = params;
  const season = searchParams?.season;
  const episode = searchParams?.episode;

  if (type === "series" && !episode) return null;
  const torrentIoStreams = await getStreamsFromTorrentIo(
    type,
    imdbId,
    season,
    episode,
  );

  const torrentIoStreamsSorted = torrentIoStreams.sort(
    (streamA, streamB) => streamB.seeds! - streamA.seeds!,
  );

  return (
    <Streams
      userId={session.user.id}
      torrentIoStreamsSorted={torrentIoStreamsSorted}
      className={className}
    />
  );
}

export default StreamsServer;
