"use client";

import { useEffect } from "react";
import { useCreateTorrentStream } from "~/app/_hooks/useCreateTorrentStream";
import { usePlayerContext } from "~/app/_hooks/usePlayerProvider";

import {
  type GetStreamsFromTorrentIo,
  type Stream,
} from "~/lib/streams/getStreams";

function Stream({ stream }: { stream: GetStreamsFromTorrentIo[number] }) {
  const { mutate, data, isPending } = useCreateTorrentStream();
  const { dispatch } = usePlayerContext();

  useEffect(
    function () {
      if (!data) return;
      dispatch({
        type: "SET_MEDIA_SOURCE",
        payload: { mediaSrc: { src: data, type: "video/mp4" } },
      });
    },
    [data, dispatch],
  );

  return (
    <button
      onClick={() =>
        mutate({ fileIdx: stream.fileIdx, infoHash: stream.infoHash })
      }
      disabled={isPending}
    >
      <div className="mr-[0.6rem] flex gap-2 text-sm transition-all hover:bg-app-color-gray-1">
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
