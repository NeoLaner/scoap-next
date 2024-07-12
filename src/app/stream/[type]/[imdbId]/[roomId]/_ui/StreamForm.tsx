"use client";
import * as Form from "@radix-ui/react-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";

import { useRef, useState } from "react";
import { addDirectLink } from "~/app/_actions/addDirectLink";
import { Textarea } from "~/app/_components/ui/Textarea";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useSourceData } from "~/app/_hooks/useSourceData";
import { useSourcesData } from "~/app/_hooks/useSourcesData";
import { useUserData } from "~/app/_hooks/useUserData";
import { mediaSocket } from "~/lib/socket/socket";
import { Button } from "~/app/_components/ui/Button";

function StreamForm() {
  const { roomData } = useRoomData();
  const [isFocused, setIsFocused] = useState(false);
  const [source, setSource] = useState("");
  const { setSourceData } = useSourceData();
  const { setSourcesData } = useSourcesData();
  const { userData } = useUserData();
  const ref = useRef<HTMLFormElement>();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent new line
      ref.current?.requestSubmit();
      setSource("");
    }
  };

  async function handleAction(data: FormData) {
    const sourceData = await addDirectLink(data, roomData.id);
    if (!sourceData) return;
    setSourceData(sourceData);
    const newSource = { user: userData, ...sourceData };
    setSourcesData((sources) => {
      const prvSourceWithoutUser = sources?.filter(
        (source) => source.userId !== userData.id,
      );
      if (prvSourceWithoutUser) return [...prvSourceWithoutUser, newSource];
      return [newSource];
    });
    mediaSocket.emit("sourceDataChanged", { payload: newSource });
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Dialog>
        <DialogTrigger>
          <Button className="absolute bottom-24 right-0 z-30 rounded-md bg-green-600 hover:bg-green-700">
            +
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Source</DialogTitle>
            <DialogDescription>
              Add a video link, this link be showed to other users on the same
              room.
            </DialogDescription>
          </DialogHeader>
          <Form.Root
            ref={ref}
            autoComplete="off"
            className="w-full"
            action={handleAction}
          >
            <Form.Field className="flex flex-col items-center" name="name">
              <div className="flex items-baseline justify-between">
                <Form.Message
                  className="text-solid-gray-2 text-[13px] opacity-[0.8]"
                  match="valueMissing"
                >
                  Please enter your link
                </Form.Message>
                <Form.Message
                  className="text-solid-gray-2 text-[13px] opacity-[0.8]"
                  match="typeMismatch"
                >
                  Please provide a valid link
                </Form.Message>
              </div>
              <Form.Control
                asChild
                className="flex items-center justify-center"
              >
                <Textarea
                  className={`${isFocused ? "h-20" : "h-8"}`}
                  required
                  placeholder="Add mp4/mkv/... link"
                  id="link"
                  name="link"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </Form.Control>
            </Form.Field>
            {/* <Form.Submit asChild>
          <Button className="focus:shadow-black mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-solid-primary-1 px-[15px] font-medium leading-none text-solid-gray-2 shadow-[0_2px_10px] shadow-blackA4 transition-all hover:bg-solid-primary-2 focus:shadow-[0_0_0_2px] focus:outline-none">
            Update profile
          </Button>
        </Form.Submit> */}
          </Form.Root>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StreamForm;
