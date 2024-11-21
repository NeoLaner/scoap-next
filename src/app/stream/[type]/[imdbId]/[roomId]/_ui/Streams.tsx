import StreamForm from "./StreamForm";
import { UsersSource } from "./UsersSource";
import { RoomSources } from "./RoomSources";
import { PublicSources } from "./PublicSources";
import StreamSources from "./StreamSources";

// http://127.0.0.1:11470/6ee1a751d67aae51dfd067b0a11e2f06d1098461/create
async function Streams({ roomId }: { roomId: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-background">
      <StreamForm />

      <StreamSources
        Users={<UsersSource />}
        Room={<RoomSources />}
        Public={<PublicSources />}
      />
    </div>
  );
}

export default Streams;
