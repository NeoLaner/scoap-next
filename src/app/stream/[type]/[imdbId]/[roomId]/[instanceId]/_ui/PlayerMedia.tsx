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
  const { waiting } = useMediaStore(playerRef);

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

  useEffect(
    function () {
      if (waiting) {
        console.log("waiting");
        socketEmitters.waitingForData();
      } else {
        console.log("playing");
        socketEmitters.receivedData();
      }
    },
    [waiting, userData, instance],
  );

  function onPlay(e: MediaPlayEvent) {
    const videoElement = playerRef.current;
    if (videoElement) {
      const playedSeconds = videoElement.currentTime;
      socketEmitters.playedVideo({
        instance,
        playedSeconds,
        userData,
        caused: "manual",
      });
    }
  }

  function onPause(e: MediaPauseEvent) {
    const videoElement = playerRef.current;

    if (videoElement) {
      // const caused = notReadyGuests?.length === 0 ? "manual" : "auto";
      const playedSeconds = videoElement.currentTime;
      socketEmitters.pausedVideo({
        instance,
        playedSeconds,
        userData,
        caused: "manual",
      });
    }
  }

  async function onSeeked(currentTime: number) {
    if (isHost) await playerRef.current?.pause();
  }
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

  return (
    <MediaPlayer
      ref={playerRef}
      src={state.mediaSrc}
      playsInline
      className="text-white ring-media-focus absolute aspect-video h-dvh w-full overflow-hidden rounded-md bg-blackA11 font-sans data-[focus]:ring-4"
      autoPlay={false}
      onPlay={onPlay}
      onPause={onPause}
      onSeeked={onSeeked}
      keyDisabled
      onProviderChange={onProviderChange}
      // onWaiting={onWaiting}
      // onProgress={onCanPlayThrough}
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
