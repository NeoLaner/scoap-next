import { type api } from "~/trpc/server";

export const containsSeason = (source: string): boolean => {
  return /\{0*S\}/i.test(source);
};
export const containsEpisode = (source: string): boolean => {
  return /\{0*E\}/i.test(source);
};

export const checkIsDynamic = (source: string): boolean => {
  return containsSeason(source) || containsEpisode(source);
};

const formatNumberWithLeadingZeros = (num: number, digits: number): string => {
  return num.toString().padStart(digits, "0");
};

export function makeRawSource({
  source,
  season,
  episode,
}: {
  source: string;
  season?: number | null;
  episode?: number | null;
}): string {
  let updatedSource = source;

  if (season !== null && season !== undefined) {
    // Replace all season placeholders (case-insensitive)
    updatedSource = updatedSource.replace(
      /\{(0*)S\}/gi,
      (_match: string, zeros: string) => {
        const length = zeros.length + 1; // Number of zeros + 1
        return formatNumberWithLeadingZeros(season, length);
      },
    );
  }

  if (episode !== null && episode !== undefined) {
    // Replace all episode placeholders (case-insensitive)
    updatedSource = updatedSource.replace(
      /\{(0*)E\}/gi,
      (_match: string, zeros: string) => {
        const length = zeros.length + 1; // Number of zeros + 1
        return formatNumberWithLeadingZeros(episode, length);
      },
    );
  }

  return updatedSource;
}

export function getUserIdToSourceData(
  usersSource: Awaited<ReturnType<typeof api.room.getUsersSource>>,
) {
  const UsersSourceId = {} as Record<string, string>;
  usersSource?.Sources.forEach((source) => {
    UsersSourceId[source.userId] = source.MediaSource.id;
  });

  //{ 6525134131232131 : 465364251341231,
  // 23525134131232131 : 1265364251341231 }
  return UsersSourceId;
}
