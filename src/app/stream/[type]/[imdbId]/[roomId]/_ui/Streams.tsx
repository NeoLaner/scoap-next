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
import { checkIsDynamic } from "~/lib/source";
import { useUserData } from "~/app/_hooks/useUserData";
import { UniqueSourceWithUsers } from "~/lib/@types/UniqueSource";
import { StreamSource } from "./StreamSource";

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
    <div className="space-y-2">
      {Array.from(uniqueSourceMap.values()).map((source) => (
        <StreamSource
          key={source.MediaSource.id}
          uniqueSourceWithUsers={source}
        />
      ))}
    </div>
  );
}

export default Streams;
