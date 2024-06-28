import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { type ReactNode, useCallback, type LegacyRef } from "react";
import { type Video } from "~/app/_services/stremIo/types";
import classnames from "classnames";
import { Button } from "~/app/_components/ui/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";

const extractUniqueSeasons = (videos: Video[]) => {
  const seasons = new Set(videos.map((video) => video.season));
  return Array.from(seasons);
};

function EpisodesHeading({ videos }: { videos: Video[] }) {
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  const router = useRouter();
  const pathname = usePathname();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const uniqueSeasons = extractUniqueSeasons(videos);
  if (!season) return null;

  function handleOnClick() {
    router.push(pathname);
  }

  return (
    <div className="absolute top-0 flex w-full items-center justify-between px-2 py-5">
      <Button onClick={handleOnClick}>X</Button>
      <Select
        value={season}
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
