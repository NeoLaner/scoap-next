import { useContext } from "react";
import { RoomSettingsContext } from "../_providers/RoomSettingsProvider";

export const useRoomSettings = () => {
  const context = useContext(RoomSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useRoomSettings must be used within a RoomSettingsProvider",
    );
  }
  return context;
};
