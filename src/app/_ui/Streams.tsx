"use client";
import { type GetStreamsFromTorrentIo } from "~/lib/streams/getStreams";
import Stream from "./Stream";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";
import { useSearchParams } from "next/navigation";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
function Streams({
  torrentIoStreamsSorted,
}: {
  torrentIoStreamsSorted: GetStreamsFromTorrentIo;
}) {
  const showStreams = useSearchParams().get("showStreams");
  if (!showStreams) return null;
  return (
    <div className="z-40 h-full">
      <ScrollAreaY>
        <div className="flex flex-col gap-2 rounded-md bg-app-color-gray-1">
          {torrentIoStreamsSorted.map((stream) => (
            <Stream key={stream.title} stream={stream} />
          ))}
        </div>
      </ScrollAreaY>
    </div>
  );
}

export default Streams;
