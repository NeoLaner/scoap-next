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
import * as Buttons from "./Buttons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const PanelContext = createContext<{
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: Dispatch<SetStateAction<boolean>>;
  size: number;
  width: number;
}>({
  isRightPanelOpen: true,
  setIsRightPanelOpen: () => {
    return;
  },
  size: 0,
  width: 0,
});

export function PlayerPanel({ children }: { children: ReactNode }) {
  const { width } = useWindowSize();
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

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
          isRightPanelOpen,
          setIsRightPanelOpen,
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
  const { width, isRightPanelOpen } = useContext(PanelContext);
  console.log(isRightPanelOpen);

  return (
    <>{width > 640 && isRightPanelOpen && <ResizableHandle withHandle />}</>
  );
}

export function RightPanel({ children }: { children: ReactNode }) {
  const { size, setIsRightPanelOpen, isRightPanelOpen } =
    useContext(PanelContext);

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
          <Button
            variant={"outline"}
            onClick={() => setIsRightPanelOpen((val) => !val)}
            className="absolute left-4 top-4 z-20"
            size={"icon"}
          >
            X
          </Button>
          {children}
        </ResizablePanel>
      )}
    </>
  );
}

export function OpenRightPanelOpen() {
  const { setIsRightPanelOpen, isRightPanelOpen } = useContext(PanelContext);
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
                onClick={() => setIsRightPanelOpen((val) => !val)}
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
