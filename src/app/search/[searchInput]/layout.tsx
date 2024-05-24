import { type ReactNode } from "react";
import MainHeader from "~/app/_ui/MainHeader";
import MainNav from "~/app/_ui/MainNav";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MainHeader />
      <MainNav />
      <section className="py-[72px] md:py-[72px] md:pl-[72px]">
        <div className="px-4 py-8 md:px-8">{children}</div>
      </section>
    </div>
  );
}

export default Layout;
