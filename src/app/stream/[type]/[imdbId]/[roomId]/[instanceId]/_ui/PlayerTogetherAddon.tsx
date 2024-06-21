import { type MediaPlayerInstance } from "@vidstack/react";
import { type RefObject } from "react";
import { useSocketListeners } from "~/app/_hooks/useSocketListeners";
import PlayerRemote from "./PlayerRemote";

function PlayerTogetherAddon({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  useSocketListeners();

  return <PlayerRemote playerRef={playerRef} />;
}

export default PlayerTogetherAddon;
