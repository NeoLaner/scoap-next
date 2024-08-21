import { type api } from "~/trpc/server";

export type UniqueSource = NonNullable<
  Awaited<ReturnType<typeof api.room.getRoomSources>>
>["Sources"][number];

export type UniqueSourceWithUsers = UniqueSource;
