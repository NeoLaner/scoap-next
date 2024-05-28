"use client";

import { useParams, useRouter } from "next/navigation";

import {
  type GetStreamsFromTorrentIo,
  type Stream,
} from "~/lib/streams/getStreams";
import { api } from "~/trpc/react";

function Stream({ stream }: { stream: GetStreamsFromTorrentIo[number] }) {
  const router = useRouter();
  const { imdbId, type } = useParams<{ imdbId: string; type: string }>();
  const { mutate: roomMutate, isPending } = api.room.create.useMutation({
    onSuccess: (data) => {
      router.push(`/room/${type}/${imdbId}/${data.id}`);
    },
  });

  return (
    <button
      onClick={() => {
        roomMutate({
          imdbId: imdbId,
          roomName: "test",
          fileIdx: stream.fileIdx,
          infoHash: stream.infoHash,
        });
      }}
      disabled={isPending}
    >
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
