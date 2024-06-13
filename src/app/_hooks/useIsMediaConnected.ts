import { useEffect, useState } from "react";
import { mediaSocket } from "~/lib/socket/socket";

export function useIsMediaConnected() {
  const [isMediaConnected, setIsMediaConnected] = useState(
    mediaSocket.connected,
  );
  useEffect(
    function () {
      mediaSocket.on("disconnect", () => {
        setIsMediaConnected(false);
      });
      mediaSocket.on("connect", () => {
        setIsMediaConnected(true);
      });
    },
    [setIsMediaConnected],
  );
  return { isMediaConnected };
}
