"use client";
import { type FormEvent, useState } from "react";
import { PiPaperPlaneBold } from "react-icons/pi";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { mediaSocket } from "~/lib/socket/socket";

function ChatFooter() {
  const [message, setMessage] = useState("");
  function messageSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message) return;
    mediaSocket.emit("chat:userMessaged", {
      payload: { textContent: message },
    });
    setMessage("");
  }

  return (
    <form className="w-full p-4 px-4" onSubmit={messageSubmitHandler}>
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
  );
}

export default ChatFooter;
