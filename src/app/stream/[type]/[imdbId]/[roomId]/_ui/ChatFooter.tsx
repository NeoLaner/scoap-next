"use client";
import { type FormEvent, useState } from "react";
import { PiPaperPlaneBold } from "react-icons/pi";
import { Button } from "~/app/_components/ui/Button";
import { Input } from "~/app/_components/ui/input";
import socketEmitters from "~/app/_services/socket/socketEmit";

function ChatFooter() {
  const [message, setMessage] = useState("");
  function messageSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message) return;
    socketEmitters.sendMessage({ textContent: message });
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
