"use client";
import "@vidstack/react/player/styles/base.css";
import Player from "./Player";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/app/_components/ui/resizable";
import RightSidePanel from "./RightSidePanel";
import Episodes from "./Episodes";
import { useState } from "react";
import { Button } from "~/app/_components/ui/Button";
import { PiDiceSixFill } from "react-icons/pi";
import * as Buttons from "./Buttons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Chat from "./Chat";
import { Toaster } from "~/app/_components/ui/sonner";

function PlayerLayout({
  searchParams,
}: {
  params: { roomId: string; imdbId: string; type: string; instanceId: string };
  searchParams: { season?: string; episode?: string };
}) {
  const { season, episode } = searchParams;
  const { width } = useWindowSize();
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const currentTab = () => {
    if (season && episode) return "streams";
    if (season) return "episode";
    return "chat";
  };

  if (!width) return null;
  let size;
  if (width > 1080) size = 33;
  else if (width > 900) size = 38;
  else if (width > 640) size = 46;
  else size = 100;

  console.log("🍕🍕", season);

  return (
    <ResizablePanelGroup direction="horizontal" className="flex h-full">
      <ResizablePanel id="player" minSize={width > 640 ? 33 : 0} order={1}>
        <Player />
      </ResizablePanel>

      {!isRightPanelOpen && (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                className="absolute -right-4 top-1/2 -translate-y-[100%]"
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsRightPanelOpen((val) => !val)}
              >
                <PiDiceSixFill size={26} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Open SidePanel</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {width > 640 && isRightPanelOpen && <ResizableHandle withHandle />}

      {isRightPanelOpen && (
        <RightSidePanel className="relative" defaultSize={size}>
          <Button
            variant={"outline"}
            onClick={() => setIsRightPanelOpen((val) => !val)}
            className="absolute left-4 top-4 z-20"
            size={"icon"}
          >
            X
          </Button>

          {currentTab() === "episode" && (
            <div className="h-full pb-16">{season && <Episodes />}</div>
          )}
          {currentTab() === "chat" && (
            <div className="h-full pb-16">{<Chat />}</div>
          )}

          <div className="absolute bottom-0 w-full border-t bg-background px-4 py-4">
            <div className="flex justify-between">
              <Buttons.Chat />
              <Buttons.Episodes tooltipPlacement="top" />
              <Buttons.Streams tooltipPlacement="top" />
            </div>
          </div>
        </RightSidePanel>
      )}
    </ResizablePanelGroup>
  );
}

export default PlayerLayout;
