"use client";

import { useRoomSources } from "~/app/_hooks/useRoomSources";
import { StreamSource } from "./StreamSource";

export function RoomSources() {
  const { roomSourcesData } = useRoomSources();

  return (
    <div className="space-y-2">
      {roomSourcesData?.map((mediaSource) => (
        <StreamSource key={mediaSource.id} source={mediaSource} />
      ))}
    </div>
  );
}
