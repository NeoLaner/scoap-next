"use client";
// context/SourceDataContext.tsx
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import eventEmitter from "~/lib/eventEmitter/eventEmitter";

import { type api } from "~/trpc/server";

type SourceData = Awaited<ReturnType<typeof api.source.getMe>>;

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

  useEffect(function () {
    if (!sourceData?.MediaSource.videoLink)
      setTimeout(() => {
        eventEmitter.emit("server:message", "NO_SOURCE");
      }, 900);
  }, []);

  return (
    <SourceDataContext.Provider value={{ sourceData, setSourceData }}>
      {children}
    </SourceDataContext.Provider>
  );
};
