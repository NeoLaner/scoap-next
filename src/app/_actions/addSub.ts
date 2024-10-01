"use server";
import { api } from "~/trpc/server";

export async function addSub(inputs: {
  roomId: string;
  subtitleSourceId: string;
}) {
  const { roomId, subtitleSourceId } = inputs;

  return await api.source.addSubMe({
    roomId,
    subtitleSourceId,
  });
}
