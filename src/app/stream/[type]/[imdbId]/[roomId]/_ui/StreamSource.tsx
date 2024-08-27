"use client";

import { Button } from "~/app/_components/ui/Button";

import { Badge } from "~/app/_components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { getFirstTwoLetters } from "~/lib/utils";
import { checkIsDynamic, makeRawSource } from "~/lib/source";
import { useUserData } from "~/app/_hooks/useUserData";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { Separator } from "~/app/_components/ui/separator";
import {
  ArrowRightCircle,
  CheckCircle2,
  CircleEllipsis,
  Trash2,
} from "lucide-react";
import { type api } from "~/trpc/server";

import {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from "~/app/_components/ui/dropdown-menu";
import { PiCopyBold } from "react-icons/pi";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "~/app/_components/ui/dialog";
import { deleteMySource } from "~/app/_actions/deleteMySource";
import { useRef } from "react";
import { useSourceData } from "~/app/_hooks/useSourceData";

type MediaSource = Awaited<
  ReturnType<typeof api.mediaSource.getAllRoomSources>
>[number];
export function StreamSource({ source }: { source: MediaSource }) {
  const { userData } = useUserData();
  const { roomData } = useRoomData();
  const { sourceData: curUserSource, setSourceData } = useSourceData();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isOwner = userData.id === source.ownerId;

  const [_, copyToClipboard] = useCopyToClipboard();
  const rawSource = makeRawSource({
    source: source.videoLink,
    season: roomData.season,
    episode: roomData.episode,
  });

  const isSelectedSource = curUserSource?.mediaSourceId === source.id;

  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border p-4 py-2 ${isSelectedSource ? "border-success-foreground  " : ""}`}
    >
      <Dialog>
        <div className="flex items-center justify-between">
          {/* Users Profile */}
          <div className="">{source.name}</div>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  asChild
                  variant={"ghost"}
                  size={"icon"}
                  className="items-center justify-center overflow-hidden rounded-md p-1"
                >
                  <CircleEllipsis size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-50 text-sm">
                {roomData.type === "movie" && (
                  <DropdownMenuItem
                    onClick={async () => {
                      await copyToClipboard(source.videoLink);
                      toast.success(
                        "Link copied to your clipboard successfully.",
                      );
                    }}
                  >
                    <div className="flex gap-2">
                      <PiCopyBold size={22} />

                      <span>Copy </span>
                    </div>
                  </DropdownMenuItem>
                )}
                {roomData.type === "series" && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <div className="flex gap-2">
                        <PiCopyBold size={22} />

                        <span>Copy </span>
                      </div>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          onClick={async () => {
                            await copyToClipboard(source.videoLink);
                            toast.success(
                              "Link copied to your clipboard successfully.",
                            );
                          }}
                        >
                          {/* <Mail className="mr-2 h-4 w-4" /> */}
                          <span>Copy the main link</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            await copyToClipboard(rawSource);
                            toast.success(
                              "Link copied to your clipboard successfully.",
                            );
                          }}
                        >
                          {/* <MessageSquare className="mr-2 h-4 w-4" /> */}
                          <span>Copy the current episode link</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                )}

                {isOwner && (
                  <>
                    <DropdownMenuSeparator />

                    <DialogTrigger asChild>
                      <DropdownMenuItem>
                        {" "}
                        <div className="flex gap-2">
                          <Trash2 size={22} />

                          <span>Delete </span>
                        </div>
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={"ghost"}
              size={"icon"}
              className="items-center justify-center overflow-hidden rounded-sm hover:bg-success"
              onClick={() => {
                setSourceData((prvSrc) => {
                  const newSource = {
                    ...prvSrc,
                    MediaSource: source,
                    mediaSourceId: source.id,
                  } as typeof prvSrc;
                  return newSource;
                });
              }}
            >
              {isSelectedSource ? (
                <CheckCircle2 className="text-success-foreground " />
              ) : (
                <ArrowRightCircle />
              )}
            </Button>
          </div>
        </div>
        {/* <Separator />

      <div className="relative h-20 rounded-lg ">
        <Button
          className="absolute bottom-1 right-2 z-50 h-6 w-6 p-1"
          variant={"secondary"}
          onClick={() => setShowDesc((prv) => !prv)}
        >
          <PiArrowClockwiseBold size={30} />
        </Button>
        <ScrollArea className="h-full">
          <div className="break-all p-2 text-sm text-primary-foreground/90">
            {desc ? (showDesc ? desc : source) : source}{" "}
          </div>{" "}
        </ScrollArea>
      </div> */}

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {checkIsDynamic(source.videoLink) && (
              <Badge className="bg-purple-700 text-purple-50 hover:bg-purple-800">
                Dynamic
              </Badge>
            )}
            {source.quality && (
              <Badge className="bg-blue-700 text-blue-50 hover:bg-blue-800">
                {source.quality}p
              </Badge>
            )}
            {source.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Avatar
              className={`flex h-8 w-8 items-center justify-center rounded-md border-2 shadow-2xl transition-all`}
            >
              <AvatarImage src={source.user.image ?? ""} className="" />
              <AvatarFallback className="rounded-md">
                {getFirstTwoLetters(source.user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete source</DialogTitle>
            <DialogDescription>
              This action is permanent, Are you sure to delete this source?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild ref={closeBtnRef} className="">
              <Button variant={"link"} className="text-foreground">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={async () => {
                await deleteMySource(source.id);
                closeBtnRef.current?.click();
                toast.success("The source successfully deleted.");
              }}
              variant={"destructive"}
            >
              Yes, I&apos;m Sure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
