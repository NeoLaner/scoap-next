"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { type Video } from "~/app/_services/stremIo/types";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";
import EpisodesHeading from "./EpisodesHeading";
import Link from "next/link";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "short", day: "numeric" } as const;
  return date.toLocaleDateString("en-US", options);
};

function Episodes({
  videos,
  className,
}: {
  videos: Video[];
  className: string;
}) {
  const searchParams = useSearchParams();
  const season = searchParams.get("season");

  if (!season) return null;

  const episodesOfSeason = videos.filter(
    (video) => video.season === Number(season),
  );

  return (
    <div
      className={`${className}  h-full w-full rounded-lg bg-app-color-gray-1 pl-6 `}
    >
      {/* heading */}
      <EpisodesHeading videos={videos} />
      {/* Episodes */}
      <div className="h-full">
        <ScrollAreaY>
          <div className="flex h-full flex-col gap-6 ">
            {episodesOfSeason.map((episode) => (
              <Link
                href={`?season=${season}&episode=${episode.episode}&showStreams="true"`}
                key={episode.episode}
                className="flex items-center gap-4"
              >
                <div className="h-[70px] overflow-hidden rounded-md">
                  {/* <Image
                    src={episode.thumbnail}
                    alt={episode.name}
                    width={112}
                    height={70}
                    className="h-[70px] w-28"
                  /> */}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-2">
                  {episode.episode}.{episode.name}
                  <div className="text-xs">
                    {formatDate(episode.firstAired)}{" "}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollAreaY>
      </div>
    </div>
  );
}

export default Episodes;
