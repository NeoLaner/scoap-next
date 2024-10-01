import { useContext } from "react";
import { PublicSubsContext } from "../_providers/PublicSubsProvider";

export const usePublicSubs = () => {
  const context = useContext(PublicSubsContext);
  if (context === undefined) {
    throw new Error("usePublicSubs must be used within a PublicSubsProvider");
  }
  return context;
};
