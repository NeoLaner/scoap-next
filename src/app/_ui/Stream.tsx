"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import {
  type GetStreamsFromTorrentIo,
  type Stream,
} from "~/lib/streams/getStreams";
import { api } from "~/trpc/react";
import { usePlayerContext } from "../_hooks/usePlayerProvider";
import { useCreateTorrentStream } from "../_hooks/useCreateTorrentStream";

function Stream({
  name,
  userId,
  stream,
}: {
  name: string;
  userId: string;
  stream: GetStreamsFromTorrentIo[number];
}) {
  const router = useRouter();
  const { imdbId, type, roomId, instanceId } = useParams<{
    imdbId: string;
    type: string;
    roomId: string;
    instanceId: string;
  }>();
  const utils = api.useUtils();
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const { mutate: createTorrentStreams } = useCreateTorrentStream();
  const { dispatch } = usePlayerContext();
  const { data: instanceData } = api.instance.get.useQuery({ instanceId });
  const { data: roomData } = api.room.get.useQuery({ instanceId });

  const { mutate: createInstance, isPending } = api.instance.create.useMutation(
    {
      onSuccess: (data) => {
        router.push(`/room/${type}/${imdbId}/${data.roomId}/${data.id}`);
      },
    },
  );

  const { mutate: updateInstance, isPending: isUpdating } =
    api.instance.update.useMutation({
      onSuccess: async () => {
        await utils.instance.get.invalidate({ instanceId });
      },
    });

  function handleOnClick() {
    if (instanceId) {
      createTorrentStreams({
        fileIdx: stream.fileIdx,
        infoHash: stream.infoHash,
      });

      // updateInstance({
      //   roomId,
      //   imdbId,
      //   roomName: name,
      //   fileIdx: stream.fileIdx,
      //   infoHash: stream.infoHash,
      // });
      //update source and instance
    } else
      createInstance({
        season: Number(season),
        episode: Number(episode),
        name: name,
        online: false,
        ownerId: userId,
        roomId,
      });
  }
  return (
    <button onClick={handleOnClick} disabled={isPending} title={stream.title}>
      <div className="mr-[0.6rem] flex gap-2 text-sm transition-all hover:bg-app-color-primary-2">
        <div className="w-full rounded-lg p-6">
          <div className="mb-3 flex w-full">
            <div className="flex items-center">
              <span className="">{stream.name}</span>
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <div className="flex items-center">
              <span>👤{stream.seeds}</span>
            </div>
            <div className=" flex items-center">
              <span>💾{stream.size}</span>
            </div>
            <div className="flex items-center">
              <span>⚙️{stream.server}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default Stream;
