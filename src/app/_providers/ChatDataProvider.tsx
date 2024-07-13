"use client";
// context/ChatDataContext.tsx
import React, { createContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRoomData } from "../_hooks/useRoomData";

type MessageProp = {
  textContent: string;
  type: "normal" | "normal:server" | "success" | "warning" | "danger";
  created_at: number;
  userName: string;
};

function createNewMessage({ message }: { message: MessageProp }) {
  const { created_at, textContent, type, userName } = message;
  let className = "";
  switch (type) {
    case "normal":
      className = "";
      break;
    case "normal:server":
      className = "";
      break;
    case "success":
      className = "text-success";
      break;
    case "warning":
      className = "text-warning";
      break;
    case "danger":
      className = "text-danger";
      break;
    default:
      break;
  }

  const bakedMessage = {
    created_at,
    textContent,
    userName,
    className,
  };
  return bakedMessage;
}

type Message = ReturnType<typeof createNewMessage>;

interface ChatDataContextType {
  chatData: Message[];
  pushMessage: (message: MessageProp) => void;
}

export const ChatDataContext = createContext<ChatDataContextType | undefined>(
  undefined,
);

export const ChatDataProvider = ({ children }: { children: ReactNode }) => {
  const { roomData } = useRoomData();
  const localStorageDataId = `room_chat:${roomData.id}`;
  const [chatData, setChatData] = useLocalStorage<Message[]>(
    localStorageDataId,
    [],
  );

  const pushMessage = useMemo(
    () => (message: MessageProp) => {
      setChatData((prev) => {
        const newChatData = [...prev, createNewMessage({ message })];

        // Limit to the first 200 messages
        if (newChatData.length > 200) {
          newChatData.splice(0, newChatData.length - 200);
        }

        return newChatData;
      });
    },
    [],
  );

  return (
    <ChatDataContext.Provider
      value={{
        chatData,
        pushMessage,
      }}
    >
      {children}
    </ChatDataContext.Provider>
  );
};
