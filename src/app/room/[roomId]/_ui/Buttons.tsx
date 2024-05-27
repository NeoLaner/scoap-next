"use client";
import {
  CaptionButton,
  FullscreenButton,
  isTrackCaptionKind,
  MuteButton,
  PIPButton,
  PlayButton,
  Tooltip,
  useMediaState,
  type TooltipPlacement,
} from "@vidstack/react";

import { useState } from "react";

export interface MediaButtonProps {
  tooltipPlacement: TooltipPlacement;
}

export const buttonClass =
  "bg-blackA10 group ring-media-focus relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4";

export const tooltipClass =
  "animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden";

export function Play({
  tooltipPlacement,
  disabled = false,
}: MediaButtonProps & { disabled?: boolean }) {
  const isPaused = useMediaState("paused");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className={buttonClass} disabled={disabled}>
          {isPaused ? (
            // <PlayIcon className={`h-6 w-6 ${disabled && "opacity-30"}`} />
            <div>icon</div>
          ) : (
            // <PauseIcon className="h-6 w-6" />
            <div>icon</div>
          )}
        </PlayButton>
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
            // <MuteIcon className="h-6 w-6" />
            <div>icon</div>
          ) : volume < 0.5 ? (
            // <VolumeLowIcon className="h-6 w-6" />
            <div>icon</div>
          ) : (
            // <VolumeHighIcon className="h-6 w-6" />
            <div>icon</div>
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
            // <PictureInPictureExitIcon className="h-6 w-6" />
            <div>icon</div>
          ) : (
            // <PictureInPictureIcon className="h-6 w-6" />
            <div>icon</div>
          )}
        </PIPButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isActive ? "Exit PIP" : "Enter PIP"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
