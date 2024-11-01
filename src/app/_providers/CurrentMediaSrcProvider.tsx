"use client";
// context/SourceDataContext.tsx
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import eventEmitter from "~/lib/eventEmitter/eventEmitter";

import { type api } from "~/trpc/server";

type CurrentMediaSrc =
  | Awaited<ReturnType<typeof api.mediaSource.get>>
  | undefined;

interface CurrentMediaSrcContextType {
  currentMediaSrc: CurrentMediaSrc; // Define your CurrentMediaSrc type here
  setCurrentMediaSrc: React.Dispatch<React.SetStateAction<CurrentMediaSrc>>;
}

export const CurrentMediaSrcContext = createContext<
  CurrentMediaSrcContextType | undefined
>(undefined);

export const CurrentMediaSrcProvider = ({
  children,
  initialCurMediaSrc,
}: {
  children: ReactNode;
  initialCurMediaSrc: CurrentMediaSrc;
}) => {
  const [currentMediaSrc, setCurrentMediaSrc] = useState(initialCurMediaSrc);

  useEffect(function () {
    if (!currentMediaSrc?.url)
      setTimeout(() => {
        eventEmitter.emit("server:message", "NO_SOURCE");
      }, 900);
  }, []);

  return (
    <CurrentMediaSrcContext.Provider
      value={{ currentMediaSrc, setCurrentMediaSrc }}
    >
      {children}
    </CurrentMediaSrcContext.Provider>
  );
};
