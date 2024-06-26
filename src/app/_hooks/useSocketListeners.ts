"use client";
import { useEffect } from "react";
import { chatSocket, mediaSocket } from "~/lib/socket/socket";
import { useParams } from "next/navigation";

//get real-time updates from server
export function useSocketListeners() {
  const roomId = useParams().roomId!;

  useEffect(function () {
    mediaSocket.auth = {
      roomId,
    };
    chatSocket.auth = {
      roomId,
    };

    // socket.connect();
    mediaSocket.connect();
    chatSocket.connect();
    //User

    //Chat
    // chatSocket.on("chat");

    return () => {
      mediaSocket.disconnect();
      chatSocket.disconnect();
      console.log("unmounting");
    };
  }, []);
}
