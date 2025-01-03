"use client";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import {
  CaptionButton,
  isTrackCaptionKind,
  MuteButton,
  PIPButton,
  PlayButton,
  useMediaRemote,
  useMediaState,
  useMediaStore,
  type TooltipPlacement,
} from "@vidstack/react";

import {
  PiCardsThree,
  PiCardsThreeFill,
  PiChatsLight,
  PiClosedCaptioningBold,
  PiPauseCircleFill,
  PiPlayCircleFill,
  PiQueueBold,
  PiQueueDuotone,
  PiSelectionBackgroundDuotone,
  PiSelectionForegroundDuotone,
  PiShareBold,
  PiSpeakerHighFill,
  PiSpeakerLowFill,
  PiSpeakerXFill,
  PiUser,
  PiUsersThreeDuotone,
} from "react-icons/pi";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { ButtonFullscreen } from "~/app/_ui/ButtonFullscreen";
import { useUserData } from "~/app/_hooks/useUserData";
import { changeInstanceOnline } from "~/app/_actions/changeInstanceOnline";
import { mediaSocket } from "~/lib/socket/socket";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useRoomSettings } from "~/app/_hooks/useRoomSettings";
import { BsShare, BsShareFill } from "react-icons/bs";
import { ExternalToast, toast } from "sonner";
import { cn } from "~/lib/utils";
import { Captions, CaptionsOff } from "lucide-react";
import { usePlayerRef } from "~/app/_hooks/usePlayerRef";

export interface MediaButtonProps {
  tooltipPlacement: TooltipPlacement;
}

export const buttonClass =
  "group ring-media-focus relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4";

export const tooltipClass =
  "animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden";

