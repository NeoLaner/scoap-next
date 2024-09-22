"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { updateEpisode } from "~/app/_actions/updateEpisode";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { mediaSocket } from "~/lib/socket/socket";
import { type Video } from "~/app/_services/stremIo/types";
import { useUserData } from "~/app/_hooks/useUserData";
import { toast } from "sonner";
import { cn, truncateText } from "~/lib/utils";
import { Separator } from "~/app/_components/ui/separator";
import { AspectRatio } from "~/app/_components/ui/aspect-ratio";

import { useState } from "react";
import { CircleCheck, CirclePlay } from "lucide-react";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "short", day: "numeric" } as const;
  return date.toLocaleDateString("en-US", options);
};

function Episodes({ className = "" }: { className?: string }) {
  const searchParams = useSearchParams();
  const { roomData, setRoomData } = useRoomData();

  const season = searchParams.get("season") ?? roomData.season ?? 1;
  const { metaData } = useMetaData();

  const episodesOfSeason = metaData.videos.filter(
    (video) => video.season === Number(season),
  );

  const episodesOfSeasonSorted = episodesOfSeason.sort(
    (a, b) => a.number - b.number,
  );
  return (
    <div
      className={`${className} relative flex flex-col gap-2  rounded-lg bg-background `}
    >
      {/* Episodes */}
      {episodesOfSeasonSorted?.map((episode) => (
        <Episode key={episode.number} episode={episode} />
      ))}
    </div>
  );
}

export default Episodes;

function Episode({ episode }: { episode: Video }) {
  const { userData } = useUserData();
  const [isPending, setIsPending] = useState(false);

  const { roomData, setRoomData } = useRoomData();
  const isSelected =
    roomData.episode === episode.episode && roomData.season === episode.season;

  async function handleOnClick(episode: Video) {
    if (
      roomData.episode === episode.episode &&
      roomData.season === episode.season
    )
      return null;
    if (roomData.ownerId !== userData.id)
      return toast.error("Only the host can change the episode");
    setIsPending(true);
    const updatedRoomData = await updateEpisode({
      roomId: roomData.id,
      name: roomData.name,
      type: "series",
      episode: episode.episode,
      season: episode.season,
    });
    setIsPending(false);
    if (updatedRoomData) {
      setRoomData(updatedRoomData);

      //send the updated data to other users
      mediaSocket.emit("roomDataChanged", {
        payload: updatedRoomData,
      });
    }
  }
  return (
    <>
      <div
        className={cn(
          "z-10 flex items-center justify-start gap-2 rounded-l  py-4 text-start",
          isSelected && "text-success-foreground",
        )}
      >
        <div className="relative pl-1 text-xl font-bold text-muted-foreground">
          <EpisodeDisplay episode={episode.number} />
        </div>
        <div
          onClick={() => handleOnClick(episode)}
          className={cn(
            "w-[140px]  overflow-hidden rounded-md  hover:cursor-pointer ",
            isPending ? "hover:cursor-not-allowed" : "hover:cursor-pointer",
          )}
        >
          <ImageWithFallback episode={episode} isSelected={isSelected} />
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col justify-between gap-2",
            isSelected,
          )}
        >
          {truncateText(episode.name, 20)}

          <div className="text-xs font-bold text-muted-foreground">
            {formatDate(episode.released)}
          </div>
          {/* <div className="text-xs">{episode.description}</div> */}
        </div>
      </div>
      {/* {episodesOfSeason.length !== episode.number && <Separator />} */}
    </>
  );
}

interface EpisodeProps {
  episode: number;
}

const EpisodeDisplay: React.FC<EpisodeProps> = ({ episode }) => {
  // Convert the number to a string and pad with zeros if necessary
  const formattedEpisode = episode.toString().padStart(2, "0");

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 z-10 px-6 text-lg text-muted-foreground",
        "xs:relative",
      )}
    >
      {formattedEpisode}
    </div>
  );
};

const ImageWithFallback: React.FC<{ episode: Video; isSelected: boolean }> = ({
  episode,
  isSelected,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AspectRatio
      ratio={16 / 9}
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-md border ",
      )}
    >
      {isSelected ? (
        <CircleCheck className="absolute z-50" />
      ) : (
        <CirclePlay className="absolute z-50" />
      )}

      {/* {hasError && <BsImage size={30} />} */}
      {isLoading && <div className="loader-spinner" />}
      {!hasError && (
        <Image
          src={episode.thumbnail}
          alt={episode.name}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          onLoad={() => setIsLoading(false)}
          fill
          className="h-auto w-auto opacity-70"
          sizes="100%"
          quality={50}
        />
      )}
    </AspectRatio>
  );
};
