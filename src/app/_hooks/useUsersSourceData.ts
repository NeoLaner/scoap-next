import { useContext } from "react";
import { UsersSourceDataContext } from "../_providers/UsersSourceDataProvider";

export const useUsersSourceData = () => {
  const context = useContext(UsersSourceDataContext);
  if (context === undefined) {
    throw new Error("useSourceData must be used within a SourceDataProvider");
  }
  return context;
};
