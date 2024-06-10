import { useContext } from "react";
import { RoomDataContext } from "../_providers/RoomDataProvider";

export const useRoomData = () => {
  const context = useContext(RoomDataContext);
  if (context === undefined) {
    throw new Error("useRoomData must be used within a RoomDataProvider");
  }
  return context;
};
