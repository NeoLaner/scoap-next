"use server";
import { checkIsDynamic } from "~/lib/source";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function addSubtitle({
  url,
  roomId,
  seasonBoundary,
  imdbId,
  isPublic = false,
  description = "",
  name = "",
  season = 1,
  episode = 1,
  language,
  translator,
  crossorigin,
  mediaType,
}: {
  url: string;
  roomId: string;
  seasonBoundary: string[];
  imdbId: string;
  isPublic?: boolean;
  description?: string;
  name?: string;
  season?: number;
  episode?: number;
  translator?: string;
  language: string;
  crossorigin: boolean;
  mediaType: "series" | "movie";
}) {
  const isDynamic = checkIsDynamic(url);
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  if (!url || !roomId || !userId) return;
  const source = await api.source.getMe({ roomId });
  const seasonBoundaryToNumbers = seasonBoundary?.map((str) => Number(str));

  const subtitleData = await api.subtitle.create(
    isDynamic
      ? {
          crossorigin,
          imdbId,
          isPublic,
          language,
          roomId,
          seasonBoundary: seasonBoundaryToNumbers,
          url,
          name,
          description,
          translator,
          mediaType,
        }
      : {
          crossorigin,
          imdbId,
          isPublic,
          language,
          roomId,
          seasonBoundary: [],
          url,
          name,
          episode,
          season,
          description,
          translator,
          mediaType,
        },
  );
  if (!subtitleData) return; //TODO: ERROR
  let sourceData;
  if (source)
    sourceData = await api.source.addSubMe({
      roomId: roomId,
      subtitleSourceId: subtitleData.id,
    });

  if (!sourceData) return; //TODO: ERROR

  return { sourceData, subtitleData };
}
