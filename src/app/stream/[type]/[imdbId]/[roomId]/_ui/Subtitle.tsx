"use client";

import { Button } from "~/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn, getFirstTwoLetters } from "~/lib/utils";
import {
  checkIsDynamic,
  createUrlFromPrats,
  makeRawSource,
} from "~/lib/source";
import { useUserData } from "~/app/_hooks/useUserData";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { Separator } from "~/components/ui/separator";
import {
  ArrowRightCircle,
  CheckCircle2,
  CircleEllipsis,
  Pencil,
  Trash2,
  XCircle,
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
} from "~/components/ui/dropdown-menu";
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
} from "~/components/ui/dialog";

import { type ReactNode, useRef } from "react";
import { useSourceData } from "~/app/_hooks/useSourceData";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { useGetRightPanelSize } from "~/app/_hooks/useGetRightPanelSize";
import { useUsersSubData } from "~/app/_hooks/useUsersSub";
import { useRoomSubs } from "~/app/_hooks/useRoomSubs";
import { usePublicSubs } from "~/app/_hooks/usePublicSubs";
import { useCurSub } from "~/app/_hooks/useCurSub";
import { addSub } from "~/app/_actions/addSub";
import { deleteMySub } from "~/app/_actions/deleteMySub";

type SubtitleType = NonNullable<Awaited<ReturnType<typeof api.subtitle.get>>>;
export function Subtitle({ source }: { source: SubtitleType }) {
  const { rightPanelWidth } = useGetRightPanelSize();
  const { userData } = useUserData();
  const { roomData } = useRoomData();
  const { sourceData: curUserSource, setSourceData } = useSourceData();
  const { setCurrentSubtitle } = useCurSub();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isOwner = userData?.id === source.ownerId;
  const outOfBoundary = Boolean(
    checkIsDynamic(
      createUrlFromPrats({
        protocol: source.protocol,
        domain: source.domain,
        pathname: source.pathname,
      }),
    ) &&
      roomData.season &&
      !source.seasonBoundary.includes(roomData.season),
  );

  const [_, copyToClipboard] = useCopyToClipboard();
  const rawSource = makeRawSource({
    source: createUrlFromPrats({
      protocol: source.protocol,
      domain: source.domain,
      pathname: source.pathname,
    }),
    season: roomData.season,
    episode: roomData.episode,
  });

  const isSelectedSource = curUserSource?.subtitleSourceId === source.id;

  const { setPublicSubs } = usePublicSubs();
  const { setUsersSubData } = useUsersSubData();
  const { setRoomSubs } = useRoomSubs();
  const deleteHandler = async () => {
    await deleteMySub(source.id);
    closeBtnRef.current?.click();

    //delete sources from source tab
    setPublicSubs((prv) => prv?.filter((src) => src.id !== source.id));
    setRoomSubs((prv) => prv?.filter((src) => src.id !== source.id));
    setUsersSubData((prv) =>
      prv?.filter((src) => src.SubtitleSource?.id !== source.id),
    );

    toast.success("The source successfully deleted.");
  };

  return (
    <div
      className={cn(
        `w-full  gap-2 rounded-lg  border-2 p-4 py-2`,
        isSelectedSource ? "border-success-foreground bg-success/55" : "",
        outOfBoundary && "border-danger-foreground bg-danger/55",
      )}
    >
      <Dialog>
        <div className="flex w-full items-center justify-between ">
          {/* Users Profile */}
          <div className="flex gap-2">
            <div className={cn(rightPanelWidth < 360 && "hidden")}>
              <UserProfile source={source} />
            </div>
            <div className="flex flex-col">
              <p className=" text-sm">
                {source.name}
                <span className="text-md"> {source.language}</span>
              </p>
              <p className=" text-xs text-muted-foreground">
                {source.translator ? (
                  <div className="flex items-center gap-1">
                    <Pencil size={16} />
                    <p>{source.translator}</p>
                  </div>
                ) : (
                  `Shared by ${source.user.name}`
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <div className="flex flex-col flex-wrap items-center  gap-1 "></div>

            <Separator orientation="vertical" className="h-full" />

            <div className="flex flex-col items-center border-l-2 pl-2">
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
                        await copyToClipboard(
                          createUrlFromPrats({
                            protocol: source.protocol,
                            domain: source.domain,
                            pathname: source.pathname,
                          }),
                        );
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
                              await copyToClipboard(
                                createUrlFromPrats({
                                  protocol: source.protocol,
                                  domain: source.domain,
                                  pathname: source.pathname,
                                }),
                              );
                              toast.success(
                                "Link copied to your clipboard successfully.",
                              );
                            }}
                          >
                            {/* <Mail className="mr-2 h-4 w-4" /> */}
                            <span>Dynamic URL</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={async () => {
                              if (!rawSource) return;
                              await copyToClipboard(rawSource);
                              toast.success(
                                "Link copied to your clipboard successfully.",
                              );
                            }}
                          >
                            {/* <MessageSquare className="mr-2 h-4 w-4" /> */}
                            <span>Current episode</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  )}

                  {isOwner && (
                    <>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <DialogTrigger asChild>
                          <div className="flex gap-2">
                            <Trash2 size={22} />

                            <span>Delete </span>
                          </div>
                        </DialogTrigger>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                disabled={outOfBoundary}
                variant={"ghost"}
                size={"icon"}
                className="items-center justify-center overflow-hidden rounded-sm hover:bg-success"
                onClick={async () => {
                  const newSource = await addSub({
                    roomId: roomData.id,
                    subtitleSourceId: source.id,
                  });
                  setSourceData((prvSrc) => {
                    if (!prvSrc) return;
                    const newSource = {
                      ...prvSrc,
                      subtitleSourceId: source.id,
                    };
                    return newSource;
                  });
                  if (newSource) setCurrentSubtitle(source);
                }}
              >
                {isSelectedSource && !outOfBoundary && (
                  <CheckCircle2 className="text-success-foreground " />
                )}
                {!isSelectedSource && !outOfBoundary && <ArrowRightCircle />}
                {outOfBoundary && <XCircle />}
              </Button>
            </div>
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
            <Button onClick={deleteHandler} variant={"destructive"}>
              Yes, I&apos;m Sure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const UserProfile = function ({ source }: { source: SubtitleType }) {
  return (
    <div className="flex items-center">
      <Avatar
        className={`flex h-10 w-10 items-center justify-center rounded-md border-2 shadow-2xl transition-all`}
      >
        <AvatarImage src={source.user.image ?? ""} className="" />
        <AvatarFallback className="rounded-md">
          {getFirstTwoLetters(source.user.name)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

const IconText = function ({
  className,
  disable = false,
  children,
}: {
  className?: string;
  disable?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        `mx-[0.1rem] h-fit w-[1.8rem] select-none self-center rounded-[2px] px-[1px] text-center text-[0.68rem]  font-bold uppercase leading-4`,
        disable
          ? "bg-foreground/50 text-background"
          : "bg-foreground text-background",
        className,
      )}
    >
      {children}
    </div>
  );
};

function DynamicIcon({ source }: { source: SubtitleType }) {
  const { roomData } = useRoomData();
  const outOfBoundary =
    roomData.season && !source.seasonBoundary.includes(roomData.season);
  const isDynamic = checkIsDynamic(
    createUrlFromPrats({
      protocol: source.protocol,
      domain: source.domain,
      pathname: source.pathname,
    }),
  );
  return (
    <TooltipProvider>
      <Tooltip delayDuration={500}>
        <TooltipTrigger>
          <IconText
            disable={!isDynamic}
            className={cn(outOfBoundary && "bg-danger-foreground")}
          >
            dyn
          </IconText>
        </TooltipTrigger>
        {isDynamic && (
          <TooltipContent>
            <p>
              This source just included{" "}
              <span className="text-danger-foreground">
                {source.seasonBoundary.length > 1 ? "seasons" : "season"}{" "}
                {source.seasonBoundary.join(", ")}
              </span>
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
