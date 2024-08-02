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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/app/_components/ui/toggle-group";
import { Switch } from "~/app/_components/ui/switch";

const containsSeason = (source: string): boolean => {
  return source.includes("{season}");
};

const containsEpisode = (source: string): boolean => {
  return source.includes("{episode}");
};

function StreamForm() {
  const [openModal, setOpenModal] = useState(false);
  const { roomData } = useRoomData();
  const [isFocused, setIsFocused] = useState(false);
  const [source, setSource] = useState("");
  const isContainsSeason = containsSeason(source);
  const isContainsEpisode = containsEpisode(source);
  const isDynamic = isContainsSeason || isContainsEpisode;
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
    setOpenModal(false);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Dialog open={openModal} onOpenChange={(open) => setOpenModal(open)}>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            variant={"default"}
            className="absolute bottom-2 right-4 z-30 rounded-md  bg-green-600 text-xl hover:bg-green-700"
          >
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
            className="flex w-full flex-col gap-2"
            action={handleAction}
          >
            <Form.Field className="flex flex-col " name="name">
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
                  rows={2}
                  required
                  placeholder="Add mp4/mkv/... link"
                  id="link"
                  name="link"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  maxLength={200}
                />
              </Form.Control>
            </Form.Field>
            {isDynamic && (
              <div className="mt-2 flex gap-4">
                Be public:
                <Switch />
              </div>
            )}

            {isDynamic && (
              <ToggleGroup
                type="multiple"
                variant={"outline"}
                className="mt-2 justify-start gap-0"
                defaultValue={["1", "2"]}
              >
                <p className="mr-4">Seasons: </p>
                <ToggleGroupItem value="0" className="rounded-r-none">
                  0
                </ToggleGroupItem>
                <ToggleGroupItem value="1" className="rounded-none">
                  1
                </ToggleGroupItem>
                <ToggleGroupItem value="2" className="rounded-l-none">
                  2
                </ToggleGroupItem>
              </ToggleGroup>
            )}
            <Form.Submit className="self-end" asChild>
              <Button className="w-fit">Submit</Button>
            </Form.Submit>
          </Form.Root>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StreamForm;
