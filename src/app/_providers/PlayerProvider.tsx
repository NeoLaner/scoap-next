"use client";

import React, {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

// Define your application's state
type PlayerState = {
  // Define your state properties here
  mediaSrc: {
    src: string;
    type: string;
  };
  // Add more as needed
};

// Define action types for the reducer
type PlayerAction = {
  type: "SET_MEDIA_SOURCE";
  payload: {
    mediaSrc: {
      src: string;
      type: string;
    };
  };
};

// Create the initial state for your application
const initialPlayerState: PlayerState = {
  mediaSrc: {
    src: "",
    type: "",
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
