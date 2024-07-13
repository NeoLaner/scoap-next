"use client";
import { useState, type FormEvent, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { cn } from "~/lib/utils";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { Button } from "~/app/_components/ui/Button";
import { PiPaperPlaneBold } from "react-icons/pi";
import { Avatar, AvatarFallback } from "~/app/_components/ui/avatar";
import { Input } from "~/app/_components/ui/input";
import { useChatData } from "~/app/_hooks/useChatData";

function Chat({ className = "" }: { className?: string | undefined }) {
  // const { chatData } = useGetChat();
  // const { isChatConnected } = useIsChatConnected();
  const { chatData } = useChatData();
  console.log("chatData", chatData);

  const [message, setMessage] = useState("");
  const scrollArea = useRef<HTMLDivElement>(null);
  const scrollAreaOverlay = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      scrollArea.current?.scrollIntoView(false);
      scrollAreaOverlay.current?.scrollIntoView(false);
    },
    [scrollArea.current, chatData],
  );

  function messageSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message) return;
    socketEmitters.sendMessage({ textContent: message });
    setMessage("");
  }

  return (
    <>
      <div
        ref={scrollArea}
        className="flex h-full w-full flex-1 flex-col space-y-2 overflow-y-auto"
      >
        {chatData?.map((message) => (
          <div
            key={message.created_at}
            className="flex items-start space-x-2 pr-2"
          >
            <Avatar className="h-8 w-8 rounded-md">
              {/* <AvatarImage
                  className="rounded-md"
                  src="/placeholder.svg?height=50&width=50"
                /> */}
              <AvatarFallback className="rounded-md">
                {message.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="!mt-[0.1rem] break-all text-sm">
              {message.userName}: {message.textContent}
            </p>
          </div>
        ))}
      </div>

      <div className="h-[72px]" />
      <form
        className="absolute bottom-0 w-full p-4 pl-2 pr-5"
        onSubmit={messageSubmitHandler}
      >
        <div className="flex items-center gap-2">
          <Input
            className="w-full"
            placeholder="Start typing..."
            maxLength={128}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button variant="ghost" size="icon">
            <PiPaperPlaneBold size={20} />
          </Button>
        </div>
      </form>
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
