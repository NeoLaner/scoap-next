import { type ReactNode } from "react";
import MainHeader from "~/app/_ui/MainHeader";
import MainNav from "../_ui/MainNav";
import ScrollAreaY from "../_ui/ScrollAreaY";
import MainLayout from "../_ui/MainLayout";

function Layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      <section className="">
        <div className="px-4 py-8 md:px-8">{children}</div>
      </section>
    </MainLayout>
  );
}

export default Layout;
