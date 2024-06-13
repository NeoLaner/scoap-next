"use client";
import { useState } from "react";
import { Captions, Controls, Gesture } from "@vidstack/react";
import captionStyles from "./css-modules/captions.module.css";
import styles from "./css-modules/video-layout.module.css";

import * as Buttons from "./Buttons";
import * as Menus from "./Menus";
import * as Sliders from "./Sliders";
import { TimeGroup } from "./Time-group";
import { Title } from "./Title";
import TitleLayout from "./TitleLayout";

export interface VideoLayoutProps {
  thumbnails?: string;
}

export default function VideoLayout({
  thumbnails,
  disablePlay = false,
}: VideoLayoutProps & { disablePlay?: boolean }) {
  const isFullscreen = true;
  const [isChatActive, setIsChatActive] = useState(false);

  return (
    <>
      <Gestures />

      <Captions
        className={`bg-none ${captionStyles.captions} unique-captions-class absolute inset-0 bottom-2 select-none break-words opacity-0 transition-[opacity,bottom] duration-300 media-captions:opacity-100 media-controls:bottom-[85px] media-preview:opacity-0`}
      />

      <Controls.Root
        className={`${styles.controls} from-black/10 to-transparent absolute inset-0 flex h-full w-full flex-col  opacity-0 transition-opacity media-buffering:opacity-100 media-controls:opacity-100`}
      >
        <Controls.Group className="flex w-full justify-center">
          <div className="mt-4 h-24">
            <TitleLayout />
          </div>
        </Controls.Group>
        <Controls.Group className="flex w-full flex-1 overflow-hidden">
          <div className="flex-1" />
          {isFullscreen && isChatActive && <div className="h-full"></div>}
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
          <Buttons.Together tooltipPlacement="top" />
          <Menus.Settings placement="top end" tooltipPlacement="top" />
          <Buttons.PIP tooltipPlacement="top" />
          <Buttons.Episodes tooltipPlacement="top" />
          <Buttons.Streams tooltipPlacement="top" />
          <Buttons.FullScreen tooltipPlacement="top" />
        </Controls.Group>
      </Controls.Root>
    </>
  );
}

function Gestures() {
  return (
    <>
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="pointerup"
        action="toggle:paused"
      />
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="dblpointerup"
        action="toggle:fullscreen"
      />
      <Gesture
        className="absolute left-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:-10"
      />
      <Gesture
        className="absolute right-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:10"
      />
    </>
  );
}
