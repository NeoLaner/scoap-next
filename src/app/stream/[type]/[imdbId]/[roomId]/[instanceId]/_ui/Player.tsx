"use client";
import { type MediaPlayerInstance } from "@vidstack/react";
import { useRef } from "react";
import PlayerMedia from "./PlayerMedia";
import PlayerSocket from "./PlayerSocket";

function Player() {
  const player = useRef<MediaPlayerInstance>(null);
  return (
    <>
      <PlayerMedia playerRef={player} />
      <PlayerSocket playerRef={player} />
    </>
  );
}

export default Player;
