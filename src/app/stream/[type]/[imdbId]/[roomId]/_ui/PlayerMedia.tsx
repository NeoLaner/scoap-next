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
  Track,
} from "@vidstack/react";

import VideoLayout from "./VideoLayout";
import { useMetaData } from "~/app/_hooks/useMetaData";

import { makeRawSource } from "~/lib/source";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useCurMediaSrc } from "~/app/_hooks/useCurMediaSrc";
import { api } from "~/trpc/react";

function PlayerMedia({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  const { metaData } = useMetaData();

  const { roomData } = useRoomData();
  const { currentMediaSrc } = useCurMediaSrc();

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

  const source = makeRawSource({
    source: currentMediaSrc?.videoUrl ?? "",
    season: roomData.season,
    episode: roomData.episode,
  });

  console.log(currentMediaSrc);
  const subtitleUrl =
    "https://dl4.tabar.lol/English/Series/The.Lord.of.the.Rings.The.Rings.of.Power/S02/srt/The.Lord.of.the.Rings.The.Rings.of.Power.S02E01.WEB-DL.FA.srt";
  const { data } = api.subtitle.getSubtitle.useQuery(
    { url: subtitleUrl },
    { staleTime: Infinity },
  );
  return (
    <MediaPlayer
      ref={playerRef}
      src={{
        src: source ?? "",
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
          className={`h-full object-cover object-top  ${!source ? "opacity-70" : "opacity-0"} transition-all`}
          quality="90"
        />
        <Track
          content={data?.subtitle}
          label="Farsi"
          language="FA"
          kind="subtitles"
          default
          key="1"
          type={"srt"}
        />
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

const textTracks = [
  // Subtitles
  {},

  // Chapters
  // {
  //   src: "https://media-files.vidstack.io/sprite-fight/chapters.vtt",
  //   kind: "chapters",
  //   language: "en-US",
  //   default: true,
  // },
];

export default PlayerMedia;
