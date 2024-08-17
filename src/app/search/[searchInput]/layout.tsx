import { type ReactNode } from "react";
import MainLayout from "~/app/_ui/MainLayout";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";

function Layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      <ScrollAreaY className="h-full w-full">
        <section className="h-fit">
          <div className="px-4 py-8 md:px-8">{children}</div>
        </section>
      </ScrollAreaY>
    </MainLayout>
  );
}

export default Layout;
