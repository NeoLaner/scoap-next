import { type ReactNode } from "react";
import MainHeader from "~/app/_components/mainHeader";
import MainNav from "../_components/mainNav";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MainHeader />
      <MainNav />
      <section className="py-[72px] pb-72 md:pb-0 md:pl-[72px]">
        {children}
      </section>
    </div>
  );
}

export default Layout;
