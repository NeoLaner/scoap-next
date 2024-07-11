"use client";
// context/RoomSettingsContext.tsx
import React, { createContext, useState, type ReactNode } from "react";

type RoomSettings = { currentTab: "chat" | "episodes" | "streams" };

interface RoomSettingsContextType {
  roomSettings: RoomSettings;
  setRoomSettings: React.Dispatch<React.SetStateAction<RoomSettings>>;
}

export const RoomSettingsContext = createContext<
  RoomSettingsContextType | undefined
>(undefined);

export const RoomSettingsProvider = ({
  children,
  initialRoomSettings = { currentTab: "streams" },
}: {
  children: ReactNode;
  initialRoomSettings?: RoomSettings;
}) => {
  const [roomSettings, setRoomSettings] =
    useState<RoomSettings>(initialRoomSettings);

  return (
    <RoomSettingsContext.Provider value={{ roomSettings, setRoomSettings }}>
      {children}
    </RoomSettingsContext.Provider>
  );
};
