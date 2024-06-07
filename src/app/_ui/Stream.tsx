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
  stream,
}: {
  name: string;
  stream: GetStreamsFromTorrentIo[number];
}) {
  const router = useRouter();
  const { imdbId, type, roomId } = useParams<{
    imdbId: string;
    type: string;
    roomId: string;
  }>();
  const utils = api.useUtils();
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const { mutate: createTorrentStreams } = useCreateTorrentStream();
  const { dispatch } = usePlayerContext();
  const { data } = api.room.get.useQuery({ roomId });

  const { mutate: createRoom, isPending } = api.room.create.useMutation({
    onSuccess: (data) => {
      router.push(`/room/${type}/${imdbId}/${data.id}`);
    },
  });

  const { mutate: editRoom, isPending: isEditing } = api.room.edit.useMutation({
    onSuccess: async () => {
      await utils.room.get.invalidate({ roomId });
    },
  });

  function handleOnClick() {
    if (roomId && type === "movie") {
      createTorrentStreams({
        fileIdx: stream.fileIdx,
        infoHash: stream.infoHash,
      });

      editRoom({
        roomId,
        imdbId,
        roomName: name,
        fileIdx: stream.fileIdx,
        infoHash: stream.infoHash,
      });
    } else if (type === "series" && data?.season === season) {
      createTorrentStreams({
        fileIdx: stream.fileIdx,
        infoHash: stream.infoHash,
      });

      editRoom({
        roomId,
        season,
        episode,
        imdbId,
        roomName: name ?? data.roomName,
        fileIdx: stream.fileIdx,
        infoHash: stream.infoHash,
      });
    } else
      createRoom({
        season,
        episode,
        imdbId,
        roomName: name,
        fileIdx: stream.fileIdx,
        infoHash: stream.infoHash,
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
