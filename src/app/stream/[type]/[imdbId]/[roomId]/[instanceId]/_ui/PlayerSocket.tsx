"use client";
import { type MediaPlayerInstance, useMediaRemote } from "@vidstack/react";
import { type RefObject, useEffect, useState } from "react";
import { useSocketListeners } from "~/app/_hooks/useSocketListeners";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { mediaSocket, userSocket } from "~/lib/socket/socket";
import type { MediaWsDataServerToClient } from "@socket/@types";

function PlayerSocket({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  const [playerRemoteState, setPlayerRemoteState] =
    useState<MediaWsDataServerToClient>();
  const remote = useMediaRemote(playerRef);

  useSocketListeners();

  //join-room
  useEffect(() => {
    socketEmitters.joinRoom(userSocket);
    socketEmitters.joinRoom(mediaSocket);
  }, []);

  useEffect(() => {
    mediaSocket.on("media", function (data: MediaWsDataServerToClient) {
      console.log("media event", data.payload.status);
      console.log(remote.getPlayer());

      if (data.payload.status === "paused") {
        console.log("pause");
        remote.seek(data.payload.playedSeconds!);
        remote.pause();
      } else if (data.payload.status === "played") {
        console.log("played");
        remote.seek(data.payload.playedSeconds!);
        remote.play();
      }
    });
  }, [remote]);

  return null;
}

export default PlayerSocket;
