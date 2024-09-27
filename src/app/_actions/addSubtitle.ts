"use server";
import { checkIsDynamic } from "~/lib/source";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function addSubtitle({
  subUrl,
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
}: {
  subUrl: string;
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
}) {
  const isDynamic = checkIsDynamic(subUrl);
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  if (!subUrl || !roomId || !userId) return;
  const source = await api.source.getMe({ roomId });
  const seasonBoundaryToNumbers = seasonBoundary?.map((str) => Number(str));

  const subtitleData = await api.subtitle.create(
    isDynamic
      ? {
          crossorigin: true,
          imdbId,
          isPublic,
          language,
          roomId,
          seasonBoundary: seasonBoundaryToNumbers,
          subUrl,
          name,
          description,
          translator,
        }
      : {
          crossorigin: true,
          imdbId,
          isPublic,
          language,
          roomId,
          seasonBoundary: [],
          subUrl,
          name,
          episode,
          season,
          description,
          translator,
        },
  );
  if (!subtitleData) return; //TODO: ERROR
  let sourceData;
  if (source)
    sourceData = await api.source.updateSubMe({
      id: source.id,
      subtitleSourceId: subtitleData.id,
    });

  if (!sourceData) return; //TODO: ERROR

  return { sourceData, subtitleData };
}
