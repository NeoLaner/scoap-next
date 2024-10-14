"use client";
// context/UserDataContext.tsx
import React, { createContext, type ReactNode } from "react";
import { type getServerAuthSession } from "~/server/auth";
import { type api } from "~/trpc/server";

type UserData = NonNullable<Awaited<ReturnType<typeof api.user.me>>>;
type UserSession = NonNullable<
  Awaited<ReturnType<typeof getServerAuthSession>>
>;
interface UserDataContextType {
  userData: UserSession["user"] | null | undefined; // Define your userData type here
}

export const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined,
);

export const UserDataProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: UserSession | null | undefined;
}) => {
  return (
    <UserDataContext.Provider value={{ userData: session?.user }}>
      {children}
    </UserDataContext.Provider>
  );
};
