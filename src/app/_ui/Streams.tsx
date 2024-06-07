"use client";
import { type GetStreamsFromTorrentIo } from "~/lib/streams/getStreams";
import Stream from "./Stream";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
function Streams({
  name,
  torrentIoStreamsSorted,
  className,
}: {
  name: string;
  torrentIoStreamsSorted: GetStreamsFromTorrentIo;
  className?: string;
}) {
  const showStreams = useSearchParams().get("showStreams");
  const pathname = usePathname();
  if (!showStreams) return null;
  return (
    <div className={`${className} `}>
      <Link href={pathname} className="p-4">
        X
      </Link>
      <div className="z-40 h-full ">
        <ScrollAreaY>
          <div className="flex flex-col gap-2 rounded-md bg-app-color-gray-1">
            {torrentIoStreamsSorted.map((stream) => (
              <Stream name={name} key={stream.title} stream={stream} />
            ))}
          </div>
        </ScrollAreaY>
      </div>
    </div>
  );
}

export default Streams;
