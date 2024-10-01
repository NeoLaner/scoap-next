import { useContext } from "react";
import { ChatDataContext } from "../_providers/ChatDataProvider";

export const useChatData = () => {
  const context = useContext(ChatDataContext);
  if (context === undefined) {
    throw new Error(
      "useChatData must be used within a ChatDataContextProvider",
    );
  }
  return context;
};
