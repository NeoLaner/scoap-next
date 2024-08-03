"use server";
import { checkIsDynamic } from "~/lib/source";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function addDirectLink({
  sourceLink,
  roomId,
  seasonBoundary,
  isPublic,
  description,
  name,
  imdbId,
  season,
  episode,
}: {
  sourceLink: string;
  roomId: string;
  seasonBoundary: number[];
  isPublic: boolean;
  description?: string;
  name?: string;
  imdbId: string;
  season?: number;
  episode?: number;
}) {
  const isDynamic = checkIsDynamic(sourceLink);
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  if (!sourceLink || !roomId || !userId) return;
  const source = await api.source.get({ userId, roomId });

  let mediaSource;
  if (isDynamic) {
    mediaSource = {
      videoLink: sourceLink,
      seasonBoundary,
      roomId,
      isPublic,
      description,
      imdbId,
      name,
    };
  } else {
    mediaSource = {
      videoLink: sourceLink,
      seasonBoundary,
      roomId,
      isPublic,
      description,
      imdbId,
      name,
      season,
      episode,
    };
  }

  const mediaSourceData = await api.mediaSource.create(mediaSource);
  if (!mediaSourceData) return; //TODO: ERROR
  let sourceData;
  if (source)
    sourceData = await api.source.update({
      id: source?.id,
      mediaSourceId: mediaSourceData.id,
    });
  if (!source)
    sourceData = await api.source.createMe({
      roomId,
      mediaSourceId: mediaSourceData.id,
    });

  return { sourceData, mediaSourceData };
}
