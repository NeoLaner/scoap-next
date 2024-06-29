import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstTwoLetters = (word: string): string => {
  if (word.length === 0) {
    return word; // Return the word itself if it's empty
  }

  // Capitalize the first letter
  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);

  // Return the first two letters
  return capitalizedWord.substring(0, 2);
};
