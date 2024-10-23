import { type ReactNode } from "react";
import MainLayout from "../_ui/MainLayout";

import { getServerAuthSession } from "~/server/auth";

async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <MainLayout>
      <section className="h-full pl-8">
        {session?.user.id ? (
          <div className="h-full  py-1 ">{children}</div>
        ) : (
          <p>login to see this feature</p>
        )}
      </section>
    </MainLayout>
  );
}

export default Layout;
