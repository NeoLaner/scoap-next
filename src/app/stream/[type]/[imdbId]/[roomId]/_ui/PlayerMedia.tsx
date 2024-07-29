"use client";
import Image from "next/image";
import { type RefObject } from "react";
import HLS from "hls.js";
import {
  type MediaPlayerInstance,
  MediaPlayer,
  MediaProvider,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
  isHLSProvider,
} from "@vidstack/react";

import VideoLayout from "./VideoLayout";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { useSourceData } from "~/app/_hooks/useSourceData";

function PlayerMedia({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  const { metaData } = useMetaData();
  const { sourceData } = useSourceData();

  sourceData.videoLink;

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    if (isHLSProvider(provider)) {
      // Static import

      provider.config.maxBufferLength = 800;
      provider.library = HLS;
    }
  }

  return (
    <MediaPlayer
      ref={playerRef}
      src={{
        src: sourceData.videoLink ?? "",
        type: "video/mp4",
      }}
      playsInline
      className="ring-media-focus bg-blackA11 absolute aspect-video h-dvh w-full overflow-hidden rounded-md font-sans text-white data-[focus]:ring-4"
      autoPlay={false}
      keyDisabled
      onProviderChange={onProviderChange}
      muted
    >
      <MediaProvider>
        <Image
          src={metaData.background}
          alt={metaData.name}
          fill
          className={`h-full object-cover object-top  ${!sourceData.videoLink ? "opacity-70" : "opacity-0"} transition-all`}
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
