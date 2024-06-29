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
import { usePathname, useRouter } from "next/navigation";

function PlayerLayout({
  params,
  searchParams,
}: {
  params: { roomId: string; imdbId: string; type: string; instanceId: string };
  searchParams: { season?: string; episode?: string };
}) {
  const { season } = searchParams;
  const { width } = useWindowSize();
  const router = useRouter();
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  if (!width) return null;
  let size;
  if (width > 1080) size = 33;
  else if (width > 900) size = 38;
  else if (width > 640) size = 46;
  else size = 0;

  console.log("🍕🍕", season);

  return (
    <ResizablePanelGroup direction="horizontal" className="flex h-full">
      <ResizablePanel minSize={33}>
        <Player />
      </ResizablePanel>

      {!isRightPanelOpen && (
        <Button
          className="absolute right-0 top-1/2 -translate-y-[100%]"
          variant={"ghost"}
          size={"icon"}
          onClick={() => setIsRightPanelOpen((val) => !val)}
        >
          open{" "}
        </Button>
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
          {season && <Episodes />}
        </RightSidePanel>
      )}
    </ResizablePanelGroup>
  );
}

export default PlayerLayout;
