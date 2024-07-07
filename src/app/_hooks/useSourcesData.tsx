import { useContext } from "react";
import { SourcesDataContext } from "../_providers/SourcesDataProvider";

export const useSourcesData = () => {
  const context = useContext(SourcesDataContext);
  if (context === undefined) {
    throw new Error("useSourceData must be used within a SourceDataProvider");
  }
  return context;
};
