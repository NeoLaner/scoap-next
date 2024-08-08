"use client";
import { updateSource } from "~/app/_actions/updateSource";
import { Button } from "~/app/_components/ui/Button";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useSourceData } from "~/app/_hooks/useSourceData";
import { useSourcesData } from "~/app/_hooks/useSourcesData";
import StreamSourcesProfile from "./StreamSourcesProfile";
import { useUserData } from "~/app/_hooks/useUserData";
import { mediaSocket } from "~/lib/socket/socket";

function StreamSources() {
  const { roomData } = useRoomData();
  const { sourceData, setSourceData } = useSourceData();
  const { sourcesData, setSourcesData } = useSourcesData();
  const { userData } = useUserData();
  // Map to keep track of unique video links and associated user images
  const uniqueSourcesMap = new Map<
    string,
    { videoLink: string; users: { name: string; image: string }[] }
  >();

  sourcesData?.forEach((source) => {
    const videoLink = source.videoLink;
    if (!videoLink) return;

    if (uniqueSourcesMap.has(videoLink)) {
      // Append the user image to the existing entry
      uniqueSourcesMap.get(videoLink)!.users.push({
        name: source.user.name ?? "",
        image: source.user.image ?? "",
      });
    } else {
      // Create a new entry for the unique video link
      uniqueSourcesMap.set(videoLink, {
        videoLink,
        users: [
          { name: source.user.name ?? "", image: source.user.image ?? "" },
        ],
      });
    }
  });

  async function handleSelectSource(videoLink: string) {
    const updatedSource = await updateSource({
      roomId: roomData.id,
      sourceId: sourceData.id,
      videoLink,
    });
    setSourceData(updatedSource);
    const updatedSourceWithUser = { ...updatedSource, user: userData };
    setSourcesData((prv) => {
      const updatedPrv = prv?.filter(
        (source) => source.user.id !== userData.id,
      );
      if (updatedPrv) return [...updatedPrv, updatedSourceWithUser];
      else updatedSourceWithUser;
    });

    mediaSocket.emit("sourceDataChanged", {
      payload: { user: userData, ...updatedSource },
    });
  }

  return (
    <>
      {Array.from(uniqueSourcesMap.values()).map(({ videoLink, users }) => (
        <div
          className="flex w-full flex-col gap-2 break-all rounded-md border p-2 text-center text-sm"
          key={videoLink}
        >
          <div className="flex w-full justify-between gap-2">
            <StreamSourcesProfile users={users} />
            <Button
              onClick={() => handleSelectSource(videoLink)}
              disabled={sourceData.videoLink === videoLink}
              size={"sm"}
              variant={"destructive"}
            >
              Select
            </Button>
          </div>
          <div className="text-solid-gray-2 text-sm">{videoLink}</div>
        </div>
      ))}

      {Array.from(uniqueSourcesMap.values()).length === 0 && (
        <div className="absolute top-1/2 w-full -translate-y-1/2 text-center text-foreground/80">
          Not any sources found.
        </div>
      )}
    </>
  );
}

export default StreamSources;
