"use client";

import React, {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

import { type HLSSrc, type VideoSrc } from "@vidstack/react";
// Define your application's state
type PlayerState = {
  // Define your state properties here
  mediaSrc: HLSSrc | VideoSrc;
  // Add more as needed
};

// Define action types for the reducer
type PlayerAction =
  | {
      type: "SET_MEDIA_SOURCE";
      payload: {
        mediaSrc: HLSSrc | VideoSrc;
      };
    }
  | { type: "CLEAR_MEDIA_SOURCE" };

// Create the initial state for your application
const initialPlayerState: PlayerState = {
  mediaSrc: {
    src: "",
    type: "video/mp4",
  },
  // Initialize other state properties here
};

// Create the context
export const PlayerContext = createContext<
  | {
      state: PlayerState;
      dispatch: Dispatch<PlayerAction>;
    }
  | undefined
>(undefined);

// Create a reducer function
const playerReducer = (
  state: PlayerState,
  action: PlayerAction,
): PlayerState => {
  switch (action.type) {
    case "SET_MEDIA_SOURCE":
      return { ...state, mediaSrc: action.payload.mediaSrc };
    case "CLEAR_MEDIA_SOURCE":
      return { ...state, mediaSrc: { src: "", type: "application/mpegurl" } };
    default:
      return state;
  }
};

// Create an PlayerProvider component
export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, initialPlayerState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
