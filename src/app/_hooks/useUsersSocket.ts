import { useContext } from "react";
import { UsersSocketContext } from "~/app/_providers/UsersSocketProvider";

// Create a custom hook for accessing the app context
export const useUsersSocketContext = () => {
  const context = useContext(UsersSocketContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return { state: context.state, dispatch: context.dispatch };
};
