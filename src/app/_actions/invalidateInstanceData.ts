"use server";

import { revalidatePath } from "next/cache";

export default async function invalidateInstanceData(instanceId: string) {
  console.log("🧁🧁", instanceId);

  revalidatePath(`/stream//[imdbId]/[roomId]/${instanceId}`, "layout");
}
