"use server";
import { api } from "~/trpc/server";
import { permanentRedirect } from "next/navigation";

export async function joinRoom(inputs: { userId: string; roomId: string }) {
  const roomData = await api.room.joinRoom({
    roomId: inputs.roomId,
    userId: inputs.userId,
  });
  permanentRedirect(
    `/stream/${roomData.type}/${roomData.imdbId}/${roomData.id}`,
  );
}
