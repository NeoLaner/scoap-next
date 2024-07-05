"use client";
// context/RoomDataContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
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

  return (
    <RoomDataContext.Provider value={{ roomData, setRoomData }}>
      {children}
    </RoomDataContext.Provider>
  );
};
