export const containsSeason = (source: string): boolean => {
  return source.includes("{season}");
};

export const containsEpisode = (source: string): boolean => {
  return source.includes("{episode}");
};

export const checkIsDynamic = function (source: string) {
  const isContainsSeason = containsSeason(source);
  const isContainsEpisode = containsEpisode(source);
  return isContainsSeason || isContainsEpisode;
};

export function makeRawSource({
  source,
  season,
  episode,
}: {
  source: string;
  season?: number;
  episode?: number;
}) {
  if (checkIsDynamic(source)) {
    return source
      .replaceAll("{season}", String(season))
      .replaceAll("{episode}", String(episode));
  } else return source;
}
