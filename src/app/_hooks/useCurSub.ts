import { useContext } from "react";
import { CurrentSubtitleContext } from "../_providers/CurrentSubProvider";

export const useCurSub = () => {
  const context = useContext(CurrentSubtitleContext);
  if (context === undefined) {
    throw new Error("useCurSub must be used within a CurrentSubProvider");
  }
  return context;
};
