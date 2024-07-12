"use client";
import { type GetStreamsFromTorrentIo } from "~/lib/streams/getStreams";
import TorrentStream from "./TorrentStream";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";
import { useSearchParams } from "next/navigation";
import StreamsHeading from "./StreamsHeading";
import StreamForm from "./StreamForm";
import StreamSources from "./StreamSources";
import { useEffect } from "react";
import { mediaSocket } from "~/lib/socket/socket";
import { useSourcesData } from "~/app/_hooks/useSourcesData";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
function Streams({
  torrentIoStreamsSorted,
  className,
}: {
  torrentIoStreamsSorted: GetStreamsFromTorrentIo | [];
  className?: string;
}) {
  return (
    <div className={`${className} px-6`}>
      <StreamsHeading />
      <div className="z-40 ml-2 h-full">
        <ScrollAreaY>
          <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md bg-background">
            <StreamForm />
            {torrentIoStreamsSorted.map((stream) => (
              <TorrentStream key={stream.title} stream={stream} />
            ))}
            <div className="flex w-full flex-col gap-4">
              <StreamSources />
            </div>
          </div>
        </ScrollAreaY>
      </div>
    </div>
  );
}

export default Streams;
