"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  loading: () => <Loader />,
});

import { useRef, useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { Button } from "~/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { checkIsDynamic, makeRawSource } from "~/lib/source";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Checkbox } from "~/components/ui/checkbox";
import { z } from "zod";

import { Input } from "~/components/ui/input";

import { useMetaData } from "~/app/_hooks/useMetaData";
import { extractUniqueSeasons } from "~/lib/metadata";
import Loader from "~/app/_ui/Loader";
import dynamic from "next/dynamic";
import { Separator } from "~/components/ui/separator";
import { addSubtitle } from "~/app/_actions/addSubtitle";
import { checkSubUrl } from "~/app/_actions/checkSubUrl";
import { usePublicSubs } from "~/app/_hooks/usePublicSubs";
import { useRoomSubs } from "~/app/_hooks/useRoomSubs";
import { useUsersSubData } from "~/app/_hooks/useUsersSub";
import { useSourceData } from "~/app/_hooks/useSourceData";
import { useCurSub } from "~/app/_hooks/useCurSub";

import { LanguagePopover } from "./LanguagePopover";
import { type languages } from "~/lib/languages";

const formSchema = z.object({
  url: z.string().url().max(250),
  name: z.string().min(3).max(20),
  translator: z.string().optional(),
  isPublic: z.boolean().optional(),
  seasonBoundary: z.array(z.string()),
});

function SubtitleForm() {
  const [selectedLanguage, setSelectedLanguage] = useState<
    (typeof languages)[number] | null
  >(null);
  const { setCurrentSubtitle } = useCurSub();
  const btnClose = useRef<HTMLButtonElement>(null);
  const { roomData } = useRoomData();
  const { metaData } = useMetaData();
  const { setPublicSubs } = usePublicSubs();
  const { setRoomSubs } = useRoomSubs();
  const { setUsersSubData } = useUsersSubData();
  const { setSourceData } = useSourceData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(
      formSchema.superRefine((form, context) => {
        // if (!form.language) {
        if (!selectedLanguage) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Choose a language",
            path: ["language"], // specify the path to the field with the issue
          });

          if (
            form.translator &&
            (form.translator.length < 3 || form.translator.length > 20)
          ) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "String must contain at least 3 character(s) and max 20 character(s)",
              path: ["translator"],
            });
          }
        }
      }),
    ),
    defaultValues: {
      url: "",
      name: "",
      isPublic: false,
      seasonBoundary: [String(roomData.season)],
      translator: "",
    },
  });

  const isDynamic =
    checkIsDynamic(form.watch("url") ?? "") && roomData.type === "series";
  const seasonBoundary = form.watch("seasonBoundary");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { corsStatus } = await checkSubUrl(values.url);
      const sub = await addSubtitle({
        ...values,
        roomId: roomData.id,
        imdbId: roomData.imdbId,
        mediaType: roomData.type === "series" ? "series" : "movie",
        crossorigin: corsStatus,
        language: selectedLanguage!,
      });
      btnClose.current?.click();
      if (values.isPublic)
        setPublicSubs((prv) => {
          if (sub?.subtitleData)
            return prv ? [...prv, sub.subtitleData] : [sub?.subtitleData];
        });

      setRoomSubs((prv) => {
        if (sub?.subtitleData)
          return prv ? [...prv, sub.subtitleData] : [sub?.subtitleData];
      });

      // setUsersSubData((prv) => {
      //   if (sub?.subtitleData)
      //     return prv ? [...prv, sub.sourceData] : [sub.sourceData];
      // });

      setSourceData((prv) => {
        if (!prv) return;
        return {
          ...prv,
          subtitleSourceId: sub?.subtitleData.id ?? "",
        };
      });
      if (!sub) return;
      setCurrentSubtitle(sub.subtitleData);
    } catch (err) {
      //TODO:Handle err
    }
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

        <SheetContent side={"right"} className="h-full w-full px-0 ">
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
                    name="translator"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Translator</FormLabel>
                        <FormControl>
                          <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input placeholder="Translator's name" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url"
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
                                source: form.getValues("url"),
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

                  <Separator />
                  <LanguagePopover
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                  />
                  <Separator />

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

export default SubtitleForm;
