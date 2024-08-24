"use client";
// context/SourcesDataContext.tsx
import React, { createContext, useState, type ReactNode } from "react";
import { type api } from "~/trpc/server";

type UsersSourceData =
  | NonNullable<Awaited<ReturnType<typeof api.room.getUsersSource>>>["Sources"]
  | undefined;

interface UsersSourceDataContextType {
  usersSourceData: UsersSourceData; // Define your UsersSourceData type here
  setUsersSourceData: React.Dispatch<React.SetStateAction<UsersSourceData>>;
}

export const UsersSourceDataContext = createContext<
  UsersSourceDataContextType | undefined
>(undefined);

export const UsersSourceDataProvider = ({
  children,
  initialUsersSourceData,
}: {
  children: ReactNode;
  initialUsersSourceData: UsersSourceData;
}) => {
  const [usersSourceData, setUsersSourceData] = useState(
    initialUsersSourceData,
  );
  return (
    <UsersSourceDataContext.Provider
      value={{ usersSourceData, setUsersSourceData }}
    >
      {children}
    </UsersSourceDataContext.Provider>
  );
};
