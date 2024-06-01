"use client";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import VideoLayout from "./VideoLayout";
import { usePlayerContext } from "~/app/_hooks/usePlayerProvider";
import { useEffect } from "react";
import { useCreateTorrentStream } from "~/app/_hooks/useCreateTorrentStream";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import Image from "next/image";

function FilePlayer({
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
  const { state } = usePlayerContext();
  const { mutate, isPending } = useCreateTorrentStream();

  useEffect(
    function () {
      if (
        source?.fileIdx !== undefined &&
        source?.fileIdx !== null &&
        source?.infoHash !== undefined &&
        source?.infoHash !== null
      ) {
        mutate({ fileIdx: source.fileIdx, infoHash: source.infoHash });
      }
    },
    [mutate, source?.fileIdx, source?.infoHash],
  );

  return (
    <>
      <MediaPlayer
        src={state.mediaSrc}
        // src={{
        //   src: "http://127.0.0.1:11470/f5d61bf3d57082ba2ee1305da5df8dcd10d34539/0",
        //   type: "video/mp4",
        // }}
        // src="http://127.0.0.1:11470/hlsv2/8d64c8c24eecb02a4f60fc5eeeca8393fdafad/master.m3u8?mediaURL=http%3A%2F%2F127.0.0.1%3A11470%2F90b15a09117ec699ee5d335c7fd39a12035dbabc%2F1&videoCodecs=h264&videoCodecs=h265&videoCodecs=hevc&audioCodecs=aac&audioCodecs=mp3&audioCodecs=opus&maxAudioChannels=2"
        autoPlay
        playsInline
        className="text-white ring-media-focus absolute aspect-video h-dvh w-full overflow-hidden bg-blackA12 font-sans data-[focus]:ring-4"
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
    </>
  );
}

export default FilePlayer;
