"use client";
import Image from "next/image";
import { useEffect } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { usePlayerContext } from "~/app/_hooks/usePlayerProvider";
import { useCreateTorrentStream } from "~/app/_hooks/useCreateTorrentStream";
import VideoLayout from "./VideoLayout";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { useSourceData } from "~/app/_hooks/useSourceData";

function PlayerMedia() {
  const { dispatch, state } = usePlayerContext();
  const { mutate, isPending } = useCreateTorrentStream();
  const { metaData } = useMetaData();
  const { sourceData } = useSourceData();

  useEffect(function () {
    if (
      sourceData?.fileIdx !== undefined &&
      sourceData?.fileIdx !== null &&
      sourceData?.infoHash !== undefined &&
      sourceData?.infoHash !== null
    ) {
      dispatch({ type: "CLEAR_MEDIA_SOURCE" });
      mutate({ fileIdx: sourceData.fileIdx, infoHash: sourceData.infoHash });
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
          src={metaData.background}
          alt={metaData.name}
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
          src={metaData.logo}
          alt={metaData.name}
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
