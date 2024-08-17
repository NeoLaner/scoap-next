import { type Video } from "~/app/_services/stremIo/types";

export const extractUniqueSeasons = (videos: Video[]) => {
  const seasons = new Set(videos.map((video) => video.season));
  return Array.from(seasons);
};
