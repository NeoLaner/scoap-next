"use client";
// context/SourceDataContext.tsx
import React, { createContext, useState, type ReactNode } from "react";

import { type api } from "~/trpc/server";

type CurrentSubtitle = Awaited<ReturnType<typeof api.subtitle.get>> | undefined;

interface CurrentMediaSrcContextType {
  currentSubtitle: CurrentSubtitle; // Define your CurrentMediaSrc type here
  setCurrentSubtitle: React.Dispatch<React.SetStateAction<CurrentSubtitle>>;
}

export const CurrentSubtitleContext = createContext<
  CurrentMediaSrcContextType | undefined
>(undefined);

export const CurSubProvider = ({
  children,
  initialSubtitle,
}: {
  children: ReactNode;
  initialSubtitle: CurrentSubtitle;
}) => {
  const [currentSubtitle, setCurrentSubtitle] = useState(initialSubtitle);

  return (
    <CurrentSubtitleContext.Provider
      value={{ currentSubtitle, setCurrentSubtitle }}
    >
      {children}
    </CurrentSubtitleContext.Provider>
  );
};
