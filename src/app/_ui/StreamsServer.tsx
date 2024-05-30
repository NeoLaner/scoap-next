import { getStreamsFromTorrentIo } from "~/lib/streams/getStreams";
import Stream from "./Stream";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";
import Streams from "./Streams";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
async function StreamsServer({
  params,
}: {
  params: { imdbId: string; type: string };
}) {
  const torrentIoStreams = await getStreamsFromTorrentIo(
    params.type,
    params.imdbId,
  );
  const torrentIoStreamsSorted = torrentIoStreams.sort(
    (streamA, streamB) => streamB.seeds! - streamA.seeds!,
  );

  return (
    <div className="absolute right-0 top-[96px] h-full bg-app-color-gray-1">
      <Streams torrentIoStreamsSorted={torrentIoStreamsSorted} />
    </div>
  );
}

export default StreamsServer;
