"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import {
  type GetStreamsFromTorrentIo,
  type Stream,
} from "~/lib/streams/getStreams";
import { api } from "~/trpc/react";
import { usePlayerContext } from "~/app/_hooks/usePlayerProvider";
import { useCreateTorrentStream } from "~/app/_hooks/useCreateTorrentStream";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { useSourceData } from "~/app/_hooks/useSourceData";
import invalidate from "~/app/_actions/invalidatePath";

function Stream({
  userId,
  stream,
}: {
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
  const { metaData } = useMetaData();
  const utils = api.useUtils();
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const { mutate: createTorrentStreams } = useCreateTorrentStream();
  const { dispatch } = usePlayerContext();
  const { data: instanceData } = api.instance.get.useQuery({ instanceId });
  const { data: roomData } = api.room.get.useQuery({ roomId });
  const { sourceData } = useSourceData();

  const { mutate: createInstance, isPending } = api.instance.create.useMutation(
    {
      onSuccess: (data) => {
        router.push(`/room/${type}/${imdbId}/${data.roomId}/${data.id}`);
      },
    },
  );

  const { mutate: updateInstance, isPending: isUpdating } =
    api.instance.update.useMutation();

  const { mutate: updateSource } = api.source.update.useMutation();

  function handleOnClick() {
    // createInstance({
    //   season: Number(season),
    //   episode: Number(episode),
    //   name: metaData.name,
    //   online: false,
    //   ownerId: userId,
    //   roomId,
    // });
    updateInstance({
      instanceId,
      episode: Number(episode),
      season: Number(season),
      name: metaData.name,
    });
    updateSource({
      id: sourceData?.id,
      fileIdx: stream.fileIdx,
      infoHash: stream.infoHash,
    });
    invalidate();
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
