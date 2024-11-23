"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  loading: () => <Loader />,
});

import { useRef, useState } from "react";
import { addDirectLink } from "~/app/_actions/addDirectLink";
import { Textarea } from "~/app/_components/ui/Textarea";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useSourceData } from "~/app/_hooks/useSourceData";
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
import { QualityTypeEnum } from "~/lib/@types/Media";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { extractUniqueSeasons } from "~/lib/metadata";
import Loader from "~/app/_ui/Loader";
import dynamic from "next/dynamic";

import { useUsersSourceData } from "~/app/_hooks/useUsersSourceData";
import { useCurMediaSrc } from "~/app/_hooks/useCurMediaSrc";
import { usePublicSources } from "~/app/_hooks/usePublicSources";
import { useRoomSources } from "~/app/_hooks/useRoomSources";
import { Separator } from "~/app/_components/ui/separator";
import Countries from "./Countries";

const formSchema = z.object({
  sourceLink: z.string().url().max(1000),
  name: z.string().min(3).max(20),
  isPublic: z.boolean().optional(),
  seasonBoundary: z.array(z.string()),
  quality: z.string(),
  qualityType: QualityTypeEnum,
  isHdr: z.boolean(),
});

function StreamForm() {
  const btnClose = useRef<HTMLButtonElement>(null);
  const { roomData } = useRoomData();
  const { metaData } = useMetaData();
  const { setPublicSources } = usePublicSources();
  const { setUsersSourceData } = useUsersSourceData();
  const { setRoomSourcesData } = useRoomSources();
  const { setCurrentMediaSrc } = useCurMediaSrc();
  const [countryEmoji, setCountryEmoji] = useState("");

  const { setSourceData } = useSourceData();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceLink: "",
      name: "",
      isPublic: false,
      seasonBoundary: [String(roomData.season)],
      quality: "",
      qualityType: "WebDl",
      isHdr: false,
    },
  });

  const isDynamic =
    checkIsDynamic(form.watch("sourceLink") ?? "") &&
    roomData.type === "series";
  const seasonBoundary = form.watch("seasonBoundary");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const sourceData = await addDirectLink({
      ...values,
      roomId: roomData.id,
      imdbId: roomData.imdbId,
      season: roomData.season ?? undefined,
      episode: roomData.episode ?? undefined,
      mediaType: roomData.type === "series" ? "series" : "movie",
      countryEmoji,
    });

    if (!sourceData) return;
    setSourceData(sourceData.sourceData);
    setCurrentMediaSrc(sourceData.mediaSourceData);
    if (values.isPublic)
      setPublicSources((prv) => {
        if (prv) return [...prv, sourceData.mediaSourceData];
        return [sourceData.mediaSourceData];
      });

    setUsersSourceData((prv) => {
      if (prv)
        return [
          ...prv,
          { ...sourceData.sourceData, MediaSource: sourceData.mediaSourceData },
        ];
      return [
        { ...sourceData.sourceData, MediaSource: sourceData.mediaSourceData },
      ];
    });

    setRoomSourcesData((prv) => {
      if (prv) return [...prv, sourceData.mediaSourceData];
      return [sourceData.mediaSourceData];
    });

    // mediaSocket.emit("sourceDataChanged", { payload: newSource });

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
                <SheetTitle>Add a source</SheetTitle>
                <SheetDescription>
                  Add a video link, this link be showed to other users on the
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
                    name="name"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name for your link" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* countries */}
                  <Countries
                    setCountryEmoji={setCountryEmoji}
                    placeHolder="Select country... (optional)"
                  />
                  <Separator />

                  <FormField
                    control={form.control}
                    name="sourceLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source link</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add a media url with mp4/mkv/m3u8 formats."
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
                                source: form.getValues("sourceLink"),
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
                    name="quality"
                    render={({ field }) => (
                      <FormItem className=" gap-2">
                        <ToggleGroup
                          type="single"
                          className="mt-2 flex-wrap justify-start"
                          value={field.value}
                          onValueChange={field.onChange}
                          size={"sm"}
                        >
                          <FormLabel>Quality: </FormLabel>

                          <ToggleGroupItem value="360">360p</ToggleGroupItem>
                          <ToggleGroupItem value="480">480p</ToggleGroupItem>
                          <ToggleGroupItem value="720">720p</ToggleGroupItem>
                          <ToggleGroupItem value="1080">1080p</ToggleGroupItem>
                          <ToggleGroupItem value="1440">1440p</ToggleGroupItem>
                          <ToggleGroupItem value="2160">2160p</ToggleGroupItem>
                        </ToggleGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="qualityType"
                    render={({ field }) => (
                      <FormItem className=" gap-2">
                        <ToggleGroup
                          type="single"
                          className="mt-2 flex-wrap justify-start"
                          value={field.value}
                          onValueChange={field.onChange}
                          size={"sm"}
                        >
                          <FormLabel>Format: </FormLabel>

                          <ToggleGroupItem value="WebDl">
                            Web-dl
                          </ToggleGroupItem>
                          <ToggleGroupItem value="BluRay">
                            Blu-ray
                          </ToggleGroupItem>
                          <ToggleGroupItem value="CAM">CAM</ToggleGroupItem>
                        </ToggleGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isHdr"
                    render={({ field }) => (
                      <FormItem className="flex items-end gap-2 ">
                        <FormControl className="flex items-center justify-center">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Is that in HDR format?</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex items-end gap-2 pb-[60px]">
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

                  <div className="absolute  bottom-0  !mt-2 w-full bg-background pr-10 pt-2">
                    <Button className="  w-full" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default StreamForm;
