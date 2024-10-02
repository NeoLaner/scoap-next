"use server";
import { api } from "~/trpc/server";

export async function deleteMySub(id: string) {
  await api.subtitle.deleteMySub({ id });
}
