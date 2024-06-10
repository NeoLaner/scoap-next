"use client";
// context/UserDataContext.tsx
import React, { createContext, type ReactNode } from "react";
import { type api } from "~/trpc/server";

type UserData = NonNullable<Awaited<ReturnType<typeof api.user.me>>>;

interface UserDataContextType {
  userData: UserData; // Define your userData type here
}

export const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined,
);

export const UserDataProvider = ({
  children,
  userData,
}: {
  children: ReactNode;
  userData: UserData;
}) => {
  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
};
