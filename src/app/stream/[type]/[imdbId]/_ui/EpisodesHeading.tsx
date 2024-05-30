import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { type Video } from "~/app/_services/stremIo/types";

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

  return (
    <div className="flex items-center justify-center">
      <select
        value={Number(season)}
        onChange={(e) =>
          router.push(
            pathname + "?" + createQueryString("season", e.target.value),
          )
        }
      >
        {uniqueSeasons.map((season) => (
          <option key={season} value={season}>
            season {season}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EpisodesHeading;
