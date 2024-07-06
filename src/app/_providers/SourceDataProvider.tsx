"use client";
// context/SourceDataContext.tsx
import React, { createContext, useState, type ReactNode } from "react";
import { type api } from "~/trpc/server";

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
  return (
    <SourceDataContext.Provider value={{ sourceData, setSourceData }}>
      {children}
    </SourceDataContext.Provider>
  );
};
