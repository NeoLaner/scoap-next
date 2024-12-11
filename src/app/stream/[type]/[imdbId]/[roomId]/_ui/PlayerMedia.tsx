"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
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

import {
  checkIsDynamic,
  createUrlFromPrats,
  makeRawSource,
} from "~/lib/source";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useCurMediaSrc } from "~/app/_hooks/useCurMediaSrc";
import { useCurSub } from "~/app/_hooks/useCurSub";
import { getSubtitle } from "~/app/_actions/getSubFromUrl";
import { toast } from "sonner";
import { useBestSrc } from "~/app/_hooks/useBestSrc";

function PlayerMedia({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance | null>;
}) {
  useBestSrc();
  const { metaData } = useMetaData();

  const { roomData } = useRoomData();
  const { currentMediaSrc } = useCurMediaSrc();
  const { currentSubtitle } = useCurSub();
  const subtitleUrl = makeRawSource({
    source: createUrlFromPrats({
      domain: currentSubtitle?.domain,
      pathname: currentSubtitle?.pathname,
      protocol: currentSubtitle?.protocol,
    }),
    season: roomData.season,
    episode: roomData.episode,
  });

  const [subContent, setSubContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        if (!subtitleUrl) return;
        console.log("sub: ", subtitleUrl);

        setSubContent((await getSubtitle(subtitleUrl)).subtitle);
      } catch (error) {
        toast.error(`Getting subtitle: ${(error as Error).message}`);
        throw new Error((error as Error).message);
      }

      // ...
    }
    //eslint-disable-next-line
    fetchData();
  }, [subtitleUrl]);

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
    source: createUrlFromPrats({
      domain: currentMediaSrc?.domain,
      pathname: currentMediaSrc?.pathname,
      protocol: currentMediaSrc?.protocol,
    }),
    season: roomData.season,
    episode: roomData.episode,
  });

  return (
    <MediaPlayer
      ref={playerRef}
      src={{
        //eslint-disable-next-line
        //@ts-ignore
        src: source,
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
          priority
        />

        <Track
          content={subContent}
          label="Farsi"
          language="FA"
          kind="subtitles"
          default
          key="1"
          type={"srt"}
        />

        {/* <Track
          // content={data?.subtitle}
          src={currentSubtitle?.url}
          label="Farsi"
          language="FA"
          kind="subtitles"
          default
          key="1"
          type={"srt"}
        /> */}
      </MediaProvider>

      <div className="absolute hidden h-full w-full animate-pulse items-center justify-center transition-all media-buffering:flex">
        <Image
          src={metaData.logo}
          alt={metaData.name}
          priority
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
