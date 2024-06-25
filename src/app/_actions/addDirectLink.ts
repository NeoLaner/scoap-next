"use server";
import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function addDirectLink(formData: FormData, instanceId: string) {
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  const link = formData.get("link") as string;
  if (!link || !instanceId || !userId) return;
  const source = await api.source.get({ userId, instanceId });
  if (source) await api.source.update({ id: source?.id, videoLink: link });
  if (!source) await api.source.create({ instanceId, videoLink: link });

  revalidatePath(`/stream//[imdbId]/[roomId]/${instanceId}`, "layout");
}
