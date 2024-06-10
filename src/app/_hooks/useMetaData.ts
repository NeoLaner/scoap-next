import { useContext } from "react";
import { MetaDataContext } from "../_providers/MetaProvider";

export const useMetaData = () => {
  const context = useContext(MetaDataContext);
  if (context === undefined) {
    throw new Error("useMetaData must be used within a MetaDataProvider");
  }
  return context;
};
