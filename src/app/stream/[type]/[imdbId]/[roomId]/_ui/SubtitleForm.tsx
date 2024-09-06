"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  loading: () => <Loader />,
});

import { useRef, useState } from "react";
import { Textarea } from "~/app/_components/ui/Textarea";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { Button } from "~/app/_components/ui/Button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/app/_components/ui/toggle-group";
import { checkIsDynamic, makeRawSource } from "~/lib/source";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/app/_components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { Checkbox } from "~/app/_components/ui/checkbox";
import { z } from "zod";

import { Input } from "~/app/_components/ui/input";

import { useMetaData } from "~/app/_hooks/useMetaData";
import { extractUniqueSeasons } from "~/lib/metadata";
import Loader from "~/app/_ui/Loader";
import dynamic from "next/dynamic";
import { Categories, Theme } from "emoji-picker-react";
import { GlobeIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";

const formSchema = z.object({
  subUrl: z.string().url().max(250),
  name: z.string().min(3).max(20),
  translator: z.string().min(3).max(50),
  isPublic: z.boolean().optional(),
  seasonBoundary: z.array(z.string()),
  language: z.string(),
});

function SubtitleForm() {
  const btnClose = useRef<HTMLButtonElement>(null);
  const { roomData } = useRoomData();
  const { metaData } = useMetaData();
  const [showFlags, setShowFlags] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subUrl: "",
      name: "",
      isPublic: false,
      seasonBoundary: [String(roomData.season)],
      translator: "",
      language: "",
    },
  });

  const isDynamic =
    checkIsDynamic(form.watch("subUrl") ?? "") && roomData.type === "series";
  const seasonBoundary = form.watch("seasonBoundary");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    btnClose.current?.click();
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Sheet>
        <SheetClose ref={btnClose} />
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
                <SheetTitle>Add a subtitle source</SheetTitle>
                <SheetDescription>
                  Add a subtitle link, this link be showed to other users on the
                  same room.
                </SheetDescription>
              </SheetHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="subUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source link</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add a subtitle url with SRT format."
                            {...field}
                          />
                        </FormControl>
                        {seasonBoundary?.length !== 0 && isDynamic && (
                          <FormDescription className="text-wrap break-all text-xs">
                            <span className="font-bold text-primary">
                              Preview:{" "}
                            </span>
                            <span>
                              {" "}
                              {makeRawSource({
                                source: form.getValues("subUrl"),
                                season: Math.min(
                                  ...(seasonBoundary?.map((s) => Number(s)) ??
                                    []),
                                ),
                                episode: 1,
                              })}
                            </span>
                          </FormDescription>
                        )}

                        {
                          <>
                            {!isDynamic && roomData.type === "series" && (
                              <FormDescription className="text-wrap break-all text-xs">
                                <span>It just applied to: </span>
                                <span className="font-bold text-primary">
                                  Season {roomData.season} & Episode{" "}
                                  {roomData.episode}
                                </span>
                              </FormDescription>
                            )}
                          </>
                        }
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                              placeholder="Name for your link"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <Popover>
                        <FormItem className="relative">
                          <FormLabel>Language</FormLabel>
                          <FormControl>
                            <div className="flex w-full max-w-sm items-center space-x-2">
                              <Input
                                placeholder="Select a language"
                                {...field}
                              />
                              <PopoverTrigger>
                                <Button
                                  asChild
                                  size={"icon"}
                                  variant={"ghost"}
                                  className="  right-2 top-9 z-50 w-8 px-1"
                                  onClick={() => {
                                    setShowFlags(true);
                                  }}
                                >
                                  <GlobeIcon size={30} />
                                </Button>
                              </PopoverTrigger>
                            </div>
                          </FormControl>
                          <FormMessage />

                          <PopoverContent className=" min-h-28 min-w-36">
                            <EmojiPicker
                              width={255}
                              height={200}
                              skinTonesDisabled
                              categories={[
                                {
                                  category: Categories.FLAGS,
                                  name: "Countries",
                                },
                              ]}
                              theme={Theme.DARK}
                              lazyLoadEmojis
                              onEmojiClick={(emoji) => {
                                form.setValue(
                                  "name",
                                  `${form.watch("name")} ${emoji.emoji}`,
                                );
                                form.setFocus("name");
                              }}
                            />
                          </PopoverContent>
                        </FormItem>
                      </Popover>
                    )}
                  />

                  {isDynamic && (
                    <FormField
                      control={form.control}
                      name="seasonBoundary"
                      render={({ field }) => (
                        <FormItem className="flex items-end gap-2">
                          <ToggleGroup
                            type="multiple"
                            className="mt-2 flex flex-wrap justify-start"
                            value={field.value}
                            onValueChange={field.onChange}
                            size={"sm"}
                          >
                            <FormLabel>Seasons:</FormLabel>
                            {extractUniqueSeasons(metaData.videos).map(
                              (season) => (
                                <ToggleGroupItem
                                  key={season}
                                  value={String(season)}
                                >
                                  {season}
                                </ToggleGroupItem>
                              ),
                            )}
                          </ToggleGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex items-end gap-2">
                        <FormControl className="flex items-center justify-center">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          Link be publicly available in all rooms?
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SubtitleForm;
