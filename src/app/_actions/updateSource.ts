"use server";
import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";

export async function updateSource(inputs: {
  sourceId: string;
  roomId: string;
  videoLink?: string;
  fileIdx?: number;
  infoHash?: string;
}) {
  const { sourceId, fileIdx, infoHash, videoLink, roomId } = inputs;

  return await api.source.update({
    id: sourceId,
    fileIdx: fileIdx,
    infoHash: infoHash,
    videoLink,
  });
}
