"use client";
import { type MediaPlayerInstance } from "@vidstack/react";
import { useRef } from "react";
import PlayerMedia from "./PlayerMedia";
import PlayerMediaSocket from "./PlayerMediaSocket";
import PlayerUsersSocket from "./PlayerUsersSocket";
import { useSocketListeners } from "~/app/_hooks/useSocketListeners";

function Player() {
  const player = useRef<MediaPlayerInstance>(null);
  useSocketListeners();
  return (
    <>
      <PlayerMedia playerRef={player} />
    </>
  );
}

export default Player;
