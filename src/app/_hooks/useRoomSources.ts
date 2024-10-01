import { useContext } from "react";
import { SourcesDataContext } from "../_providers/RoomSourcesDataProvider";

export const useRoomSources = () => {
  const context = useContext(SourcesDataContext);
  if (context === undefined) {
    throw new Error(
      "useRoomSources must be used within a RoomSourcesDataProvider",
    );
  }
  return context;
};
