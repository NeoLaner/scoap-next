"use client";

import { useRoomSources } from "~/app/_hooks/useRoomSources";
import { StreamSource } from "./StreamSource";
import { StreamsHeadingType } from "./StreamsHeadingType";

export function RoomSources() {
  const { roomSourcesData } = useRoomSources();

  return (
    <>
      {roomSourcesData?.length !== 0 && (
        <StreamsHeadingType heading="Room sources" />
      )}
      <div className="space-y-2">
        {roomSourcesData?.map((mediaSource) => (
          <StreamSource key={mediaSource.id} source={mediaSource} />
        ))}
      </div>
    </>
  );
}
