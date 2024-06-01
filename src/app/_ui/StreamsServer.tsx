import { getStreamsFromTorrentIo } from "~/lib/streams/getStreams";
import Stream from "./Stream";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";
import Streams from "./Streams";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
async function StreamsServer({
  params,
  searchParams,
}: {
  params: { imdbId: string; type: string; season?: string; episode?: string };
  searchParams?: { season?: string; episode?: string };
}) {
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
    <div className="absolute right-0 top-[96px] z-30 h-full w-full bg-app-color-gray-1 md:w-fit">
      <Streams torrentIoStreamsSorted={torrentIoStreamsSorted} />
    </div>
  );
}

export default StreamsServer;
