"use client";
import Image from "next/image";
import { type RefObject, useEffect } from "react";
import {
  type MediaPauseEvent,
  type MediaPlayEvent,
  type MediaPlayerInstance,
  MediaPlayer,
  MediaProvider,
  useMediaStore,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
  isHLSProvider,
} from "@vidstack/react";
import { usePlayerContext } from "~/app/_hooks/usePlayerProvider";
import { useCreateTorrentStream } from "~/app/_hooks/useCreateTorrentStream";
import VideoLayout from "./VideoLayout";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { useSourceData } from "~/app/_hooks/useSourceData";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { useUserData } from "~/app/_hooks/useUserData";
import { useInstanceData } from "~/app/_hooks/useInstanceData";
import HLS from "hls.js";

function PlayerMedia({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  const { dispatch, state } = usePlayerContext();
  const { mutate, isPending } = useCreateTorrentStream();
  const { metaData } = useMetaData();
  const { sourceData } = useSourceData();
  const { userData } = useUserData();
  const { instanceData: instance } = useInstanceData();
  const isHost = instance.ownerId === userData.id;
  const { waiting, paused, canPlay } = useMediaStore(playerRef);

  useEffect(function () {
    if (
      sourceData?.fileIdx !== undefined &&
      sourceData?.fileIdx !== null &&
      sourceData?.infoHash !== undefined &&
      sourceData?.infoHash !== null
    ) {
      dispatch({ type: "CLEAR_MEDIA_SOURCE" });
      // mutate({ fileIdx: sourceData.fileIdx, infoHash: sourceData.infoHash });
    }
    () => {
      dispatch({ type: "CLEAR_MEDIA_SOURCE" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(state.mediaSrc);

  useEffect(
    function () {
      if (waiting) {
        console.log("waiting");
        socketEmitters.waitingForData();
      } else if (canPlay) {
        console.log("not waiting");
        socketEmitters.receivedData();
      }
    },
    [waiting, userData, instance, canPlay],
  );

  /*

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    // if (isHLSProvider(provider)) {
    //   provider.config = {};
    // }
    // if (isYouTubeProvider(provider)) {
    //   provider.cookies = true;
    // }
  }

  // We can listen for the `can-play` event to be notified when the playerRef is ready.
  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent,
  ) {
    // ...
    dispatch({ type: "mediaLoaded" });
  }
 */

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

  useEffect(() => {
    setInterval(() => {
      socketEmitters.sendUserMediaState({
        payload: {
          createdAt: Date.now(),
          downloadSpeed: 500,
          forceUnsync: false,
          synced: false,
          playbackRate: 1,
          videoTs: 5,
          waitForData: waiting,
        },
      });
    }, 1000);
  }, []);

  return (
    <MediaPlayer
      ref={playerRef}
      // src={state.mediaSrc}
      src={{
        type: "video/mp4",
        src: "https://dl.tabar.sbs/English/Series/The.Boys/S01/720p-x265-PSA-SoftSub/The.Boys.S01E002.720p.10bit.WEB-DL.2CH.x265.HEVC.PSA.SoftSub.EBTV.mkv",
      }}
      playsInline
      className="text-white ring-media-focus absolute aspect-video h-dvh w-full overflow-hidden rounded-md bg-blackA11 font-sans data-[focus]:ring-4"
      autoPlay={false}
      keyDisabled
      onProviderChange={onProviderChange}
      muted
      // onWaiting={() => {
      //   console.log("waiting");
      //   socketEmitters.waitingForData();
      // }}
      // onCanPlayThrough={() => {
      //   console.log("not waiting");
      //   socketEmitters.receivedData();
      // }}
      // onCanPlay={onCanPlay}
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
