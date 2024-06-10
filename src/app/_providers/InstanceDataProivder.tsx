"use client";
// context/InstanceDataContext.tsx
import React, { createContext, type ReactNode } from "react";
import { type api } from "~/trpc/server";

type InstanceData = Awaited<ReturnType<typeof api.instance.get>>;

interface InstanceDataContextType {
  instanceData: InstanceData; // Define your instanceData type here
}

export const InstanceDataContext = createContext<
  InstanceDataContextType | undefined
>(undefined);

export const InstanceDataProvider = ({
  children,
  instanceData,
}: {
  children: ReactNode;
  instanceData: InstanceData;
}) => {
  return (
    <InstanceDataContext.Provider value={{ instanceData }}>
      {children}
    </InstanceDataContext.Provider>
  );
};
