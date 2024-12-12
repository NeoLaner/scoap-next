"use client";

import React, {
  createContext,
  type RefObject,
  useRef,
  type ReactNode,
} from "react";
import { type MediaPlayerInstance } from "@vidstack/react";

// Create the context
export const PlayerRefContext = createContext<
  | {
      playerRef: RefObject<MediaPlayerInstance | null>;
    }
  | undefined
>(undefined);

// Create an PlayerRefProvider component
export const PlayerRefProvider = ({ children }: { children: ReactNode }) => {
  const playerRef = useRef<MediaPlayerInstance>(null);

  return (
    <PlayerRefContext.Provider value={{ playerRef }}>
      {children}
    </PlayerRefContext.Provider>
  );
};
