import { useEffect, useState } from "react";
import { chatSocket } from "~/lib/socket/socket";

export function useIsChatConnected() {
  const [isChatConnected, setIsChatConnected] = useState(chatSocket.connected);
  useEffect(
    function () {
      chatSocket.on("disconnect", () => {
        setIsChatConnected(false);
      });
      chatSocket.on("connect", () => {
        setIsChatConnected(true);
      });
    },
    [setIsChatConnected],
  );
  return { isChatConnected };
}
