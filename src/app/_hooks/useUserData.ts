import { useContext } from "react";
import { UserDataContext } from "../_providers/UserDataProvider";

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
