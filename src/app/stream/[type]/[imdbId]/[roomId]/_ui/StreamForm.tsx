"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { useState } from "react";
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
import { TagEnum } from "~/lib/@types/Media";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { extractUniqueSeasons } from "~/lib/metadata";

const formSchema = z.object({
  sourceLink: z.string().url().max(250),
  name: z.string().min(3).max(20),
  isPublic: z.boolean().optional(),
  seasonBoundary: z.array(z.string()),
  quality: z.string(),
  tags: z.array(TagEnum),
});

function StreamForm() {
  const [_, setOpenModal] = useState(false);
  const { roomData } = useRoomData();
  const { metaData } = useMetaData();

  const { setSourceData } = useSourceData();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceLink: "",
      name: "",
      isPublic: false,
      seasonBoundary: [String(roomData.season)],
      quality: "",
      tags: [],
    },
  });
  const watch = useWatch({ control: form.control });

  const isDynamic = checkIsDynamic(watch.sourceLink ?? "");
  const seasonBoundary = watch.seasonBoundary;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const sourceData = await addDirectLink({
      roomId: roomData.id,
      ...values,
      imdbId: roomData.imdbId,
      season: roomData.season ?? undefined,
      episode: roomData.episode ?? undefined,
    });

    if (!sourceData?.mediaSourceData.videoLink) return;
    setSourceData({ videoLink: sourceData.mediaSourceData.videoLink });
    // const newSource = { user: userData, ...sourceData.sourceData };
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

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="sourceLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source link</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="add a media url with mp4/mkv/m3u8 formats."
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="name for your link" {...field} />
                        </FormControl>
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
                  {isDynamic && (
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
                            <ToggleGroupItem value="1080">
                              1080p
                            </ToggleGroupItem>
                            <ToggleGroupItem value="1440">
                              1440p
                            </ToggleGroupItem>
                            <ToggleGroupItem value="2160">
                              2160p
                            </ToggleGroupItem>
                          </ToggleGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {isDynamic && (
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem className=" gap-2">
                          <ToggleGroup
                            type="multiple"
                            className="mt-2 flex-wrap justify-start"
                            value={field.value}
                            onValueChange={field.onChange}
                            size={"sm"}
                          >
                            <FormLabel>Tags:</FormLabel>

                            <ToggleGroupItem value="Hardsub">
                              Hardsub
                            </ToggleGroupItem>
                            <ToggleGroupItem value="Softsub">
                              SoftSub
                            </ToggleGroupItem>
                            <ToggleGroupItem value="Dubbed">
                              Dubbed
                            </ToggleGroupItem>
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
                  )}
                  {isDynamic && (
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
                  )}
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

export default StreamForm;
