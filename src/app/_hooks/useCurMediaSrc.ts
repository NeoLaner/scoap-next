import { useContext } from "react";
import { CurrentMediaSrcContext } from "../_providers/CurrentMediaSrcProvider";

export const useCurMediaSrc = () => {
  const context = useContext(CurrentMediaSrcContext);
  if (context === undefined) {
    throw new Error(
      "useCurMediaSrc must be used within a CurrentMediaSrcProvider",
    );
  }
  return context;
};
