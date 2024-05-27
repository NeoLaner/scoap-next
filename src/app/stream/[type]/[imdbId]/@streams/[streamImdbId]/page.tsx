import { getStreamsFromTorrentIo } from "~/lib/streams/getStreams";
import Stream from "./_ui/Stream";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
async function Page({ params }: { params: { imdbId: string; type: string } }) {
  const torrentIoStreams = await getStreamsFromTorrentIo(
    params.type,
    params.imdbId,
  );
  const torrentIoStreamsSorted = torrentIoStreams.sort(
    (streamA, streamB) => streamB.seeds! - streamA.seeds!,
  );

  return (
    <div className="flex flex-col gap-2 rounded-md bg-blackA4 backdrop-blur-lg">
      {torrentIoStreamsSorted.map((stream) => (
        <Stream key={stream.infoHash} stream={stream} />
      ))}
    </div>
  );
}

export default Page;
