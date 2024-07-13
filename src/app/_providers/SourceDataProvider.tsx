"use client";
// context/SourceDataContext.tsx
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type api } from "~/trpc/server";
import { useChatData } from "../_hooks/useChatData";

type SourceData = NonNullable<Awaited<ReturnType<typeof api.source.get>>>;

interface SourceDataContextType {
  sourceData: SourceData; // Define your SourceData type here
  setSourceData: React.Dispatch<React.SetStateAction<SourceData>>;
}

export const SourceDataContext = createContext<
  SourceDataContextType | undefined
>(undefined);

export const SourceDataProvider = ({
  children,
  initialSourceData,
}: {
  children: ReactNode;
  initialSourceData: SourceData;
}) => {
  const [sourceData, setSourceData] = useState(initialSourceData);
  const { pushMessage } = useChatData();
  console.log("sourceData.videoLink", sourceData.videoLink);

  useEffect(
    function () {
      if (!sourceData.videoLink)
        pushMessage({
          userName: "Scoap",
          created_at: Date.now(),
          textContent: "No source found",
          type: "suggestion",
        });
    },
    [pushMessage],
  );

  return (
    <SourceDataContext.Provider value={{ sourceData, setSourceData }}>
      {children}
    </SourceDataContext.Provider>
  );
};
