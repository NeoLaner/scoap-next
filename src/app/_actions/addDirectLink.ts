"use server";
import { checkIsDynamic } from "~/lib/source";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { type TagEnum, QualityTypeEnum } from "~/lib/@types/Media";
import { type z } from "zod";

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
  quality,
  dubbed,
  hardsub,
  qualityType,
  countryEmoji,
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
  quality?: string;
  dubbed?: boolean;
  hardsub?: boolean;
  qualityType?: z.infer<typeof QualityTypeEnum>;
  countryEmoji: string;
}) {
  const isDynamic = checkIsDynamic(sourceLink);
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  if (!sourceLink || !roomId || !userId) return;
  const source = await api.source.getMe({ roomId });
  const seasonBoundaryToNumbers = seasonBoundary?.map((str) => Number(str));

  const mediaSourceData = await api.mediaSource.create(
    isDynamic
      ? {
          url: sourceLink,
          seasonBoundary: seasonBoundaryToNumbers,
          roomId,
          isPublic,
          description,
          imdbId,
          name,
          quality,
          dubbed,
          hardsub,
          qualityType,
          countryEmoji,
        }
      : {
          url: sourceLink,
          seasonBoundary: [],
          roomId,
          isPublic,
          description,
          imdbId,
          name,
          season,
          episode,
          quality,
          dubbed,
          hardsub,
          qualityType,
          countryEmoji,
        },
  );
  if (!mediaSourceData) return; //TODO: ERROR
  let sourceData;
  if (source)
    sourceData = await api.source.updateMe({
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
