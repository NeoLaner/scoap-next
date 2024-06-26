"use client";
import { ChapterTitle } from "@vidstack/react";

export function Title() {
  return (
    <span className="text-white/70 inline-block flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-2 text-sm font-medium">
      <span className="mr-1">|</span>
      <ChapterTitle />
    </span>
  );
}
