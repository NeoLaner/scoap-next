"use server";

import { api } from "~/trpc/server";

export async function updateSourcesDomain(
  srcIds: Array<string>,
  domain: string,
) {
  await api.user.updateSrcsDomain({ srcIds, domain });
}
