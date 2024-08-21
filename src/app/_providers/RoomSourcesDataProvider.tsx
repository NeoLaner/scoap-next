"use client";
// context/SourcesDataContext.tsx
import React, { createContext, useState, type ReactNode } from "react";
import { type api } from "~/trpc/server";

type SourcesData =
  | NonNullable<Awaited<ReturnType<typeof api.mediaSource.getAllRoomSources>>>
  | undefined;

interface SourcesDataContextType {
  roomSourcesData: SourcesData; // Define your SourcesData type here
  setRoomSourcesData: React.Dispatch<React.SetStateAction<SourcesData>>;
}

export const SourcesDataContext = createContext<
  SourcesDataContextType | undefined
>(undefined);

export const RoomSourcesDataProvider = ({
  children,
  initialRoomSourcesData,
}: {
  children: ReactNode;
  initialRoomSourcesData: SourcesData;
}) => {
  const [roomSourcesData, setRoomSourcesData] = useState(
    initialRoomSourcesData,
  );
  return (
    <SourcesDataContext.Provider
      value={{ roomSourcesData, setRoomSourcesData }}
    >
      {children}
    </SourcesDataContext.Provider>
  );
};
