import { useState, type FormEvent, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socketEmitters from "~/app/_services/socket/socketEmit";
import { cn } from "~/lib/utils";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { Textarea } from "~/app/_components/ui/Textarea";
import { Button } from "~/app/_components/ui/Button";
import { PiPaperPlaneBold } from "react-icons/pi";
import { Avatar, AvatarFallback } from "~/app/_components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "~/app/_components/ui/input";

function Chat({
  className = "",
  overflow = false,
}: {
  className?: string | undefined;
  overflow?: boolean | undefined;
}) {
  const queryClient = useQueryClient();
  // const { chatData } = useGetChat();
  // const { isChatConnected } = useIsChatConnected();
  const chatData = [{ created_at: 0, userName: "yasin", textContent: "Hello" }];
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

  if (overflow)
    return (
      <ScrollArea className="opacity-100 transition-all hover:opacity-100 md:opacity-50">
        <div
          ref={scrollAreaOverlay}
          className={cn(
            "flex flex-1 flex-col space-y-2 overflow-y-auto overflow-x-hidden",
            className,
          )}
        >
          {chatData?.map((message) => (
            <div
              key={message.created_at}
              className="mr-2 flex min-w-[10rem] max-w-[14rem] items-start space-x-2 sm:min-w-[20rem] sm:max-w-xs"
            >
              <p className="!mt-[0.1rem] break-all text-sm">
                {message.userName}: {message.textContent}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    );

  return (
    <div
      className={cn(
        "border-gray-6 bg-gray-2 relative ml-auto flex h-full flex-col border-l p-4 pr-3",
        className,
      )}
    >
      <div className="border-gray-5 mb-2 flex justify-between border-b pb-3">
        <h1 className=" text-gray-11">Live Chat</h1>
      </div>
      <ScrollArea className="flex-1">
        <div
          ref={scrollArea}
          className="flex flex-1 flex-col space-y-2 overflow-y-auto "
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
      </ScrollArea>
      <form
        className="border-gray-5 mt-4 border-t pt-4"
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
    </div>
  );
}

//@ts-ignore
function OptionIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h6l6 18h6" />
      <path d="M14 3h7" />
    </svg>
  );
}

//@ts-ignore
function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
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
        size="2"
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
