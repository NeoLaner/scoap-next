import { useContext } from "react";
import { UsersSubDataContext } from "../_providers/UsersSubsProvider";

export const useUsersSubData = () => {
  const context = useContext(UsersSubDataContext);
  if (context === undefined) {
    throw new Error("useSubData must be used within a SubDataProvider");
  }
  return context;
};
