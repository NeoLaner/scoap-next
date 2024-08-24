import { type api } from "~/trpc/server";

export type UniqueSource = NonNullable<
  Awaited<ReturnType<typeof api.mediaSource.getAllPublicSources>>
>;

export type UniqueSourceWithUsers = UniqueSource;
