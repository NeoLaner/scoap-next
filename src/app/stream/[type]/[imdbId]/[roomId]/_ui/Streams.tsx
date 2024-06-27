"use client";
import { type GetStreamsFromTorrentIo } from "~/lib/streams/getStreams";
import TorrentStream from "./TorrentStream";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";
import { useSearchParams } from "next/navigation";
import StreamsHeading from "./StreamsHeading";
import StreamForm from "./StreamForm";
import { type api } from "~/trpc/server";
import StreamSources from "./StreamSources";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
function Streams({
  torrentIoStreamsSorted,
  roomSources,
  className,
}: {
  torrentIoStreamsSorted: GetStreamsFromTorrentIo | [];
  roomSources: Awaited<ReturnType<typeof api.room.getRoomSources>>;
  className?: string;
}) {
  const showStreams = useSearchParams().get("showStreams");

  if (!showStreams) return null;
  return (
    <div className={`${className} px-6`}>
      <StreamsHeading />
      <div className="z-40 ml-2 h-full">
        <ScrollAreaY>
          <div className="bg-background flex w-full flex-col items-center justify-center gap-2 rounded-md">
            <StreamForm />
            {torrentIoStreamsSorted.map((stream) => (
              <TorrentStream key={stream.title} stream={stream} />
            ))}
            <div className="flex flex-col gap-4">
              <StreamSources roomSources={roomSources} />
            </div>
          </div>
        </ScrollAreaY>
      </div>
    </div>
  );
}

export default Streams;
