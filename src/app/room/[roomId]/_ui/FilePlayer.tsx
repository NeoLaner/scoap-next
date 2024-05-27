"use client";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import VideoLayout from "./VideoLayout";
import { usePlayerContext } from "~/app/_hooks/usePlayerProvider";

function FilePlayer() {
  const { state } = usePlayerContext();
  return (
    <MediaPlayer
      // src={state.mediaSrc}
      src={{
        src: "http://127.0.0.1:11470/f5d61bf3d57082ba2ee1305da5df8dcd10d34539/0",
        type: "video/mp4",
      }}
      autoPlay
      playsInline
      className="bg-black text-white ring-media-focus absolute aspect-video h-dvh w-full overflow-hidden font-sans data-[focus]:ring-4"
    >
      <MediaProvider>
        <Poster
          className="absolute inset-0 block h-full w-full object-cover opacity-0 transition-opacity data-[visible]:opacity-100"
          src={""}
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        />
        {/* {textTracks.map((track) => (
//@ts-ignore
<Track {...track} key={track.src} />
))} */}
      </MediaProvider>

      <VideoLayout disablePlay={false} />
    </MediaPlayer>
  );
}

export default FilePlayer;
