"use client";

import { useUsersSourceData } from "~/app/_hooks/useUsersSourceData";
import { StreamSource } from "./StreamSource";

export async function UsersSource({ roomId }: { roomId: string }) {
  const { usersSourceData } = useUsersSourceData();
  return (
    <div className="space-y-2">
      {usersSourceData?.map((source) => (
        <StreamSource key={source.MediaSource.id} source={source.MediaSource} />
      ))}
    </div>
  );
}
