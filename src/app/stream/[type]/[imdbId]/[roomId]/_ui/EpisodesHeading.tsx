"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { type Video } from "~/app/_services/stremIo/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useMetaData } from "~/app/_hooks/useMetaData";

const extractUniqueSeasons = (videos: Video[]) => {
  const seasons = new Set(videos.map((video) => video.season));
  return Array.from(seasons);
};

function EpisodesHeading() {
  const { roomData } = useRoomData();
  const searchParams = useSearchParams();
  const season = searchParams.get("season") ?? roomData.season ?? 1;
  console.log("season", season);

  const router = useRouter();
  const pathname = usePathname();
  const { metaData } = useMetaData();
  const { videos } = metaData;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const uniqueSeasons = extractUniqueSeasons(videos);
  if (season === null || season === undefined) return null;

  return (
    <div>
      <Select
        value={String(season)}
        onValueChange={(value) =>
          router.push(pathname + "?" + createQueryString("season", value))
        }
      >
        <SelectTrigger aria-label="Season" className="w-fit">
          <SelectValue placeholder="Select a season" />
        </SelectTrigger>
        <SelectContent>
          {uniqueSeasons.map((season) => (
            <SelectItem key={season} value={String(season)}>
              season {season}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default EpisodesHeading;
