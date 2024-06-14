"use client";
import { type UserWsDataServerToClient } from "@socket/@types";
import {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

// Define your application's state
type UsersSocketState = UserWsDataServerToClient;

// Define action types for the reducer
type UsersSocketAction = {
  type: "UPDATE";
  payload: UserWsDataServerToClient;
};

// Create the initial state for your application
const initialUsersSocketState = [] as UserWsDataServerToClient;
// Create the context
export const UsersSocketContext = createContext<
  | {
      state: UsersSocketState;
      dispatch: Dispatch<UsersSocketAction>;
    }
  | undefined
>(undefined);

const userReducer = (
  state: typeof initialUsersSocketState,
  action: UsersSocketAction,
): typeof initialUsersSocketState => {
  switch (action.type) {
    case "UPDATE":
      return [...action.payload];
    default:
      return state;
  }
};

// Create an UserProvider component
export default function UsersSocketProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(userReducer, initialUsersSocketState);

  return (
    <UsersSocketContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersSocketContext.Provider>
  );
}
