import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";

async function ProtectedRoute({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();
  if (!session) return redirect("/api/auth/signin");
  return <>{children}</>;
}

export default ProtectedRoute;
