"use server";
import { checkIsDynamic } from "~/lib/source";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { TagEnum } from "~/lib/@types/Media";
import { z } from "zod";

export async function addDirectLink({
  sourceLink,
  roomId,
  seasonBoundary,
  imdbId,
  isPublic = false,
  description = "",
  name = "",
  season = 1,
  episode = 1,
  tags,
  quality,
}: {
  sourceLink: string;
  roomId: string;
  seasonBoundary: string[];
  imdbId: string;
  isPublic?: boolean;
  description?: string;
  name?: string;
  season?: number;
  episode?: number;
  tags?: z.infer<typeof TagEnum>[];
  quality?: string;
}) {
  const isDynamic = checkIsDynamic(sourceLink);
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  if (!sourceLink || !roomId || !userId) return;
  const source = await api.source.getMe({ roomId });
  const seasonBoundaryToNumbers = seasonBoundary?.map((str) => Number(str));
  let mediaSource;
  if (isDynamic) {
    mediaSource = {
      videoLink: sourceLink,
      seasonBoundary: seasonBoundaryToNumbers,
      roomId,
      isPublic,
      description,
      imdbId,
      name,
      tags,
      quality,
    };
  } else {
    mediaSource = {
      videoLink: sourceLink,
      seasonBoundary: [],
      roomId,
      isPublic,
      description,
      imdbId,
      name,
      season,
      episode,
      tags,
      quality,
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
  if (!sourceData) return; //TODO: ERROR

  return { sourceData, mediaSourceData };
}
