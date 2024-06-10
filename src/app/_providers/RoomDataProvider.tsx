"use client";
// context/RoomDataContext.tsx
import React, { createContext, type ReactNode } from "react";
import { type api } from "~/trpc/server";

type RoomData = Awaited<ReturnType<typeof api.room.get>>;

interface RoomDataContextType {
  roomData: RoomData; // Define your roomData type here
}

export const RoomDataContext = createContext<RoomDataContextType | undefined>(
  undefined,
);

export const RoomDataProvider = ({
  children,
  roomData,
}: {
  children: ReactNode;
  roomData: RoomData;
}) => {
  return (
    <RoomDataContext.Provider value={{ roomData }}>
      {children}
    </RoomDataContext.Provider>
  );
};
