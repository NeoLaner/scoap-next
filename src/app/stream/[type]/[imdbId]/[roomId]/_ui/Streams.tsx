import { Button } from "~/app/_components/ui/Button";
import StreamForm from "./StreamForm";
import StreamSources from "./StreamSources";
import { api } from "~/trpc/server";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Badge } from "~/app/_components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { getFirstTwoLetters } from "~/lib/utils";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
async function Streams({ roomId }: { roomId: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-background">
      <StreamForm />
      {/* {torrentIoStreamsSorted.map((stream) => (
        <TorrentStream key={stream.title} stream={stream} />
      ))} */}
      <div className="flex w-full flex-col gap-4">
        {/* <StreamSources /> */}
        <UsersSource roomId={roomId} />
      </div>
    </div>
  );
}

type UniqueSource = NonNullable<
  Awaited<ReturnType<typeof api.room.getRoomSources>>
>["Sources"][number];

type UniqueSourceWithUsers = UniqueSource & {
  users: UniqueSource["user"][];
};

export async function UsersSource({ roomId }: { roomId: string }) {
  const usersSource = await api.room.getRoomSources({ roomId });

  const uniqueSourceMap = new Map<string, UniqueSourceWithUsers>();

  usersSource?.Sources.forEach((source) => {
    if (uniqueSourceMap.has(source.MediaSource?.id)) {
      const uniqueSource = uniqueSourceMap.get(source.MediaSource?.id);
      uniqueSource?.users.push(uniqueSource.user);
    } else {
      const uniqueSource = { ...source, users: [source.user] };
      uniqueSourceMap.set(source.MediaSource?.id, uniqueSource);
    }
  });

  console.log(uniqueSourceMap);

  return (
    <div>
      {Array.from(uniqueSourceMap.values()).map((source) => (
        <StreamSource
          key={source.MediaSource.id}
          uniqueSourceWithUsers={source}
        />
      ))}
    </div>
  );
}

export async function StreamSource({
  uniqueSourceWithUsers,
}: {
  uniqueSourceWithUsers: UniqueSourceWithUsers;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-2 px-4">
      <div className="flex items-center justify-between">
        {/* Users Profile */}
        <div>Users Profile </div>

        <div className="flex items-center gap-1">
          <Button
            variant={"default"}
            size={"sm"}
            className="items-center justify-center overflow-hidden rounded-sm bg-green-500 hover:bg-green-600"
          >
            Select
          </Button>

          <Button
            variant={"ghost"}
            size={"icon"}
            className="items-center justify-center overflow-hidden rounded-md "
          >
            {" "}
            <BsThreeDotsVertical size={24} />
          </Button>
        </div>
      </div>
      <div>Description or link</div>
      <div className="flex items-center justify-between">
        <div>
          <Badge>Dynamic</Badge>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-sm">by:</div>
          <Avatar
            className={`flex h-8 w-8 items-center justify-center rounded-md border-2 shadow-2xl transition-all`}
          >
            <AvatarImage src={"user.image"} className="" />
            <AvatarFallback className="rounded-md">
              {getFirstTwoLetters("Yasin" ?? ":(")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default Streams;
