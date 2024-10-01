"use client";
// context/SubsDataContext.tsx
import React, { createContext, useState, type ReactNode } from "react";
import { type api } from "~/trpc/server";

type UsersSubData =
  | NonNullable<Awaited<ReturnType<typeof api.room.getUsersSubs>>>
  | undefined;

interface UsersSubDataContextType {
  usersSubData: UsersSubData; // Define your UsersSubData type here
  setUsersSubData: React.Dispatch<React.SetStateAction<UsersSubData>>;
}

export const UsersSubDataContext = createContext<
  UsersSubDataContextType | undefined
>(undefined);

export const UsersSubDataProvider = ({
  children,
  initialUsersSubData,
}: {
  children: ReactNode;
  initialUsersSubData: UsersSubData;
}) => {
  const [usersSubData, setUsersSubData] = useState(initialUsersSubData);
  return (
    <UsersSubDataContext.Provider value={{ usersSubData, setUsersSubData }}>
      {children}
    </UsersSubDataContext.Provider>
  );
};
