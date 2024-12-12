import { useContext } from "react";
import { PlayerRefContext } from "../_providers/PlayerRefProvider";

// Create a custom hook for accessing the app context
export const usePlayerRef = () => {
  const context = useContext(PlayerRefContext);
  if (context === undefined) {
    throw new Error("usePlayerRef must be used within an PlayerRefProvider");
  }
  return context;
};
