import * as Avatar from "@radix-ui/react-avatar";
import { useState } from "react";
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
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

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
          <div
            className="flex w-full flex-col gap-2 break-all rounded-md border p-2 text-center text-sm"
            key={videoLink}
          >
            <div className="flex justify-between gap-2">
              <div
                className="flex"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {userImages.map((image, index) => (
                  <Avatar.Root
                    key={index}
                    className={`${isHover ? "mr-0" : "-mr-4"} flex h-9 w-9 items-center justify-center rounded-full shadow-2xl transition-all`}
                  >
                    <Avatar.Image
                      src={image}
                      className="h-9 w-9 rounded-full border-2"
                    />
                  </Avatar.Root>
                ))}
              </div>
              <Button
                onClick={() =>
                  updateSource({
                    roomId: roomData.id,
                    sourceId: sourceData.id,
                    videoLink,
                  })
                }
                disabled={sourceData.videoLink === videoLink}
                size={"sm"}
                variant={"destructive"}
              >
                Select
              </Button>
            </div>
            <div className="text-solid-gray-2 text-sm">{videoLink}</div>
          </div>
        ),
      )}
    </>
  );
}

export default StreamSources;
