"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import EpisodesHeading from "./EpisodesHeading";
import { updateEpisode } from "~/app/_actions/updateEpisode";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { mediaSocket } from "~/lib/socket/socket";
import { Video } from "~/app/_services/stremIo/types";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "short", day: "numeric" } as const;
  return date.toLocaleDateString("en-US", options);
};

function Episodes({ className = "" }: { className?: string }) {
  const searchParams = useSearchParams();
  const { roomData, setRoomData } = useRoomData();
  const season = searchParams.get("season") ?? roomData.season;
  const { metaData } = useMetaData();

  const episodesOfSeason = metaData.videos.filter(
    (video) => video.season === Number(season),
  );

  async function handleOnClick(episode: Video) {
    if (
      roomData.episode === episode.episode &&
      roomData.season === episode.season
    )
      return null;
    const updatedRoomData = await updateEpisode({
      roomId: roomData.id,
      name: roomData.name,
      type: "series",
      episode: episode.episode,
      season: episode.season,
    });
    if (updatedRoomData) {
      setRoomData(updatedRoomData);
      //send the updated data to other users
      mediaSocket.emit("roomDataChanged", {
        payload: updatedRoomData,
      });
    }
  }
  return (
    <div
      className={`${className} relative flex flex-col gap-2  rounded-lg bg-background `}
    >
      {/* Episodes */}
      {episodesOfSeason?.map((episode) => (
        <div
          onClick={() => handleOnClick(episode)}
          // variant={"outline"}
          key={episode.episode}
          className={`${
            roomData.episode === episode.episode &&
            roomData.season === episode.season
              ? "border-green-400  hover:cursor-not-allowed"
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
            <div className="text-xs">{formatDate(episode.firstAired)} </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Episodes;
