export const preservedCollectionNames = [
  "watch later",
  "recent",
  "watched",
  "favorite",
] as const;

export const generateUniqueNames = (name: string) =>
  name.toLowerCase().replaceAll(" ", "_");

export const preservedCollectionUniqueNames = [
  "watch_later",
  "recent",
  "watched",
  "favorite",
] as const;
