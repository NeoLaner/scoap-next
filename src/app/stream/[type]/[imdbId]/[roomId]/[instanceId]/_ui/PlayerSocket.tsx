"use client";
import { type MediaPlayerInstance, useMediaRemote } from "@vidstack/react";
import { type RefObject, useEffect } from "react";
import { useSocketListeners } from "~/app/_hooks/useSocketListeners";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { mediaSocket, userSocket } from "~/lib/socket/socket";
import type { MediaWsDataServerToClient } from "@socket/@types";
import { useIsUserConnected } from "~/app/_hooks/useIsUserConnected";
import { useIsMediaConnected } from "~/app/_hooks/useIsMediaConnected";

function PlayerSocket({
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
    socketEmitters.joinRoom(userSocket);
  }, [isUserConnected]);

  //join-room
  useEffect(() => {
    socketEmitters.joinRoom(mediaSocket);
  }, [isMediaConnected]);

  useEffect(() => {
    mediaSocket.on("media", function (data: MediaWsDataServerToClient) {
      console.log("media event", data.payload.status);

      if (data.payload.status === "paused") {
        console.log("pause");
        const playedSeconds = data.payload.playedSeconds;
        if (playedSeconds) remote.seek(playedSeconds);
        remote.pause();
      }
      if (data.payload.status === "played") {
        console.log("played");
        const createdAt = data.payload.createdAt;
        const PLAY_AFTER_SECONDS = 500;
        if (createdAt) {
          const delay = Date.now() - createdAt;
          console.log("delay", delay);

          if (delay > 0)
            setTimeout(() => {
              remote.play();
            }, PLAY_AFTER_SECONDS - delay);
          else remote.play();
        }
      }
    });
  }, [remote]);

  return null;
}

export default PlayerSocket;
