"use server";
import { api } from "~/trpc/server";

export async function updateSource(inputs: {
  sourceId: string;
  mediaSourceId: string;
}) {
  const { sourceId, mediaSourceId } = inputs;

  return await api.source.updateMe({
    id: sourceId,
    mediaSourceId,
  });
}
