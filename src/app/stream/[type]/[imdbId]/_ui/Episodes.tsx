"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { type Video } from "~/app/_services/stremIo/types";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";
import EpisodesHeading from "./EpisodesHeading";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "short", day: "numeric" } as const;
  return date.toLocaleDateString("en-US", options);
};

function Episodes({ videos }: { videos: Video[] }) {
  const searchParams = useSearchParams();
  const season = searchParams.get("season");

  if (!season) return null;

  const episodesOfSeason = videos.filter(
    (video) => video.season === Number(season),
  );

  return (
    <div className="absolute right-0 top-[96px] h-full w-full bg-app-color-gray-1 md:w-[420px]">
      {/* heading */}
      <EpisodesHeading videos={videos} />
      {/* Episodes */}
      <div className="h-full pb-[150px]">
        <ScrollAreaY>
          <div className="flex h-full flex-col gap-6 ">
            {episodesOfSeason.map((episode) => (
              <div key={episode.episode} className="flex items-center gap-4">
                <div>
                  <Image
                    src={episode.thumbnail}
                    alt={episode.name}
                    width={112}
                    height={70}
                  />
                </div>
                <div className="flex flex-col justify-between gap-2">
                  {episode.episode}.{episode.name}
                  <div className="text-xs">
                    {formatDate(episode.firstAired)}{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollAreaY>
      </div>
    </div>
  );
}

export default Episodes;
