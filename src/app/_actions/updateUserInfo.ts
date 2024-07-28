"use server";
import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function updateUserInfo(formData: FormData) {
  const session = await getServerAuthSession();
  const name = formData.get("name") as string;
  const userId = formData.get("userId") as string;
  const id = session?.user.id;
  if (!name || !id) return;
  await api.user.updateMeInfo({ id, name, userId });
  revalidatePath("/");
}
