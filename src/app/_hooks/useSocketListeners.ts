"use client";
import { useEffect } from "react";
import { chatSocket, mediaSocket } from "~/lib/socket/socket";
import { useParams } from "next/navigation";

//get real-time updates from server
export function useSocketListeners() {
  const instanceId = useParams().instanceId!;

  useEffect(function () {
    mediaSocket.auth = {
      instanceId,
    };
    chatSocket.auth = {
      instanceId,
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
