"use client";

import { useParams, useSearchParams } from "next/navigation";

import {
  type GetStreamsFromTorrentIo,
  type Stream,
} from "~/lib/streams/getStreams";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { useSourceData } from "~/app/_hooks/useSourceData";
import { updateStream } from "~/app/_actions/updateStream";

function Stream({
  userId,
  stream,
}: {
  userId: string;
  stream: GetStreamsFromTorrentIo[number];
}) {
  const { imdbId, type, instanceId } = useParams<{
    imdbId: string;
    type: string;
    roomId: string;
    instanceId: string;
  }>();
  const { metaData } = useMetaData();
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const { sourceData } = useSourceData();

  async function handleOnClick() {
    await updateStream({
      imdbId,
      instanceId,
      name: metaData.name,
      ownerId: userId,
      sourceId: sourceData?.id,
      type,
      season,
      episode,
      fileIdx: stream.fileIdx,
      infoHash: stream.infoHash,
    });
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
