import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { UserDataProvider } from "../_providers/UserDataProvider";

async function ProtectedRoute({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();
  if (!session) return redirect("/api/auth/signin");
  const user = await api.user.me();
  //TODO:Better Error handling this must not happen at all.
  if (!user) return redirect("/api/auth/signin");
  return <UserDataProvider userData={user}>{children}</UserDataProvider>;
}

export default ProtectedRoute;
