"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { type Video } from "~/app/_services/stremIo/types";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";
import EpisodesHeading from "./EpisodesHeading";
import { updateEpisode } from "~/app/_actions/updateEpisode";
import invalidateInstanceData from "~/app/_actions/invalidateInstanceData";
import { useRoomData } from "~/app/_hooks/useRoomData";

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
  const { roomData } = useRoomData();

  if (!season) return null;

  const episodesOfSeason = videos.filter(
    (video) => video.season === Number(season),
  );
  // `?season=${season}&episode=${episode.episode}&showStreams="true"`
  return (
    <div
      className={`${className}  h-full w-full rounded-lg bg-background pl-6 `}
    >
      {/* heading */}
      <EpisodesHeading videos={videos} />
      {/* Episodes */}
      <div className="h-full">
        <ScrollAreaY>
          <div className="flex h-full flex-col gap-6 ">
            {episodesOfSeason.map((episode) => (
              <Button
                onClick={async () => {
                  await updateEpisode({
                    roomId: roomData.id,
                    name: roomData.name,
                    type: "series",
                    episode: episode.episode,
                    season: episode.season,
                  });
                  await invalidateInstanceData(roomData.id);
                  //emit invalidate event
                }}
                key={episode.episode}
                className="flex items-center justify-start gap-4 text-start"
                disabled={
                  roomData.episode === episode.episode &&
                  roomData.season === episode.season
                }
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
              </Button>
            ))}
          </div>
        </ScrollAreaY>
      </div>
    </div>
  );
}

export default Episodes;
