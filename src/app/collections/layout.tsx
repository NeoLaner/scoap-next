import { type ReactNode } from "react";
import MainLayout from "../_ui/MainLayout";
import ScrollAreaY from "../_ui/ScrollAreaY";
import { getServerAuthSession } from "~/server/auth";

async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <MainLayout>
      <ScrollAreaY className="h-full w-full">
        <section className="h-fit">
          {session?.user.id ? (
            <div className="px-4 py-8 md:px-8">{children}</div>
          ) : (
            <p>login to see this feature</p>
          )}
        </section>
      </ScrollAreaY>
    </MainLayout>
  );
}

export default Layout;
