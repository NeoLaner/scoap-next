"use client";

import {
  type GetStreamsFromTorrentIo,
  type Stream,
} from "~/lib/streams/getStreams";

import { useCreateTorrentStream } from "~/app/_hooks/useCreateTorrentStream";

function Stream({ stream }: { stream: GetStreamsFromTorrentIo[number] }) {
  const { mutate } = useCreateTorrentStream();
  async function handleOnClick() {
    //
  }
  return (
    <button onClick={handleOnClick} title={stream.title}>
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
