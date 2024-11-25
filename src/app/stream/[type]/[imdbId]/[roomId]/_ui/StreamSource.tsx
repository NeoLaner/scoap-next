"use client";

import { Button } from "~/app/_components/ui/Button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { cn, getFirstTwoLetters } from "~/lib/utils";
import {
  checkIsDynamic,
  createUrlFromPrats,
  makeRawSource,
} from "~/lib/source";
import { useUserData } from "~/app/_hooks/useUserData";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { Separator } from "~/app/_components/ui/separator";
import {
  ArrowRightCircle,
  CheckCircle2,
  CircleEllipsis,
  Trash2,
  TriangleAlert,
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
import { useCurMediaSrc } from "~/app/_hooks/useCurMediaSrc";
import { updateSource } from "~/app/_actions/updateSource";
import { createSource } from "~/app/_actions/createSource";

import { usePublicSources } from "~/app/_hooks/usePublicSources";
import { useUsersSourceData } from "~/app/_hooks/useUsersSourceData";
import { useRoomSources } from "~/app/_hooks/useRoomSources";
import { useGetRightPanelSize } from "~/app/_hooks/useGetRightPanelSize";
import {
  DynamicIcon,
  IconText,
  QualityIcon,
  QualityTypeIcon,
  SubtitleIcon,
} from "~/app/_components/ui/IconComponents";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";

type MediaSource = NonNullable<Awaited<ReturnType<typeof api.mediaSource.get>>>;
export function StreamSource({ source }: { source: MediaSource }) {
  const { rightPanelWidth } = useGetRightPanelSize();
  const { userData } = useUserData();
  const { roomData } = useRoomData();
  const { sourceData: curUserSource, setSourceData } = useSourceData();
  const { setCurrentMediaSrc } = useCurMediaSrc();
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
  const url = createUrlFromPrats({
    protocol: source.protocol,
    domain: source.domain,
    pathname: source.pathname,
  });
  const { error, status } = useQuery({
    queryFn: () => {
      let source = url;
      if (checkIsDynamic(url))
        source = makeRawSource({
          source: url,
          season: roomData.season,
          episode: 1,
        });
      return fetch(source, { method: "HEAD" });
    },
    queryKey: [url],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,
  });

  const [_, copyToClipboard] = useCopyToClipboard();
  const rawSource = makeRawSource({
    source: createUrlFromPrats({
      domain: source?.domain,
      pathname: source?.pathname,
      protocol: source?.protocol,
    }),
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
      className={cn(
        `w-full  gap-2 rounded-lg  border-2 p-4 py-2`,
        isSelectedSource ? "border-success-foreground bg-success/55" : "",
        outOfBoundary && "border-danger-foreground bg-danger/55",
        error && "opacity-60",
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
              <div className="flex items-center">
                <p className=" text-sm">
                  {source.name}
                  <span className="text-md"> {source.country}</span>
                </p>

                {status === "error" && (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <TriangleAlert className="w-4 text-danger-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>{error.message}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {status === "pending" && (
                  <div className="loader-spinner mr-1 !w-1" />
                )}
              </div>
              <p className=" text-xs text-muted-foreground">
                Shared by: {source.user.name}
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
                <DynamicIcon source={source} />

                <IconText disable={!source.dubbed}>dub</IconText>
                <IconText>{source.isHdr ? "hdr" : "sdr"}</IconText>
              </div>
            </div>

            <Separator orientation="vertical" className="h-full" />

            <div className="flex flex-col items-center border-l-2 pl-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="items-center justify-center overflow-hidden rounded-md p-1"
                    asChild
                  >
                    <CircleEllipsis size={20} className="cursor-pointer" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-50 text-sm">
                  {roomData.type === "movie" && (
                    <DropdownMenuItem
                      onClick={async () => {
                        await copyToClipboard(
                          createUrlFromPrats({
                            domain: source?.domain,
                            pathname: source?.pathname,
                            protocol: source?.protocol,
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
                                  domain: source?.domain,
                                  pathname: source?.pathname,
                                  protocol: source?.protocol,
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
