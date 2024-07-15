"use client";
// context/ChatDataContext.tsx
import React, {
  createContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRoomData } from "../_hooks/useRoomData";
import { useRoomSettings } from "../_hooks/useRoomSettings";
import { toast } from "sonner";
import eventEmitter from "~/lib/eventEmitter/eventEmitter";
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";
import { getFirstTwoLetters } from "~/lib/utils";
import { MessageProp } from "~/lib/@types/Message";

function createNewMessage({ message }: { message: MessageProp }) {
  const { created_at, textContent, type, user } = message;
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
      className = "text-warning-foreground bg-warning";
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
    user,
    className,
  };
  return bakedMessage;
}

type Message = ReturnType<typeof createNewMessage>;

interface ChatDataContextType {
  chatData: Message[];
}

export const ChatDataContext = createContext<ChatDataContextType | undefined>(
  undefined,
);

export const ChatDataProvider = ({ children }: { children: ReactNode }) => {
  const { roomData } = useRoomData();
  const { roomSettings } = useRoomSettings();
  const localStorageDataId = `room_chat:${roomData.id}`;
  const [chatData, setChatData] = useLocalStorage<Message[]>(
    localStorageDataId,
    [],
  );

  useEffect(
    function () {
      const unbind = eventEmitter.on("user:message", (message: MessageProp) => {
        setChatData((prev) => {
          let newChatData;
          if (prev) newChatData = [...prev, createNewMessage({ message })];
          else newChatData = [createNewMessage({ message })];

          // Limit to the first 200 messages
          if (newChatData.length > 200) {
            newChatData.splice(0, newChatData.length - 200);
          }

          if (
            !roomSettings.isRightPanelOpen ||
            (roomSettings.isRightPanelOpen &&
              roomSettings.currentTab !== "chat")
          )
            toast(
              <div className="flex gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={message.user.image ?? ""} />
                  <AvatarFallback>
                    {getFirstTwoLetters(message.user.name)}
                  </AvatarFallback>
                </Avatar>
                <p>{message.textContent}</p>
              </div>,
            );

          return newChatData;
        });
      });

      return () => {
        unbind();
      };
    },
    [setChatData, roomSettings.currentTab, roomSettings.isRightPanelOpen],
  );

  return (
    <ChatDataContext.Provider
      value={{
        chatData,
      }}
    >
      {children}
    </ChatDataContext.Provider>
  );
};
