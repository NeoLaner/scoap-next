"use client";
import { type MediaPlayerInstance } from "@vidstack/react";
import { useRef } from "react";
import PlayerMedia from "./PlayerMedia";
import PlayerMediaSocket from "./PlayerMediaSocket";
import PlayerUsersSocket from "./PlayerUsersSocket";

function Player() {
  const player = useRef<MediaPlayerInstance>(null);
  return (
    <>
      <PlayerMedia playerRef={player} />
      <PlayerMediaSocket playerRef={player} />
      <PlayerUsersSocket />
    </>
  );
}

export default Player;
