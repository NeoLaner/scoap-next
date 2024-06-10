"use client";
// context/MetaDataContext.tsx
import React, { createContext, useContext, type ReactNode } from "react";
import { type MetaInfo } from "../_services/stremIo/types";

interface MetaDataContextType {
  metaData: MetaInfo; // Define your metaData type here
}

export const MetaDataContext = createContext<MetaDataContextType | undefined>(
  undefined,
);

export const MetaDataProvider = ({
  children,
  metaData,
}: {
  children: ReactNode;
  metaData: MetaInfo;
}) => {
  return (
    <MetaDataContext.Provider value={{ metaData }}>
      {children}
    </MetaDataContext.Provider>
  );
};
