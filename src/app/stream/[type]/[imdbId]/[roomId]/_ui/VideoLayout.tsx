"use client";
import {
  Captions,
  Controls,
  Gesture,
  type GestureAction,
  type GestureWillTriggerEvent,
  useMediaRemote,
  useMediaState,
  useMediaStore,
} from "@vidstack/react";
import captionStyles from "./css-modules/captions.module.css";
import styles from "./css-modules/video-layout.module.css";

import * as Buttons from "./Buttons";
import * as Menus from "./Menus";
import * as Sliders from "./Sliders";
import { TimeGroup } from "./Time-group";

import TitleLayout from "./TitleLayout";
import UsersStatus from "./UsersStatus";
import { useCurSub } from "~/app/_hooks/useCurSub";
import { mediaSocket } from "~/lib/socket/socket";
import { toggleFullscreen } from "~/lib/btnEvent";
import { useEffect, useState } from "react";
import { usePlayerRef } from "~/app/_hooks/usePlayerRef";

export interface VideoLayoutProps {
  thumbnails?: string;
}

export default function VideoLayout({
  thumbnails,
  disablePlay = false,
}: VideoLayoutProps & { disablePlay?: boolean }) {
  const { currentSubtitle } = useCurSub();
  console.log(currentSubtitle?.language);

  return (
    <>
      <Gestures />

      <Captions
        className={`${currentSubtitle?.language.toLowerCase() === "persian" && "font-farsi"} bg-none ${captionStyles.captions} unique-captions-class absolute inset-0 bottom-2 select-none break-words opacity-0 transition-[opacity,bottom] duration-300 media-captions:opacity-100 media-controls:bottom-[85px] media-preview:opacity-0`}
      />

      <Controls.Root
        className={`${styles.controls} absolute inset-0 flex h-full w-full flex-col from-black/10 to-transparent  opacity-0 transition-opacity media-buffering:opacity-100 media-controls:opacity-100`}
      >
        <Controls.Group className="flex w-full justify-center">
          <div className="mt-4 h-10">
            <TitleLayout />
          </div>
        </Controls.Group>

        <Controls.Group className="flex w-4 flex-1">
          <UsersStatus />
          <div className="-z-50 flex-1" />
        </Controls.Group>

        <Controls.Group className="flex w-full items-center px-2">
          <Sliders.Time thumbnails={thumbnails} disabled={disablePlay} />
          <TimeGroup />
        </Controls.Group>
        <Controls.Group className="-mt-0.5 flex w-full items-center px-2 pb-2">
          <Buttons.Play tooltipPlacement="top start" disabled={disablePlay} />
          <Buttons.Mute tooltipPlacement="top" />
          <Sliders.Volume />
          {/* <Title /> */}
          <div className="flex-1" />
          <Buttons.Together />
          <Menus.Settings placement="top end" tooltipPlacement="top" />
          <Buttons.Caption />
          <Buttons.PIP tooltipPlacement="top" />
          <Buttons.FullScreen tooltipPlacement="top" />
        </Controls.Group>
      </Controls.Root>
    </>
  );
}

function Gestures() {
  const [isActive, setIsActive] = useState(false);
  const { playerRef } = usePlayerRef();
  const { currentTime, paused } = useMediaStore(playerRef);
  useEffect(() => setIsActive(document.fullscreenElement !== null), []);

  function onPaused(
    action: GestureAction,
    nativeEvent: GestureWillTriggerEvent,
  ) {
    // Prevent the gesture from triggering.
    // nativeEvent.preventDefault();
    if (paused) mediaSocket.emit("play");
    else mediaSocket.emit("pause");
  }

  async function onFullscreen(
    action: GestureAction,
    nativeEvent: GestureWillTriggerEvent,
  ) {
    // Prevent the gesture from triggering.
    nativeEvent.preventDefault();
    await toggleFullscreen({ setIsActive: setIsActive });
  }

  async function onSeekForward(
    action: GestureAction,
    nativeEvent: GestureWillTriggerEvent,
  ) {
    // Prevent the gesture from triggering.
    // nativeEvent.preventDefault();
    const seekTs = Number(action.split(":")[1]);
    const videoTs = currentTime + seekTs;
    mediaSocket.emit("seek", { payload: { videoTs } });
  }

  async function onSeekBackward(
    action: GestureAction,
    nativeEvent: GestureWillTriggerEvent,
  ) {
    // Prevent the gesture from triggering.
    // nativeEvent.preventDefault();
    const seekTs = Number(action.split(":")[1]);
    const videoTs = currentTime + seekTs;
    mediaSocket.emit("seek", { payload: { videoTs } });
  }

  return (
    <>
      <Gesture
        className="absolute inset-0 z-0 mx-auto block h-full w-5/6"
        event="pointerup"
        action="toggle:paused"
        onWillTrigger={onPaused}
      />
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="dblpointerup"
        action="toggle:fullscreen"
        onWillTrigger={onFullscreen}
      />
      <Gesture
        className="absolute left-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:-10"
        onWillTrigger={onSeekBackward}
      />
      <Gesture
        className="absolute right-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:10"
        onWillTrigger={onSeekForward}
      />
    </>
  );
}
