"use server";
import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";

export async function updateStream(inputs: {
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
  const { name, season, episode, sourceId, fileIdx, infoHash, instanceId } =
    inputs;
  const session = await getServerAuthSession();
  await api.instance.update({
    id: instanceId,
    episode: Number(episode),
    season: Number(season),
    name: name,
    ownerId: session?.user.id,
  });

  await api.source.update({
    id: sourceId,
    fileIdx: fileIdx,
    infoHash: infoHash,
  });

  revalidatePath(`/stream//[imdbId]/[roomId]/${instanceId}`, "layout");
}
