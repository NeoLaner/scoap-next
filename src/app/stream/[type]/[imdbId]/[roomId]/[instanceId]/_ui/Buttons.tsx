"use client";
import {
  CaptionButton,
  isTrackCaptionKind,
  MuteButton,
  PIPButton,
  PlayButton,
  Tooltip,
  useMediaState,
  type TooltipPlacement,
} from "@vidstack/react";

import {
  PiCardsThreeFill,
  PiPauseCircleFill,
  PiPlayCircleFill,
  PiQueueBold,
  PiSelectionBackgroundDuotone,
  PiSelectionForegroundDuotone,
  PiSpeakerHighFill,
  PiSpeakerLowFill,
  PiSpeakerXFill,
  PiUser,
  PiUsersThreeDuotone,
} from "react-icons/pi";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import ButtonFullscreen from "~/app/_ui/ButtonFullscreen";
import { useInstanceData } from "~/app/_hooks/useInstanceData";
import { useUserData } from "~/app/_hooks/useUserData";
import { changeInstanceStatus } from "~/app/_actions/changeInstanceStatus";
import { mediaSocket } from "~/lib/socket/socket";

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
  const isPaused = useMediaState("paused");
  const { instanceData: instance } = useInstanceData();
  const { userData } = useUserData();

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {instance.online ? (
          <>
            {isPaused ? (
              <PlayButton
                className={buttonClass}
                disabled={disabled}
                onClick={() => {
                  mediaSocket.emit("play");
                }}
              >
                <PiPlayCircleFill
                  className={`h-6 w-6 ${disabled && "opacity-30"} text-solid-primary-2`}
                />
              </PlayButton>
            ) : (
              // <div>icon</div>
              <PlayButton
                className={buttonClass}
                disabled={disabled}
                onClick={() => {
                  mediaSocket.emit("pause");
                }}
              >
                <PiPauseCircleFill size={26} className="text-solid-primary-2" />
              </PlayButton>
            )}
          </>
        ) : (
          <PlayButton className={buttonClass} disabled={disabled}>
            {isPaused ? (
              <PiPlayCircleFill
                className={`h-6 w-6 ${disabled && "opacity-30"} text-solid-primary-2`}
              />
            ) : (
              // <div>icon</div>
              <PiPauseCircleFill size={26} className="text-solid-primary-2" />
            )}
          </PlayButton>
        )}
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isPaused ? "Play" : "Pause"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Mute({ tooltipPlacement }: MediaButtonProps) {
  const volume = useMediaState("volume"),
    isMuted = useMediaState("muted");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <MuteButton className={buttonClass}>
          {isMuted || volume == 0 ? (
            <PiSpeakerXFill className="h-6 w-6 text-solid-primary-2" />
          ) : volume < 0.5 ? (
            <PiSpeakerLowFill className="h-6 w-6 text-solid-primary-2" />
          ) : (
            <PiSpeakerHighFill className="h-6 w-6 text-solid-primary-2" />
          )}
        </MuteButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isMuted ? "Unmute" : "Mute"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Caption({ tooltipPlacement }: MediaButtonProps) {
  const track = useMediaState("textTrack"),
    isOn = track && isTrackCaptionKind(track);
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <CaptionButton className={buttonClass}>
          {isOn ? (
            // <ClosedCaptionsOnIcon className="h-6 w-6" />
            <div>icon</div>
          ) : (
            // <ClosedCaptionsIcon className="h-6 w-6" />
            <div>icon</div>
          )}
        </CaptionButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isOn ? "Closed-Captions Off" : "Closed-Captions On"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function PIP({ tooltipPlacement }: MediaButtonProps) {
  const isActive = useMediaState("pictureInPicture");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
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
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isActive ? "Exit PIP" : "Enter PIP"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Episodes({ tooltipPlacement }: MediaButtonProps) {
  const { instanceData } = useInstanceData();
  const pathname = usePathname();
  return (
    <Tooltip.Root>
      <Link
        href={pathname + `?season=${instanceData?.season ?? "1"}`}
        className={buttonClass}
      >
        <PiCardsThreeFill size={26} className="text-solid-primary-2" />
      </Link>

      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        Episodes
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Together({ tooltipPlacement }: MediaButtonProps) {
  const { instanceData: instance } = useInstanceData();
  async function handleOnClick(online: boolean) {
    await changeInstanceStatus(instance, online);
  }

  return (
    <Tooltip.Root>
      {instance.online ? (
        <button className={buttonClass} onClick={() => handleOnClick(false)}>
          <PiUser size={26} className="text-solid-primary-2" />
        </button>
      ) : (
        // <PictureInPictureIcon className="h-6 w-6" />
        <button className={buttonClass} onClick={() => handleOnClick(true)}>
          <PiUsersThreeDuotone size={26} className="text-solid-primary-2" />
        </button>
      )}

      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {instance.online ? "Watch Alone" : "Watch Together"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Streams({ tooltipPlacement }: MediaButtonProps) {
  const params = useParams<{ type: "movie " | "series"; roomId: string }>();

  return (
    <Tooltip.Root>
      {params.type === "series" ? <StreamsForSeries /> : <StreamsForMovie />}

      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        Streams
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

function StreamsForMovie() {
  const pathname = usePathname();

  return (
    <Link className={buttonClass} href={pathname + "?showStreams=true"}>
      <PiQueueBold size={26} className="text-solid-primary-2" />
    </Link>
  );
}

function StreamsForSeries() {
  const pathname = usePathname();
  const { instanceData } = useInstanceData();

  return (
    <Link
      className={buttonClass}
      href={
        pathname +
        `?season=${instanceData?.season}` +
        `&episode=${instanceData?.episode}` +
        "&showStreams=true"
      }
    >
      <PiQueueBold size={26} className="text-solid-primary-2" />
    </Link>
  );
}

export function FullScreen({ tooltipPlacement }: MediaButtonProps) {
  return (
    <Tooltip.Root>
      <ButtonFullscreen className={buttonClass} />

      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        Streams
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
