import StreamSources from "./StreamSources";
import SubtitleForm from "./SubtitleForm";
import { UsersSubs } from "./UsersSubs";
import { RoomSubs } from "./RoomSubs";
import { PublicSubs } from "./PublicSubs";

async function Subtitles() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-background">
      <SubtitleForm />

      <StreamSources
        Users={<UsersSubs />}
        Room={<RoomSubs />}
        Public={<PublicSubs />}
      />
    </div>
  );
}

export default Subtitles;
