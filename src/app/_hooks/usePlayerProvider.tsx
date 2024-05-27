import { useContext } from "react";
import { PlayerContext } from "../_providers/PlayerProvider";

// Create a custom hook for accessing the app context
export const useRoomUiContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("useRoomUiContext must be used within an RoomUiProvider");
  }
  return context;
};
