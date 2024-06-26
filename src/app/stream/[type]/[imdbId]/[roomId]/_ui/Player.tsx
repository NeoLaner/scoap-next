"use client";
import { type MediaPlayerInstance } from "@vidstack/react";
import { useRef } from "react";
import PlayerMedia from "./PlayerMedia";
import PlayerTogetherAddon from "./PlayerTogetherAddon";
import { useRoomData } from "~/app/_hooks/useRoomData";

function Player() {
  const player = useRef<MediaPlayerInstance>(null);
  const { roomData } = useRoomData();

  return (
    <>
      <PlayerMedia playerRef={player} />
      {roomData.online && <PlayerTogetherAddon playerRef={player} />}
    </>
  );
}

export default Player;
