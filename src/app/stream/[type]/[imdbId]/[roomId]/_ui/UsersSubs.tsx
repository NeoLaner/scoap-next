"use client";

import { useUsersSubData } from "~/app/_hooks/useUsersSub";
import { Subtitle } from "./Subtitle";

export function UsersSubs() {
  const { usersSubData } = useUsersSubData();

  // Create a Set to store unique ids
  const seenIds = new Set();

  // Filter the usersSourceData to remove duplicates based on MediaSource.id
  const uniqueUsersSourceDataArray = usersSubData?.filter((userSource) => {
    const mediaSourceId = userSource?.SubtitleSource?.id;
    if (mediaSourceId && !seenIds.has(mediaSourceId)) {
      seenIds.add(mediaSourceId);
      return true; // Keep this entry
    }
    return false; // Filter out this entry
  });

  return (
    <div className="space-y-2">
      {uniqueUsersSourceDataArray?.map((source) => {
        if (!source.SubtitleSource) return null;
        return (
          <Subtitle
            key={source.SubtitleSource?.id}
            source={source.SubtitleSource}
          />
        );
      })}
    </div>
  );
}
