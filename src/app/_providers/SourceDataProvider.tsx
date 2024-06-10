"use client";
// context/SourceDataContext.tsx
import React, { createContext, type ReactNode } from "react";
import { type api } from "~/trpc/server";

type SourceData = NonNullable<Awaited<ReturnType<typeof api.source.get>>>;

interface SourceDataContextType {
  sourceData: SourceData; // Define your SourceData type here
}

export const SourceDataContext = createContext<
  SourceDataContextType | undefined
>(undefined);

export const SourceDataProvider = ({
  children,
  sourceData,
}: {
  children: ReactNode;
  sourceData: SourceData;
}) => {
  return (
    <SourceDataContext.Provider value={{ sourceData }}>
      {children}
    </SourceDataContext.Provider>
  );
};
