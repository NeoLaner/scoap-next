import StreamForm from "./StreamForm";
import { UsersSource } from "./UsersSource";
import { RoomSources } from "./RoomSources";
import { PublicSources } from "./PublicSources";
import StreamSources from "./StreamSources";
import SubtitleForm from "./SubtitleForm";

async function Subtitles() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-background">
      <SubtitleForm />

      <StreamSources
        Users={<UsersSource />}
        Room={<RoomSources />}
        Public={<PublicSources />}
      />
    </div>
  );
}

export default Subtitles;
