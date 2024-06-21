"use client";
import { type MediaPlayerInstance } from "@vidstack/react";
import { useRef } from "react";
import PlayerMedia from "./PlayerMedia";
import PlayerTogetherAddon from "./PlayerTogetherAddon";
import { useInstanceData } from "~/app/_hooks/useInstanceData";
import PlayerReceiver from "./PlayerReceiver";

function Player() {
  const player = useRef<MediaPlayerInstance>(null);
  const { instanceData } = useInstanceData();

  return (
    <>
      <PlayerMedia playerRef={player} />
      {instanceData.online && <PlayerTogetherAddon playerRef={player} />}
    </>
  );
}

export default Player;
