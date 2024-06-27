import * as Avatar from "@radix-ui/react-avatar";
import { updateSource } from "~/app/_actions/updateSource";
import { Button } from "~/app/_components/ui/Button";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useSourceData } from "~/app/_hooks/useSourceData";
import { type api } from "~/trpc/server";

function StreamSources({
  roomSources,
}: {
  roomSources: Awaited<ReturnType<typeof api.room.getRoomSources>>;
}) {
  const { roomData } = useRoomData();
  const { sourceData } = useSourceData();

  // Map to keep track of unique video links and associated user images
  const uniqueSourcesMap = new Map<
    string,
    { videoLink: string; userImages: string[] }
  >();

  roomSources?.Sources.forEach((source) => {
    const videoLink = source.videoLink;
    if (!videoLink) return;

    if (uniqueSourcesMap.has(videoLink)) {
      // Append the user image to the existing entry
      uniqueSourcesMap.get(videoLink)!.userImages.push(source.user.image ?? "");
    } else {
      // Create a new entry for the unique video link
      uniqueSourcesMap.set(videoLink, {
        videoLink,
        userImages: [source.user.image ?? ""],
      });
    }
  });

  return (
    <>
      {Array.from(uniqueSourcesMap.values()).map(
        ({ videoLink, userImages }) => (
          <Button
            className="border-border-color-stronger-focus flex w-full flex-col gap-2 break-all rounded-md border p-2 text-center text-sm"
            key={videoLink}
            onClick={() =>
              updateSource({
                roomId: roomData.id,
                sourceId: sourceData.id,
                videoLink,
              })
            }
            disabled={sourceData.videoLink === videoLink}
          >
            <div className="flex justify-center gap-2">
              {userImages.map((image, index) => (
                <Avatar.Root key={index}>
                  <Avatar.Image src={image} className="w-8 rounded-full" />
                </Avatar.Root>
              ))}
            </div>
            <div className="text-solid-gray-2 text-sm">{videoLink}</div>
          </Button>
        ),
      )}
    </>
  );
}

export default StreamSources;
