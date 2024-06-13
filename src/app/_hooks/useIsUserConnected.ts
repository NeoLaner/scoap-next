import { useEffect, useState } from "react";
import { userSocket } from "~/lib/socket/socket";

export function useIsUserConnected() {
  const [isUserConnected, setIsUserConnected] = useState(userSocket.connected);
  useEffect(
    function () {
      userSocket.on("disconnect", () => {
        setIsUserConnected(false);
      });
      userSocket.on("connect", () => {
        setIsUserConnected(true);
      });
    },
    [setIsUserConnected],
  );
  return { isUserConnected };
}
