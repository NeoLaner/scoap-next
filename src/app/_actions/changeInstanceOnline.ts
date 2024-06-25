"use server";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export async function changeInstanceOnline(
  instance: Parameters<typeof api.instance.update>[0],
  online: boolean,
) {
  await api.instance.update({ ...instance, online });
  revalidatePath(`/stream//[imdbId]/[roomId]/${instance.id}`, "layout");
}
