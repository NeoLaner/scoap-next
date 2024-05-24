import { type ReactNode } from "react";
import MainHeader from "~/app/_ui/MainHeader";
import MainNav from "../_ui/MainNav";
import ScrollAreaY from "../_ui/ScrollAreaY";

function Layout({ children }: { children: ReactNode }) {
  return (
    <ScrollAreaY className="!bottom-[72px] !top-[72px] md:!bottom-0">
      <div>
        <MainHeader />
        <MainNav />
        <section className="py-[72px] md:py-[72px] md:pl-[72px]">
          <div className="px-4 py-8 md:px-8">{children}</div>
        </section>
      </div>
    </ScrollAreaY>
  );
}

export default Layout;