export function Play({
  tooltipPlacement,
  disabled = false,
}: MediaButtonProps & { disabled?: boolean }) {
  const { playerRef } = usePlayerRef();
  const { paused } = useMediaStore(playerRef);
  const remote = useMediaRemote(playerRef);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={buttonClass}
            disabled={disabled}
            onClick={() => {
              if (paused) {
                mediaSocket.emit("play");
                remote.play();
              } else {
                mediaSocket.emit("pause");
                remote.pause();
              }
            }}
          >
            {paused ? (
              <PiPlayCircleFill
                className={`h-6 w-6 ${disabled && "opacity-30"} text-solid-primary-2`}
              />
            ) : (
              // <div>icon</div>
              <PiPauseCircleFill size={26} className="text-solid-primary-2" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={30}>
          {paused ? "Play" : "Pause"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Mute({ tooltipPlacement }: MediaButtonProps) {
  const volume = useMediaState("volume"),
    isMuted = useMediaState("muted");
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <MuteButton className={buttonClass}>
            {isMuted || volume == 0 ? (
              <PiSpeakerXFill className="text-solid-primary-2 h-6 w-6" />
            ) : volume < 0.5 ? (
              <PiSpeakerLowFill className="text-solid-primary-2 h-6 w-6" />
            ) : (
              <PiSpeakerHighFill className="text-solid-primary-2 h-6 w-6" />
            )}
          </MuteButton>
        </TooltipTrigger>
        <TooltipContent sideOffset={30}>
          {isMuted ? "Unmute" : "Mute"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Caption() {
  const track = useMediaState("textTrack"),
    isOn = track && isTrackCaptionKind(track);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CaptionButton className={buttonClass}>
            {isOn ? (
              <CaptionsOff className="h-6 w-6" />
            ) : (
              <Captions className="h-6 w-6" />
            )}
          </CaptionButton>
        </TooltipTrigger>
        <TooltipContent sideOffset={30}>
          {isOn ? "Closed-Captions Off" : "Closed-Captions On"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function PIP({ tooltipPlacement }: MediaButtonProps) {
  const isActive = useMediaState("pictureInPicture");
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <PIPButton className={buttonClass}>
            {isActive ? (
              <PiSelectionBackgroundDuotone
                size={26}
                className="text-solid-primary-2"
              />
            ) : (
              // <PictureInPictureIcon className="h-6 w-6" />
              <PiSelectionForegroundDuotone
                size={26}
                className="text-solid-primary-2"
              />
            )}
          </PIPButton>
        </TooltipTrigger>
        <TooltipContent sideOffset={30}>
          {isActive ? "Exit PIP" : "Enter PIP"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Episodes() {
  const { roomData } = useRoomData();
  const { setRoomSettings } = useRoomSettings();
  return (
    <TooltipProvider>
      <Tooltip>
        <Button
          disabled={roomData.type !== "series"}
          onClick={() =>
            setRoomSettings((prv) => {
              return { ...prv, currentTab: "episodes" };
            })
          }
          variant={"ghost"}
          size={"icon"}
          className={buttonClass}
        >
          <PiCardsThree size={26} className="text-solid-primary-2" />
          {/* <PiCardsThreeFill size={26} className="text-solid-primary-2" /> */}
        </Button>

        <TooltipContent sideOffset={30}>Episodes</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Together({ showTooltip = true }: { showTooltip?: boolean }) {
  const { roomData: room, setRoomData } = useRoomData();
  async function handleOnClick(online: boolean) {
    const updatedRoom = await changeInstanceOnline(room, online);
    setRoomData(updatedRoom);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {room.online ? (
            <Button
              className={buttonClass}
              onClick={() => handleOnClick(false)}
              size={"icon"}
              variant={"ghost"}
            >
              <PiUser size={26} className="text-solid-primary-2" />
            </Button>
          ) : (
            // <PictureInPictureIcon className="h-6 w-6" />
            <Button
              className={buttonClass}
              onClick={() => handleOnClick(true)}
              size={"icon"}
              variant={"ghost"}
            >
              <PiUsersThreeDuotone size={26} className="text-solid-primary-2" />
            </Button>
          )}
        </TooltipTrigger>

        {showTooltip && (
          <TooltipContent sideOffset={30}>
            {room.online ? "Watch Alone" : "Watch Together"}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export function Streams() {
  const { setRoomSettings } = useRoomSettings();

  return (
    <TooltipProvider>
      <Tooltip>
        <Button
          onClick={() =>
            setRoomSettings((prv) => {
              return { ...prv, currentTab: "streams" };
            })
          }
          className={buttonClass}
          variant={"ghost"}
          size={"icon"}
        >
          <PiQueueBold size={26} className="text-solid-primary-2" />
        </Button>

        <TooltipContent sideOffset={30}>Streams</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function FullScreen({ tooltipPlacement }: MediaButtonProps) {
  return <ButtonFullscreen className={buttonClass} />;
}

export function Chat() {
  const { setRoomSettings } = useRoomSettings();
  return (
    <Button
      onClick={() =>
        setRoomSettings((prv) => {
          return { ...prv, currentTab: "chat" };
        })
      }
      className={buttonClass}
      variant={"ghost"}
      size={"icon"}
    >
      <PiChatsLight size={26} />
    </Button>
  );
}

export function Share({ showTooltip = true }: { showTooltip?: boolean }) {
  const [_, copyToClipboard] = useCopyToClipboard();
  const { roomId } = useParams();
  const pathname = usePathname();

  const toastOptions = {} as ExternalToast;
  if (!roomId) toastOptions.position = "bottom-left";
  return (
    <Button
      onClick={async () => {
        await copyToClipboard("scoap.ir" + pathname);
        toast.success(
          "Link copied to your clipboard successfully.",
          toastOptions,
        );
      }}
      className={cn(buttonClass, "h-8 w-8 rounded-lg")}
      variant={"ghost"}
      size={"icon"}
    >
      <BsShareFill size={18} />
    </Button>
  );
}

export function Subtitle() {
  const { setRoomSettings } = useRoomSettings();

  return (
    <TooltipProvider>
      <Tooltip>
        <Button
          onClick={() =>
            setRoomSettings((prv) => {
              return { ...prv, currentTab: "subtitles" };
            })
          }
          className={buttonClass}
          variant={"ghost"}
          size={"icon"}
        >
          <PiClosedCaptioningBold size={26} className="text-solid-primary-2" />
        </Button>

        <TooltipContent sideOffset={30}>Streams</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
