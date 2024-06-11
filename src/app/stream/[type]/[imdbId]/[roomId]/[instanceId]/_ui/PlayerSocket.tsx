"use client";
import { useMediaRemote, useMediaStore } from "@vidstack/react";
import { useEffect, useState } from "react";
import { useSocketListeners } from "~/app/_hooks/useSocketListeners";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { mediaSocket, userSocket } from "~/lib/socket/socket";
import type { MediaWsDataServerToClient } from "@socket/@types";
import { useInstanceData } from "~/app/_hooks/useInstanceData";
import { useUserData } from "~/app/_hooks/useUserData";

function PlayerSocket() {
  const { instanceData } = useInstanceData();
  const { userData } = useUserData();
  const [playerRemoteState, setPlayerRemoteState] =
    useState<MediaWsDataServerToClient>();
  const remote = useMediaRemote();
  const store = useMediaStore();

  useEffect(
    function () {
      socketEmitters.pausedVideo({
        caused: "manual",
        instance: instanceData?.id,
        playedSeconds: 10,
        userData,
      });
    },
    [store.paused],
  );

  useSocketListeners();
  //join-room
  useEffect(() => {
    socketEmitters.joinRoom(userSocket);
    socketEmitters.joinRoom(mediaSocket);
  }, []);

  useEffect(() => {
    mediaSocket.on("media", function (data: MediaWsDataServerToClient) {
      console.log(231);

      setPlayerRemoteState({ data });
    });
  }, []);

  useEffect(() => {
    if (playerRemoteState?.payload.status === "paused") remote.pause();
    else remote.play();
  }, [playerRemoteState]);

  return null;
}

export default PlayerSocket;
