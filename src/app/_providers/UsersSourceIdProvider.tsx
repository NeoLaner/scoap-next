"use client";
// context/SourceDataContext.tsx
import React, { createContext, useState, type ReactNode } from "react";

type UsersSourceId = Record<string, string>;

interface UsersSourceIdContextType {
  usersSourceId: UsersSourceId; // Define your UsersSourceId type here
  setUsersSourceId: React.Dispatch<React.SetStateAction<UsersSourceId>>;
}

export const UsersSourceIdContext = createContext<
  UsersSourceIdContextType | undefined
>(undefined);

export const UsersSourceIdProvider = ({
  children,
  initialUsersSourceId = {},
}: {
  children: ReactNode;
  initialUsersSourceId: UsersSourceId;
}) => {
  const [usersSourceId, setUsersSourceId] = useState(initialUsersSourceId);

  return (
    <UsersSourceIdContext.Provider value={{ usersSourceId, setUsersSourceId }}>
      {children}
    </UsersSourceIdContext.Provider>
  );
};
