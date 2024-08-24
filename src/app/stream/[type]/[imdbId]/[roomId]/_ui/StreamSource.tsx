"use client";

import { Button } from "~/app/_components/ui/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Badge } from "~/app/_components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { getFirstTwoLetters } from "~/lib/utils";
import { checkIsDynamic, makeRawSource } from "~/lib/source";
import { useUserData } from "~/app/_hooks/useUserData";
import { type UniqueSourceWithUsers } from "~/lib/@types/UniqueSource";
import StreamSourcesProfile from "./StreamSourcesProfile";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { Separator } from "~/app/_components/ui/separator";
import { ArrowRightCircle, CircleEllipsis } from "lucide-react";
import { type api } from "~/trpc/server";

type MediaSource = Awaited<
  ReturnType<typeof api.mediaSource.getAllRoomSources>
>[number];
export function StreamSource({
  source,
}: {
  source: {
    name: MediaSource["name"];
    videoLink: MediaSource["videoLink"];
    ownerId: MediaSource["ownerId"];
    user: MediaSource["user"];
    tags: MediaSource["tags"];
    quality: MediaSource["quality"];
  };
}) {
  const { userData } = useUserData();
  const { roomData } = useRoomData();
  const rawSource = makeRawSource({
    source: source.videoLink,
    season: roomData.season,
    episode: roomData.episode,
  });

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        {/* Users Profile */}
        <div className="">
          {/* <StreamSourcesProfile users={uniqueSourceWithUsers.users} /> */}
          {source.name}
        </div>

        <div className="flex items-center">
          {source.ownerId === userData.id && (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="items-center justify-center overflow-hidden rounded-md "
            >
              {" "}
              <CircleEllipsis />
            </Button>
          )}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="items-center justify-center overflow-hidden rounded-sm"
          >
            <ArrowRightCircle />
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
    </div>
  );
}
