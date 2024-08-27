import StreamForm from "./StreamForm";
import { api } from "~/trpc/server";
import { type UniqueSourceWithUsers } from "~/lib/@types/UniqueSource";
import { StreamSource } from "./StreamSource";
import { UsersSource } from "./UsersSource";
import { RoomSources } from "./RoomSources";
import { PublicSources } from "./PublicSources";
import { Separator } from "~/app/_components/ui/separator";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
async function Streams({ roomId }: { roomId: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-background">
      <StreamForm />
      <div className="flex w-full gap-1">
        <div>users</div>
        <div>room</div>
      </div>

      {/* {torrentIoStreamsSorted.map((stream) => (
        <TorrentStream key={stream.title} stream={stream} />
      ))} */}
      <div className="flex w-full flex-col gap-4">
        {/* <StreamSources /> */}
        <div className="relative w-full">
          <Separator />
          <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs uppercase">
            users sources
          </p>
        </div>
        <UsersSource roomId={roomId} />
        <div className="relative w-full">
          <Separator />
          <p className=" absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs uppercase">
            room sources
          </p>
        </div>
        <RoomSources />

        <div className="relative w-full">
          <Separator />
          <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs uppercase">
            public sources
          </p>
        </div>
        <PublicSources />
      </div>
    </div>
  );
}

export default Streams;
