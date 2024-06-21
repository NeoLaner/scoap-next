import { useMediaRemote, type MediaPlayerInstance } from "@vidstack/react";
import { type RefObject } from "react";

function PlayerRemote({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  const remote = useMediaRemote(playerRef);
  return null;
}

export default PlayerRemote;
