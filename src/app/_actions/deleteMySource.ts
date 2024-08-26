"use server";

import { api } from "~/trpc/server";

export async function deleteMySource(id: string) {
  await api.mediaSource.deleteMySource({ id });
}
