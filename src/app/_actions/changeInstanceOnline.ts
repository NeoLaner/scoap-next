"use server";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export async function changeInstanceOnline(
  room: Parameters<typeof api.room.updateMe>[0],
  online: boolean,
) {
  await api.room.updateMe({ ...room, online });
  revalidatePath(`/stream//[imdbId]/[roomId]/${room.id}`, "layout");
}
