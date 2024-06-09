"use client";
import Image from "next/image";
import { useEffect } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { usePlayerContext } from "~/app/_hooks/usePlayerProvider";
import { useCreateTorrentStream } from "~/app/_hooks/useCreateTorrentStream";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import VideoLayout from "./VideoLayout";

function PlayerMedia({
  source,
  metaInfo,
}: {
  metaInfo: MetaInfo;
  source:
    | {
        id: string;
        name: string;
        videoLink: string | null;
        infoHash: string | null;
        fileIdx: number | null;
        roomId: string;
      }
    | null
    | undefined;
}) {
  const { dispatch, state } = usePlayerContext();
  const { mutate, isPending } = useCreateTorrentStream();

  useEffect(function () {
    if (
      source?.fileIdx !== undefined &&
      source?.fileIdx !== null &&
      source?.infoHash !== undefined &&
      source?.infoHash !== null
    ) {
      dispatch({ type: "CLEAR_MEDIA_SOURCE" });
      mutate({ fileIdx: source.fileIdx, infoHash: source.infoHash });
    }
    () => {
      dispatch({ type: "CLEAR_MEDIA_SOURCE" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(state.mediaSrc);

  return (
    <MediaPlayer
      src={state.mediaSrc}
      playsInline
      className="text-white ring-media-focus absolute aspect-video h-dvh w-full overflow-hidden rounded-md bg-blackA11 font-sans data-[focus]:ring-4"
    >
      <MediaProvider>
        <Image
          src={metaInfo.background}
          alt={metaInfo.name}
          fill
          className={`h-full object-cover object-top  ${isPending ? "opacity-70" : "opacity-0"} transition-all`}
          quality="90"
        />
        {/* {textTracks.map((track) => (
//@ts-ignore
<Track {...track} key={track.src} />
))} */}
      </MediaProvider>

      <div className="absolute hidden h-full w-full animate-pulse items-center justify-center transition-all media-buffering:flex">
        <Image
          src={metaInfo.logo}
          alt={metaInfo.name}
          width={800}
          height={310}
          className="z-10 w-96"
          quality="100"
        />
      </div>
      <VideoLayout disablePlay={false} />
    </MediaPlayer>
  );
}

export default PlayerMedia;
