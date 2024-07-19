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

type SourceData = NonNullable<Awaited<ReturnType<typeof api.source.get>>>;

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
    if (!sourceData.videoLink && !sourceData.fileIdx && !sourceData.mediaLinkId)
      setTimeout(() => {
        eventEmitter.emit("server:message", "NO_SOURCE");
      }, 3000);
  }, []);

  return (
    <SourceDataContext.Provider value={{ sourceData, setSourceData }}>
      {children}
    </SourceDataContext.Provider>
  );
};
