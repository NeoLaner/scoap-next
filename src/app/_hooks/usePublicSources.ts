import { useContext } from "react";
import { PublicSourcesContext } from "../_providers/PublicSourcesProvider";

export const usePublicSources = () => {
  const context = useContext(PublicSourcesContext);
  if (context === undefined) {
    throw new Error(
      "usePublicSources must be used within a PublicSourcesProvider",
    );
  }
  return context;
};
