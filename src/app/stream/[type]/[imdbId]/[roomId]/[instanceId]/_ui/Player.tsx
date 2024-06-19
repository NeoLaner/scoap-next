"use client";
import { type MediaPlayerInstance } from "@vidstack/react";
import { useRef } from "react";
import PlayerMedia from "./PlayerMedia";
import PlayerMediaSocket from "./PlayerMediaSocket";
import PlayerUsersSocket from "./PlayerUsersSocket";
import PlayerSocket from "./PlayerSocket";
import { useParams } from "next/navigation";

function Player() {
  const { instanceId } = useParams();
  const player = useRef<MediaPlayerInstance>(null);
  return (
    <>
      <PlayerMedia playerRef={player} />
      <PlayerSocket urlRoomId={instanceId} />
    </>
  );
}

export default Player;
