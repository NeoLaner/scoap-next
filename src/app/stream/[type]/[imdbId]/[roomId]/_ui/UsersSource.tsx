"use client";

import { useUsersSourceData } from "~/app/_hooks/useUsersSourceData";
import { StreamSource } from "./StreamSource";

export function UsersSource({ roomId }: { roomId: string }) {
  const { usersSourceData } = useUsersSourceData();

  // Create a Set to store unique ids
  const seenIds = new Set();

  // Filter the usersSourceData to remove duplicates based on MediaSource.id
  const uniqueUsersSourceDataArray = usersSourceData?.filter((userSource) => {
    const mediaSourceId = userSource?.MediaSource?.id;
    if (mediaSourceId && !seenIds.has(mediaSourceId)) {
      seenIds.add(mediaSourceId);
      return true; // Keep this entry
    }
    return false; // Filter out this entry
  });

  return (
    <div className="space-y-2">
      {uniqueUsersSourceDataArray?.map((source) => (
        <StreamSource key={source.MediaSource.id} source={source.MediaSource} />
      ))}
    </div>
  );
}
