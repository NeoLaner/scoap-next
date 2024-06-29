"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import EpisodesHeading from "./EpisodesHeading";
import { updateEpisode } from "~/app/_actions/updateEpisode";
import invalidateInstanceData from "~/app/_actions/invalidateInstanceData";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { useMetaData } from "~/app/_hooks/useMetaData";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "short", day: "numeric" } as const;
  return date.toLocaleDateString("en-US", options);
};

function Episodes({ className = "" }: { className?: string }) {
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  const { roomData } = useRoomData();
  const { metaData } = useMetaData();

  const episodesOfSeason = metaData.videos.filter(
    (video) => video.season === Number(season),
  );
  // `?season=${season}&episode=${episode.episode}&showStreams="true"`
  return (
    <div
      className={`${className} relative h-full  rounded-lg bg-background py-4`}
    >
      {/* heading */}
      <EpisodesHeading videos={metaData.videos} />
      {/* Episodes */}
      <div className="h-full pt-16">
        <ScrollArea className="h-full">
          <div className="mx-4 flex h-fit flex-col gap-2">
            {episodesOfSeason?.map((episode) => (
              <div
                onClick={async () => {
                  if (
                    roomData.episode === episode.episode &&
                    roomData.season === episode.season
                  )
                    return null;
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
                // variant={"outline"}
                key={episode.episode}
                className={`${
                  roomData.episode === episode.episode &&
                  roomData.season === episode.season
                    ? "border-green-400"
                    : ""
                } flex items-center justify-start gap-4 border text-start hover:cursor-pointer`}
              >
                <div className="h-[70px] overflow-hidden rounded-md ">
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
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default Episodes;
