import { useEffect } from "react";
import { useRoomSettings } from "./useRoomSettings";
import { toast } from "sonner";
import { serverMessagesContent } from "../stream/[type]/[imdbId]/[roomId]/_ui/ServerMessages";
import eventEmitter from "~/lib/eventEmitter/eventEmitter";

function useServerMessages() {
  const { roomSettings } = useRoomSettings();
  const { isRightPanelOpen, currentTab } = roomSettings;

  useEffect(() => {
    const unbind = eventEmitter.on("server:message", (id) => {
      console.log("boom");
      if (!isRightPanelOpen || (isRightPanelOpen && currentTab !== "chat")) {
        id === "ONLINE" && toast.success(serverMessagesContent.ONLINE);
        id === "OFFLINE" && toast.warning(serverMessagesContent.OFFLINE);
        id === "NO_SOURCE" && toast.warning(serverMessagesContent.NO_SOURCE);
      }
    });

    return () => {
      unbind();
    };
  }, []);
}

export default useServerMessages;
