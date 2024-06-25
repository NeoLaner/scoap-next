"use server";
import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";

export async function updateEpisode(inputs: {
  name: string;
  imdbId: string;
  ownerId: string;
  instanceId: string;
  type: string;
  season?: number | string | null;
  episode?: number | string | null;
  sourceId: string;
  fileIdx?: number;
  infoHash?: string;
}) {
  const { sourceId, fileIdx, infoHash, instanceId } = inputs;

  await api.source.update({
    id: sourceId,
    fileIdx: fileIdx,
    infoHash: infoHash,
  });
  revalidatePath(`/stream//[imdbId]/[roomId]/${instanceId}`, "layout");
}
