"use client";
// context/PublicSubsContext.tsx
import React, { createContext, useState, type ReactNode } from "react";
import { type api } from "~/trpc/server";
import { useRoomData } from "../_hooks/useRoomData";

type PublicSubs =
  | NonNullable<Awaited<ReturnType<typeof api.subtitle.getAllPublicSubs>>>
  | undefined;

interface PublicSubsContextType {
  publicSubs: PublicSubs; // Define your PublicSubs type here
  setPublicSubs: React.Dispatch<React.SetStateAction<PublicSubs>>;
}

export const PublicSubsContext = createContext<
  PublicSubsContextType | undefined
>(undefined);

export const PublicSubsProvider = ({
  children,
  initialPublicSubs,
}: {
  children: ReactNode;
  initialPublicSubs: PublicSubs;
}) => {
  const [publicSubs, setPublicSubs] = useState(initialPublicSubs);
  const { roomData } = useRoomData();
  const filteredPublicSubs = publicSubs?.filter((src) => {
    if (roomData.type === "series" && roomData.season)
      return src.seasonBoundary.includes(roomData.season);
  });

  return (
    <PublicSubsContext.Provider
      value={{ publicSubs: filteredPublicSubs, setPublicSubs }}
    >
      {children}
    </PublicSubsContext.Provider>
  );
};
