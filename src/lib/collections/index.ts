export const preservedCollectionNames = [
  "watch later",
  "watching now",
  "watched",
  "favorite",
] as const;

export const generateUniqueNames = (name: string) =>
  name.toLowerCase().replaceAll(" ", "_");

export const preservedCollectionUniqueNames = preservedCollectionNames.map(
  (name) => generateUniqueNames(name),
);
