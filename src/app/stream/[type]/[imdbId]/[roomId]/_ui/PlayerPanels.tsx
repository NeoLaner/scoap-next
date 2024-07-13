"use client";
import "@vidstack/react/player/styles/base.css";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/app/_components/ui/resizable";
import {
  createContext,
  type ReactNode,
  type Dispatch,
  useState,
  type SetStateAction,
  useContext,
} from "react";
import { Button } from "~/app/_components/ui/Button";
import { PiDiceSixFill } from "react-icons/pi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import * as Buttons from "./Buttons";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useRoomSettings } from "~/app/_hooks/useRoomSettings";
import { ScrollArea } from "~/app/_components/ui/scroll-area";

const PanelContext = createContext<{
  size: number;
  width: number;
}>({
  size: 0,
  width: 0,
});

export function PlayerPanel({ children }: { children: ReactNode }) {
  const { width } = useWindowSize();

  if (!width) return null;
  let size;
  if (width > 1080) size = 33;
  else if (width > 900) size = 38;
  else if (width > 640) size = 46;
  else size = 100;

  return (
    <ResizablePanelGroup direction="horizontal" className="flex h-full">
      <PanelContext.Provider
        value={{
          size,
          width,
        }}
      >
        {children}
      </PanelContext.Provider>
    </ResizablePanelGroup>
  );
}

export function LeftPanel({ children }: { children: ReactNode }) {
  const { width } = useContext(PanelContext);
  return (
    <ResizablePanel id="player" minSize={width > 640 ? 33 : 0} order={1}>
      {children}
    </ResizablePanel>
  );
}

export function ResizableHandlePanel() {
  const { width } = useContext(PanelContext);
  const {
    roomSettings: { isRightPanelOpen },
  } = useRoomSettings();

  return (
    <>{width > 640 && isRightPanelOpen && <ResizableHandle withHandle />}</>
  );
}

export function RightPanel({
  Elements,
}: {
  Elements: { JSXMain: ReactNode; JSXHeader: ReactNode; key: string }[];
}) {
  const { size } = useContext(PanelContext);
  const {
    roomSettings: { isRightPanelOpen },
    setRoomSettings,
  } = useRoomSettings();
  const { roomSettings } = useRoomSettings();
  const currentTab = Elements.filter(
    (element) => element.key === roomSettings.currentTab,
  )[0];

  return (
    <>
      {isRightPanelOpen && (
        <ResizablePanel
          className="relative"
          defaultSize={size}
          minSize={size}
          id="RightPanel"
          order={2}
        >
          {/* Panel Header */}
          <div className="flex h-[72px] w-full items-center justify-between p-4">
            <Button
              variant={"outline"}
              onClick={() =>
                setRoomSettings((val) => {
                  return { ...val, isRightPanelOpen: !val.isRightPanelOpen };
                })
              }
              className="left-4 top-4 z-20"
              size={"icon"}
            >
              X
            </Button>
            {currentTab?.JSXHeader}
          </div>

          {/* Panel Main */}
          <div className="h-full pb-[150px]">
            <ScrollArea className="h-full">
              <div className="mx-4 h-full">{currentTab?.JSXMain}</div>
            </ScrollArea>
          </div>

          {/* Panel Footer */}
          <div className="absolute bottom-0 h-[72px] w-full border-t bg-background p-4">
            <div className="flex justify-between">
              <Buttons.Chat />
              {<Buttons.Episodes />}
              <Buttons.Streams tooltipPlacement="top" />
            </div>
          </div>
        </ResizablePanel>
      )}
    </>
  );
}

export function OpenRightPanelButton() {
  const {
    roomSettings: { isRightPanelOpen },
    setRoomSettings,
  } = useRoomSettings();
  return (
    <>
      {!isRightPanelOpen && (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                className="absolute -right-4 top-1/2 -translate-y-[100%]"
                variant={"ghost"}
                size={"icon"}
                onClick={() =>
                  setRoomSettings((val) => {
                    return { ...val, isRightPanelOpen: !val.isRightPanelOpen };
                  })
                }
              >
                <PiDiceSixFill size={26} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Open SidePanel</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
