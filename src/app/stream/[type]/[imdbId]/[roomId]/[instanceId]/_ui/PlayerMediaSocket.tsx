"use client";
import { type MediaPlayerInstance, useMediaRemote } from "@vidstack/react";
import { type RefObject, useEffect } from "react";
import { useSocketListeners } from "~/app/_hooks/useSocketListeners";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { mediaSocket, userSocket } from "~/lib/socket/socket";
import type { MediaWsDataServerToClient } from "@socket/@types";
import { useIsUserConnected } from "~/app/_hooks/useIsUserConnected";
import { useIsMediaConnected } from "~/app/_hooks/useIsMediaConnected";

function PlayerMediaSocket({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  const { isUserConnected } = useIsUserConnected();
  const { isMediaConnected } = useIsMediaConnected();
  const remote = useMediaRemote(playerRef);

  useSocketListeners();
  //join-room
  useEffect(() => {
    socketEmitters.joinRoom(mediaSocket);
  }, [isMediaConnected]);

  return null;
}

export default PlayerMediaSocket;
