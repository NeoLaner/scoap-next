"use client";
// context/PublicSourcesContext.tsx
import React, { createContext, useState, type ReactNode } from "react";
import { type api } from "~/trpc/server";
import { useRoomData } from "../_hooks/useRoomData";

type PublicSources =
  | NonNullable<Awaited<ReturnType<typeof api.mediaSource.getAllPublicSources>>>
  | undefined;

interface PublicSourcesContextType {
  publicSources: PublicSources; // Define your PublicSources type here
  setPublicSources: React.Dispatch<React.SetStateAction<PublicSources>>;
}

export const PublicSourcesContext = createContext<
  PublicSourcesContextType | undefined
>(undefined);

export const PublicSourcesProvider = ({
  children,
  initialPublicSources,
}: {
  children: ReactNode;
  initialPublicSources: PublicSources;
}) => {
  const [publicSources, setPublicSources] = useState(initialPublicSources);
  const { roomData } = useRoomData();
  const filteredPublicSources = publicSources?.filter((src) => {
    if (roomData.type === "series" && roomData.season)
      return src.seasonBoundary.includes(roomData.season);
  });

  return (
    <PublicSourcesContext.Provider
      value={{ publicSources: filteredPublicSources, setPublicSources }}
    >
      {children}
    </PublicSourcesContext.Provider>
  );
};
