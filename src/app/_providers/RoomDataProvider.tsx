"use client";
// context/RoomDataContext.tsx
import React, {
  createContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import eventEmitter from "~/lib/eventEmitter/eventEmitter";
import { type api } from "~/trpc/server";

type RoomData = NonNullable<Awaited<ReturnType<typeof api.room.get>>>;

interface RoomDataContextType {
  roomData: RoomData;
  setRoomData: React.Dispatch<React.SetStateAction<RoomData>>;
}

export const RoomDataContext = createContext<RoomDataContextType | undefined>(
  undefined,
);

export const RoomDataProvider = ({
  children,
  initialRoomData,
}: {
  children: ReactNode;
  initialRoomData: RoomData;
}) => {
  const [roomData, setRoomData] = useState<RoomData>(initialRoomData);

  useEffect(
    function () {
      setTimeout(() => {
        eventEmitter.emit(
          "server:message",
          roomData.online ? "ONLINE" : "OFFLINE",
        );

        eventEmitter.emit(
          "server:message_dismissed",
          roomData.online ? "OFFLINE" : "ONLINE",
        );
      }, 1000);
    },
    [roomData.online],
  );

  return (
    <RoomDataContext.Provider value={{ roomData, setRoomData }}>
      {children}
    </RoomDataContext.Provider>
  );
};
