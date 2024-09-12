"use client";

import { Button } from "~/app/_components/ui/Button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { cn, getFirstTwoLetters } from "~/lib/utils";
import { checkIsDynamic, makeRawSource } from "~/lib/source";
import { useUserData } from "~/app/_hooks/useUserData";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { Separator } from "~/app/_components/ui/separator";
import {
  ArrowRightCircle,
  CheckCircle2,
  CircleEllipsis,
  Trash2,
  TriangleAlert,
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
import {
  PiCardsThree,
  PiCardsThreeFill,
  PiClosedCaptioningFill,
  PiCopyBold,
  PiHighDefinition,
  PiHighDefinitionFill,
} from "react-icons/pi";
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
import { ReactNode, useRef } from "react";
import { useSourceData } from "~/app/_hooks/useSourceData";
import { useCurMediaSrc } from "~/app/_hooks/useCurMediaSrc";
import { updateSource } from "~/app/_actions/updateSource";
import { createSource } from "~/app/_actions/createSource";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import { usePublicSources } from "~/app/_hooks/usePublicSources";
import { useUsersSourceData } from "~/app/_hooks/useUsersSourceData";
import { useRoomSources } from "~/app/_hooks/useRoomSources";

type MediaSource = NonNullable<Awaited<ReturnType<typeof api.mediaSource.get>>>;
export function StreamSource({ source }: { source: MediaSource }) {
  const { userData } = useUserData();
  const { roomData } = useRoomData();
  const { sourceData: curUserSource, setSourceData } = useSourceData();
  const { setCurrentMediaSrc } = useCurMediaSrc();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isOwner = userData.id === source.ownerId;

  const [_, copyToClipboard] = useCopyToClipboard();
  const rawSource = makeRawSource({
    source: source.videoUrl,
    season: roomData.season,
    episode: roomData.episode,
  });

  const isSelectedSource = curUserSource?.mediaSourceId === source.id;

  const { setPublicSources } = usePublicSources();
  const { setUsersSourceData } = useUsersSourceData();
  const { setRoomSourcesData } = useRoomSources();
  const deleteHandler = async () => {
    await deleteMySource(source.id);
    closeBtnRef.current?.click();

    //delete sources from source tab
    setPublicSources((prv) => prv?.filter((src) => src.id !== source.id));
    setRoomSourcesData((prv) => prv?.filter((src) => src.id !== source.id));
    setUsersSourceData((prv) =>
      prv?.filter((src) => src.MediaSource.id !== source.id),
    );

    toast.success("The source successfully deleted.");
  };

  return (
    <div
      className={`w-full  gap-2 rounded-lg  border-2 p-4 py-2 ${isSelectedSource ? "border-success-foreground bg-success/50" : ""}`}
    >
      <Dialog>
        <div className="flex w-full items-center justify-between ">
          {/* Users Profile */}
          <div className="flex gap-2">
            <UserProfile source={source} />
            <div className="flex flex-col">
              <p className=" text-sm">{source.name}</p>
              <p className=" text-xs text-muted-foreground">
                Made by: {source.user.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <div className="flex flex-col flex-wrap items-center  gap-1 ">
              <div className="flex">
                <QualityIcon source={source} />
                <SubtitleIcon source={source} />
                <QualityTypeIcon source={source} />
              </div>
              <div className="flex">
                {checkIsDynamic(source.videoUrl) && <IconText>dyn</IconText>}
                {source.dubbed ? (
                  <IconText>dub</IconText>
                ) : (
                  <IconText disable>dub</IconText>
                )}
              </div>

              {/* {source.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))} */}
            </div>

            <Separator orientation="vertical" className="h-full" />

            <div className="flex flex-col items-center border-l-2 pl-2">
              {roomData.season &&
                !source.seasonBoundary.includes(roomData.season) && (
                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className="text-warning-foreground hover:text-warning-foreground"
                        >
                          <TriangleAlert />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent className="text-sm">
                        This link just provided
                        <span className="font-bold text-primary">
                          {" "}
                          {source.seasonBoundary.length > 1
                            ? "seasons"
                            : "season"}{" "}
                          {source.seasonBoundary.join(", ")}
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

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
                        await copyToClipboard(source.videoUrl);
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
                              await copyToClipboard(source.videoUrl);
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
                onClick={async () => {
                  setSourceData((prvSrc) => {
                    if (!prvSrc) return;
                    const newSource = {
                      ...prvSrc,
                      mediaSourceId: source.id,
                    };
                    return newSource;
                  });
                  const newSource = curUserSource?.id
                    ? await updateSource({
                        sourceId: curUserSource?.id,
                        mediaSourceId: source.id,
                      })
                    : await createSource({
                        roomId: roomData.id,
                        mediaSourceId: source.id,
                      });
                  if (newSource) setCurrentMediaSrc(source);
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

const UserProfile = function ({ source }: { source: MediaSource }) {
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

const SubtitleIcon = function ({ source }: { source: MediaSource }) {
  const text = source.hardsub ? "hcc" : "cc";

  return <IconText disable={!source.hardsub}>{text}</IconText>;
};

const QualityIcon = function ({ source }: { source: MediaSource }) {
  let text;
  switch (source.quality) {
    case "360":
      text = "sd";
      break;
    case "480":
      text = "sd";
      break;
    case "720":
      text = "hd";
      break;
    case "1080":
      text = "fhd";
      break;
    case "1440":
      text = "qhd";
      break;
    case "2160":
      text = "uhd";
      break;
    default:
      text = "FHD";
      break;
  }
  return <IconText disable={!source.quality}>{text}</IconText>;
};

const QualityTypeIcon = function ({ source }: { source: MediaSource }) {
  let text;
  switch (source.qualityType) {
    case "BluRay":
      text = "blu";
      break;
    case "WebDl":
      text = "web";
      break;
    case "CAM":
      text = "cam";
      break;
    default:
      text = "cam";
      break;
  }
  return <IconText disable={!source.quality}>{text}</IconText>;
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
