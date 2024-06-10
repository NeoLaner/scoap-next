import { useContext } from "react";
import { PlayerContext } from "../_providers/PlayerProvider";

// Create a custom hook for accessing the app context
export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayerContext must be used within an PlayerProvider");
  }
  return context;
};
