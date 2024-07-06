"use server";
import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function addDirectLink(formData: FormData, roomId: string) {
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  const link = formData.get("link") as string;
  if (!link || !roomId || !userId) return;
  const source = await api.source.get({ userId, roomId });
  if (source)
    return await api.source.update({ id: source?.id, videoLink: link });
  if (!source) return await api.source.createMe({ roomId, videoLink: link });
}
