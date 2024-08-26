import StreamForm from "./StreamForm";
import { api } from "~/trpc/server";
import { type UniqueSourceWithUsers } from "~/lib/@types/UniqueSource";
import { StreamSource } from "./StreamSource";
import { UsersSource } from "./UsersSource";

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
      <div className="flex w-full flex-col gap-2">
        {/* <StreamSources /> */}

        <UsersSource roomId={roomId} />
      </div>
    </div>
  );
}

export default Streams;
