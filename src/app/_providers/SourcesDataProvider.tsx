"use client";
// context/SourcesDataContext.tsx
import React, { createContext, useState, type ReactNode } from "react";
import { type api } from "~/trpc/server";

type SourcesData =
  | NonNullable<Awaited<ReturnType<typeof api.room.getRoomSources>>>["Sources"]
  | undefined;

interface SourcesDataContextType {
  sourcesData: SourcesData; // Define your SourcesData type here
  setSourcesData: React.Dispatch<React.SetStateAction<SourcesData>>;
}

export const SourcesDataContext = createContext<
  SourcesDataContextType | undefined
>(undefined);

export const SourcesDataProvider = ({
  children,
  initialSourcesData,
}: {
  children: ReactNode;
  initialSourcesData: SourcesData;
}) => {
  const [sourcesData, setSourcesData] = useState(initialSourcesData);
  return (
    <SourcesDataContext.Provider value={{ sourcesData, setSourcesData }}>
      {children}
    </SourcesDataContext.Provider>
  );
};
