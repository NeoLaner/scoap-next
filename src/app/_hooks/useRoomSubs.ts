import { useContext } from "react";
import { SubsContext } from "../_providers/RoomSubsProvider";

export const useRoomSubs = () => {
  const context = useContext(SubsContext);
  if (context === undefined) {
    throw new Error("useRoomSubs must be used within a RoomSubsDataProvider");
  }
  return context;
};
