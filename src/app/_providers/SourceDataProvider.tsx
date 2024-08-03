"use client";
// context/SourceDataContext.tsx
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type api } from "~/trpc/server";
import eventEmitter from "~/lib/eventEmitter/eventEmitter";
import { makeRawSource } from "~/lib/source";
import { useRoomData } from "../_hooks/useRoomData";

type SourceData = { videoLink: string };

interface SourceDataContextType {
  sourceData: SourceData; // Define your SourceData type here
  setSourceData: React.Dispatch<React.SetStateAction<SourceData>>;
}

export const SourceDataContext = createContext<
  SourceDataContextType | undefined
>(undefined);

export const SourceDataProvider = ({
  children,
  initialSourceData,
}: {
  children: ReactNode;
  initialSourceData: SourceData;
}) => {
  const [sourceData, setSourceData] = useState(initialSourceData);
  const { roomData } = useRoomData();
  const updatedVideoLink = makeRawSource({
    source: sourceData.videoLink ?? "",
    season: roomData.season ?? undefined,
    episode: roomData.episode ?? undefined,
  });

  useEffect(function () {
    if (!updatedVideoLink)
      setTimeout(() => {
        eventEmitter.emit("server:message", "NO_SOURCE");
      }, 900);
  }, []);

  return (
    <SourceDataContext.Provider
      value={{ sourceData: { videoLink: updatedVideoLink }, setSourceData }}
    >
      {children}
    </SourceDataContext.Provider>
  );
};
