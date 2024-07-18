"use client";
import { useState, type FormEvent, useEffect, useRef } from "react";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { getFirstTwoLetters } from "~/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { Input } from "~/app/_components/ui/input";
import { useChatData } from "~/app/_hooks/useChatData";
import ServerMessages from "./ServerMessages";

function Chat() {
  // const { isChatConnected } = useIsChatConnected();
  const { chatData, serverMessages } = useChatData();
  const messages = [...chatData, ...serverMessages].sort(
    (a, b) => a.created_at - b.created_at,
  );

  const scrollArea = useRef<HTMLDivElement>(null);
  const scrollAreaOverlay = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      scrollArea.current?.scrollIntoView(false);
      scrollAreaOverlay.current?.scrollIntoView(false);
    },
    [chatData],
  );

  return (
    <>
      <div
        ref={scrollArea}
        className="flex h-full w-full flex-1 flex-col space-y-2 overflow-y-auto"
      >
        {messages?.map((message) => {
          if (message.type === "user:message")
            return (
              <div
                key={message.created_at}
                className={`flex items-start space-x-2 pr-2 ${message.className} rounded-lg`}
              >
                <Avatar className="h-8 w-8 rounded-md">
                  <AvatarImage
                    className="rounded-md"
                    src={message.user.image ?? ""}
                  />
                  <AvatarFallback className="h-8 w-8 rounded-md">
                    {getFirstTwoLetters(message.user.name)}
                  </AvatarFallback>
                </Avatar>
                <p className="!mt-[0.1rem] break-all text-sm">
                  {message.user.name}: {message.textContent}
                </p>
              </div>
            );

          if (message.type === "server:message")
            return (
              <div className="rounded-lg text-sm" key={message.created_at}>
                <ServerMessages id={message.messageId} />
              </div>
            );
        })}
      </div>
      {/* <p className="absolute bottom-2 right-16">{message.length}/128</p> */}
    </>
  );
}

function Comment() {
  const [message, setMessage] = useState("");
  const [isShowPopOver, setIsShowPopOver] = useState(false);
  const [_, setIsCommentActive] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  function messageSubmitHandler(
    e: FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) {
    e.preventDefault();
    if (!message) return;
    socketEmitters.sendMessage({ textContent: message });
    setIsShowPopOver(false);
    setMessage("");
    if (ref.current) {
      ref.current.blur(); // Unfocus the input
    }
  }

  return (
    <form onSubmit={messageSubmitHandler} className="">
      <Input
        className="mb-[0.41rem] w-full"
        placeholder="Start typing..."
        value={message}
        maxLength={128}
        onChange={(e) => setMessage(e.target.value)}
        ref={ref}
      />
    </form>
  );
}

Chat.Comment = Comment;

export default Chat;
