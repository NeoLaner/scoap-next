"use client";
import { useEffect, useState } from "react";
import { useSocketListeners } from "~/app/_hooks/useSocketListeners";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { mediaSocket, userSocket } from "~/lib/socket/socket";

function PlayerSocket() {
  useSocketListeners();
  //join-room
  const [hasRunEffect, setHasRunEffect] = useState(false);
  useEffect(() => {
    socketEmitters.joinRoom(userSocket);
    socketEmitters.joinRoom(mediaSocket);
  }, []);
  return null;
}

export default PlayerSocket;
