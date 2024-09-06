"use client";
// context/RoomSettingsContext.tsx
import React, { createContext, type ReactNode } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRoomData } from "../_hooks/useRoomData";

type RoomSettings = {
  currentTab: "chat" | "episodes" | "streams" | "subtitles";
  isRightPanelOpen: boolean;
};

interface RoomSettingsContextType {
  roomSettings: RoomSettings;
  setRoomSettings: React.Dispatch<React.SetStateAction<RoomSettings>>;
}

export const RoomSettingsContext = createContext<
  RoomSettingsContextType | undefined
>(undefined);

export const RoomSettingsProvider = ({
  children,
  initialRoomSettings = { currentTab: "chat", isRightPanelOpen: false },
}: {
  children: ReactNode;
  initialRoomSettings?: RoomSettings;
}) => {
  // const [roomSettings, setRoomSettings] =
  //  useState<RoomSettings>(initialRoomSettings);
  const { roomData } = useRoomData();
  const localStorageDataId = `room_settings:${roomData.id}`;
  const [roomSettings, setRoomSettings] = useLocalStorage(
    localStorageDataId,
    initialRoomSettings,
  );

  return (
    <RoomSettingsContext.Provider value={{ roomSettings, setRoomSettings }}>
      {children}
    </RoomSettingsContext.Provider>
  );
};
