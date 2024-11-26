import { type ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { checkIsDynamic, createUrlFromPrats } from "~/lib/source";
import { cn } from "~/lib/utils";
import { type api } from "~/trpc/server";

type MediaSource = NonNullable<Awaited<ReturnType<typeof api.mediaSource.get>>>;

export const SubtitleIcon = function ({ source }: { source: MediaSource }) {
  const text = source.hardsub ? "hcc" : "cc";

  return <IconText disable={!source.hardsub}>{text}</IconText>;
};

export const QualityIcon = function ({ source }: { source: MediaSource }) {
  let text;
  switch (source.quality) {
    case "360":
      text = "sd";
      break;
    case "480":
      text = "sd";
      break;
    case "720":
      text = "hd";
      break;
    case "1080":
      text = "fhd";
      break;
    case "1440":
      text = "qhd";
      break;
    case "2160":
      text = "uhd";
      break;
    default:
      text = "FHD";
      break;
  }
  return <IconText disable={!source.quality}>{text}</IconText>;
};

export const QualityTypeIcon = function ({ source }: { source: MediaSource }) {
  let text;
  switch (source.qualityType) {
    case "BluRay":
      text = "blu";
      break;
    case "WebDl":
      text = "web";
      break;
    case "CAM":
      text = "cam";
      break;
    default:
      text = "cam";
      break;
  }
  return <IconText disable={!source.quality}>{text}</IconText>;
};

export const IconText = function ({
  className,
  disable = false,
  children,
}: {
  className?: string;
  disable?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        `mx-[0.1rem] h-fit w-[1.8rem] select-none self-center rounded-[2px] px-[1px] text-center text-[0.68rem]  font-bold uppercase leading-4`,
        disable
          ? "bg-foreground/50 text-background"
          : "bg-foreground text-background",
        className,
      )}
    >
      {children}
    </div>
  );
};

export function DynamicIcon({ source }: { source: MediaSource }) {
  const { roomData } = useRoomData();
  const outOfBoundary =
    roomData.season && !source.seasonBoundary.includes(roomData.season);
  const isDynamic = checkIsDynamic(
    createUrlFromPrats({
      protocol: source.protocol,
      domain: source.domain,
      pathname: source.pathname,
    }),
  );
  return (
    <TooltipProvider>
      <Tooltip delayDuration={500}>
        <TooltipTrigger>
          <IconText
            disable={!isDynamic}
            className={cn(outOfBoundary && "bg-danger-foreground")}
          >
            dyn
          </IconText>
        </TooltipTrigger>
        {isDynamic && (
          <TooltipContent>
            <p>
              This source just included{" "}
              <span className="text-danger-foreground">
                {source.seasonBoundary.length > 1 ? "seasons" : "season"}{" "}
                {source.seasonBoundary.join(", ")}
              </span>
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
