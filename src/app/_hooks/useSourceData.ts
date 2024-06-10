import { useContext } from "react";
import { SourceDataContext } from "../_providers/SourceDataProvider";

export const useSourceData = () => {
  const context = useContext(SourceDataContext);
  if (context === undefined) {
    throw new Error("useSourceData must be used within a SourceDataProvider");
  }
  return context;
};
