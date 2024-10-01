"use client";
// context/SubsContext.tsx
import React, { createContext, useState, type ReactNode } from "react";
import { type api } from "~/trpc/server";

type Subs =
  | NonNullable<Awaited<ReturnType<typeof api.subtitle.getAllRoomSubs>>>
  | undefined;

interface SubsContextType {
  roomSubs: Subs; // Define your Subs type here
  setRoomSubs: React.Dispatch<React.SetStateAction<Subs>>;
}

export const SubsContext = createContext<SubsContextType | undefined>(
  undefined,
);

export const RoomSubsProvider = ({
  children,
  initialRoomSubs,
}: {
  children: ReactNode;
  initialRoomSubs: Subs;
}) => {
  const [roomSubs, setRoomSubs] = useState(initialRoomSubs);
  return (
    <SubsContext.Provider value={{ roomSubs, setRoomSubs }}>
      {children}
    </SubsContext.Provider>
  );
};
