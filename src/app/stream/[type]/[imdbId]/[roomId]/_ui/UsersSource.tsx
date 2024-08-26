"use client";

import { useUsersSourceData } from "~/app/_hooks/useUsersSourceData";
import { StreamSource } from "./StreamSource";

export function UsersSource({ roomId }: { roomId: string }) {
  const { usersSourceData } = useUsersSourceData();
  return (
    <>
      {usersSourceData?.map((source) => (
        <StreamSource key={source.MediaSource.id} source={source.MediaSource} />
      ))}
    </>
  );
}
