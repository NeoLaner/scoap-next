"use client";
import * as Form from "@radix-ui/react-form";

import { useRef, useState } from "react";
import { addDirectLink } from "~/app/_actions/addDirectLink";
import { Textarea } from "~/app/_components/ui/Textarea";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useSourceData } from "~/app/_hooks/useSourceData";
import { useSourcesData } from "~/app/_hooks/useSourcesData";
import { useUserData } from "~/app/_hooks/useUserData";
import { Button } from "~/app/_components/ui/Button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/app/_components/ui/toggle-group";
import { Switch } from "~/app/_components/ui/switch";
import { checkIsDynamic } from "~/lib/source";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/app/_components/ui/sheet";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { Checkbox } from "~/app/_components/ui/checkbox";

function StreamForm() {
  const [openModal, setOpenModal] = useState(false);
  const { roomData } = useRoomData();
  const [isFocused, setIsFocused] = useState(false);
  const [source, setSource] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [description, setDescription] = useState("");

  const isDynamic = checkIsDynamic(source);
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

  async function handleAction() {
    const sourceData = await addDirectLink({
      roomId: roomData.id,
      sourceLink: source,
      seasonBoundary: [1, 2],
      isPublic: false,
      imdbId: roomData.imdbId,
      season: roomData.season ?? undefined,
      episode: roomData.episode ?? undefined,
    });

    if (!sourceData?.mediaSourceData.videoLink) return;
    setSourceData({ videoLink: sourceData.mediaSourceData.videoLink });
    const newSource = { user: userData, ...sourceData.sourceData };
    // setSourcesData((sources) => {
    //   const prvSourceWithoutUser = sources?.filter(
    //     (source) => source.userId !== userData.id,
    //   );
    //   if (prvSourceWithoutUser) return [...prvSourceWithoutUser, newSource];
    //   return [newSource];
    // });
    // mediaSocket.emit("sourceDataChanged", { payload: newSource });
    setOpenModal(false);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            variant={"default"}
            className="absolute bottom-2 right-4 z-30 rounded-md  bg-green-600 text-xl hover:bg-green-700"
          >
            +
          </Button>
        </SheetTrigger>

        <SheetContent side={"right"} className="h-full w-full px-0">
          <ScrollArea className="h-full">
            <div className="h-fit px-6">
              <SheetHeader className="mb-4">
                <SheetTitle>Add a source</SheetTitle>
                <SheetDescription>
                  Add a video link, this link be showed to other users on the
                  same room.
                </SheetDescription>
              </SheetHeader>
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
                    className="flex flex-col  justify-center"
                    type="url"
                  />
                  <div>
                    <div>Source Link</div>
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
                  </div>
                </Form.Field>

                <Form.Field className="flex flex-col " name="name">
                  <div className="flex items-baseline justify-between">
                    <Form.Message
                      className="text-solid-gray-2 text-[13px] opacity-[0.8]"
                      match="tooShort"
                    >
                      Please provide a valid link
                    </Form.Message>
                  </div>
                  <Form.Control
                    asChild
                    className="flex flex-col  justify-center"
                  >
                    <div>
                      <div>Description</div>
                      <Textarea
                        rows={2}
                        required
                        placeholder="Example: 720p PSAx265 English Softsub"
                        id="link"
                        name="link"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={handleKeyDown}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={200}
                        minLength={20}
                      />
                    </div>
                  </Form.Control>
                </Form.Field>
                {isDynamic && (
                  <div className="mt-2 flex gap-4">
                    Be public:
                    <Checkbox
                      value={isPublic ? "on" : "off"}
                      onCheckedChange={(checked) =>
                        setIsPublic(Boolean(checked))
                      }
                    />
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
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default StreamForm;
