import { useContext } from "react";
import { InstanceDataContext } from "../_providers/InstanceDataProivder";

export const useInstanceData = () => {
  const context = useContext(InstanceDataContext);
  if (context === undefined) {
    throw new Error("useRoomData must be used within a RoomDataProvider");
  }
  return context;
};
