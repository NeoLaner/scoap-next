"use server";

import { revalidatePath } from "next/cache";

export default async function invalidate() {
  revalidatePath("/stream/[type]/[imdbId]/[roomId]", "layout");
}
