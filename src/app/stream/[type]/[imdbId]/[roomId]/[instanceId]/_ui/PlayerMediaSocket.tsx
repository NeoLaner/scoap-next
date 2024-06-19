"use client";
import { type MediaPlayerInstance, useMediaRemote } from "@vidstack/react";
import { type RefObject, useEffect } from "react";
import { useSocketListeners } from "~/app/_hooks/useSocketListeners";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { mediaSocket } from "~/lib/socket/socket";
import type { WsDataStC } from "@socket/@types";
import { useIsUserConnected } from "~/app/_hooks/useIsUserConnected";
import { useIsMediaConnected } from "~/app/_hooks/useIsMediaConnected";
import { EVENT_NAMES } from "~/lib/socket/EVENT_NAMES";

function PlayerMediaSocket({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  const { isMediaConnected } = useIsMediaConnected();

  useSocketListeners();

  //join-room
  //bug
  useEffect(() => {
    if (isMediaConnected) {
      console.log(isMediaConnected);

      socketEmitters.joinRoom(mediaSocket);
    }
  }, []);

  useEffect(() => {
    mediaSocket.on(
      EVENT_NAMES.UpdateUserMediaState,
      function (data: WsDataStC<"updateUserMediaState">) {
        console.log(data);
      },
    );
  }, []);

  return null;
}

export default PlayerMediaSocket;
