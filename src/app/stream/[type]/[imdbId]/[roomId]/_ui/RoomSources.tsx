"use client";

import { useUsersSourceData } from "~/app/_hooks/useUsersSourceData";
import { StreamSource } from "./StreamSource";

export function RoomSources({ roomId }: { roomId: string }) {
  return (
    <>
      {usersSourceData?.map((source) => (
        <StreamSource key={source.MediaSource.id} source={source.MediaSource} />
      ))}
    </>
  );
}
