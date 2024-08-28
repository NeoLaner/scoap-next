"use server";
import { api } from "~/trpc/server";

export async function createSource(inputs: {
  roomId: string;
  mediaSourceId: string;
}) {
  const { roomId, mediaSourceId } = inputs;

  return await api.source.createMe({
    roomId,
    mediaSourceId,
  });
}
