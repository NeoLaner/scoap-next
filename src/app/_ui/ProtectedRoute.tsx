import { type ReactNode } from "react";
import { api } from "~/trpc/server";
import { UserDataProvider } from "../_providers/UserDataProvider";
import { getServerAuthSession } from "~/server/auth";

async function ProtectedRoute({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();
  //TODO:Better Error handling this must not happen at all.

  return <UserDataProvider session={session}>{children}</UserDataProvider>;
}

export default ProtectedRoute;
