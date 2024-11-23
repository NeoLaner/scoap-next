"use client";

import Image from "next/image";

import { updateEpisode } from "~/app/_actions/updateEpisode";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { mediaSocket } from "~/lib/socket/socket";
import { type Video } from "~/app/_services/stremIo/types";
import { useUserData } from "~/app/_hooks/useUserData";
import { toast } from "sonner";
import { cn, truncateText } from "~/lib/utils";

import { AspectRatio } from "~/app/_components/ui/aspect-ratio";

import { useState } from "react";
import { CircleCheck, CirclePlay } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/app/_components/ui/accordion";

import { useGetRightPanelSize } from "~/app/_hooks/useGetRightPanelSize";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "short", day: "numeric" } as const;
  return date.toLocaleDateString("en-US", options);
};

type EpisodesBySeason = Record<string, Video[]>;

function Episodes({ className = "" }: { className?: string }) {
  const { roomData } = useRoomData();

  const { metaData } = useMetaData();

  const episodesBySeason = {} as EpisodesBySeason;

  metaData.videos.forEach((video) => {
    const currentSeason = episodesBySeason[video.season];
    episodesBySeason[video.season] = currentSeason
      ? [...currentSeason, video]
      : [video];
  });

  return (
    <div
      className={`${className} relative flex flex-col gap-2  rounded-lg bg-background `}
    >
      <Accordion
        type="single"
        collapsible
        defaultValue={String(roomData.season)}
      >
        {Object.keys(episodesBySeason).map((season) => (
          <SeasonItem
            key={season}
            season={season}
            episodesBySeason={episodesBySeason}
          />
        ))}
      </Accordion>
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
    if (roomData.ownerId !== userData?.id)
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
        <div
          className={cn(
            "relative pl-1 text-xl font-bold text-muted-foreground",
            isSelected && "text-success-foreground",
          )}
        >
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

function SeasonItem({
  season,
  episodesBySeason,
}: {
  season: string;
  episodesBySeason: EpisodesBySeason;
}) {
  const { roomData } = useRoomData();
  const { rightPanelWidth } = useGetRightPanelSize();
  const isSeasonSelected = String(roomData.season) === season;
  return (
    <AccordionItem value={season}>
      <AccordionTrigger className="hover:no-underline">
        <div
          className={cn(
            "flex items-center gap-2 pl-1 ",
            isSeasonSelected && "text-success-foreground",
          )}
        >
          Season{" "}
          {season.toString().padStart(2, "0") === "00"
            ? "Special"
            : season.toString().padStart(2, "0")}
          <span className="text-xs text-muted-foreground">
            {episodesBySeason[season]?.length} Episodes
          </span>
        </div>
      </AccordionTrigger>
      {episodesBySeason[season]
        ?.sort((a, b) => a.number - b.number)
        .map((episode) => (
          <AccordionContent key={episode.number}>
            <Episode episode={episode} />
          </AccordionContent>
        ))}
    </AccordionItem>
  );
}

interface EpisodeProps {
  episode: number;
}

const EpisodeDisplay: React.FC<EpisodeProps> = ({ episode }) => {
  // Convert the number to a string and pad with zeros if necessary
  const formattedEpisode = episode.toString().padStart(2, "0");
  const { rightPanelWidth } = useGetRightPanelSize();

  return (
    <div
      className={cn(
        "relative bottom-0 left-0 z-10 px-6 text-lg text-muted-foreground",
        "text-inherit",
        rightPanelWidth < 360 && "absolute",
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
