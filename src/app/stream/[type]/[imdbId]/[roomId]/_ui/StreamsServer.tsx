import { getStreamsFromTorrentIo } from "~/lib/streams/getStreams";
import Streams from "./Streams";
import { api } from "~/trpc/server";
import { SourcesDataProvider } from "~/app/_providers/SourcesDataProvider";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
async function StreamsServer({
  params,
  searchParams,
  className,
}: {
  params: { imdbId: string; type: string; roomId: string };
  searchParams?: { season?: string; episode?: string };
  className?: string;
}) {
  const { type, imdbId, roomId } = params;
  const season = searchParams?.season;
  const episode = searchParams?.episode;

  if (type === "series" && !episode) return null;
  // const torrentIoStreams = await getStreamsFromTorrentIo(
  //   type,
  //   imdbId,
  //   season,
  //   episode,
  // );

  // const torrentIoStreamsSorted = torrentIoStreams.sort(
  //   (streamA, streamB) => streamB.seeds! - streamA.seeds!,
  // );
  const roomSources = await api.room.getRoomSources({ roomId });
  return (
    <SourcesDataProvider initialSourcesData={roomSources?.Sources}>
      <Streams torrentIoStreamsSorted={[]} className={className} />
    </SourcesDataProvider>
  );
}

export default StreamsServer;
