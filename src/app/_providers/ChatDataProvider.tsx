"use client";
// context/ChatDataContext.tsx
import React, { createContext, type ReactNode } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRoomData } from "../_hooks/useRoomData";

type Message = {
  textContent: string;
  type: "normal" | "suggestion";
  created_at: number;
  userName: string;
};
interface ChatDataContextType {
  chatData: Message[];
  pushMessage: (message: Message) => void;
}

export const ChatDataContext = createContext<ChatDataContextType | undefined>(
  undefined,
);

function createNewMessage({ message }: { message: Message }) {
  return message;
}

export const ChatDataProvider = ({ children }: { children: ReactNode }) => {
  const { roomData } = useRoomData();
  const localStorageDataId = `room_chat:${roomData.id}`;
  const [chatData, setChatData] = useLocalStorage<Message[]>(
    localStorageDataId,
    [
      {
        textContent: "Welcome to the room",
        type: "suggestion",
        created_at: Date.now(),
        userName: "Scoap",
      },
    ],
  );

  return (
    <ChatDataContext.Provider
      value={{
        chatData,
        pushMessage: (message: Message) =>
          setChatData((prv) => [...prv, createNewMessage({ message })]),
      }}
    >
      {children}
    </ChatDataContext.Provider>
  );
};
