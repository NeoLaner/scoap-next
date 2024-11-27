import { type ReactNode } from "react";
import MainLayout from "../_ui/MainLayout";
import ScrollAreaY from "../_ui/ScrollAreaY";

function Layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      <ScrollAreaY className="h-full w-full">
        <section className="h-fit">
          <div className="h-full pl-4 pr-4 pt-8 md:pl-8">{children}</div>
        </section>
      </ScrollAreaY>
    </MainLayout>
  );
}

export default Layout;
