import { type ReactNode } from "react";
import MainLayout from "../_ui/MainLayout";

function Layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      <section className="relative flex h-full flex-1 items-center justify-center">
        <div className="fixed left-[72px] top-[72px] h-full p-20 ">
          <div className=" hidden flex-col gap-8 md:flex">
            <p>User profile</p>
            <p>About us</p>
            <p>Privacy & Policy</p>
            <p></p>
          </div>
        </div>
        {children}
        <div className="fixed bottom-0 right-2 text-sm text-solid-primary-1">
          v0.18beta
        </div>
      </section>
    </MainLayout>
  );
}

export default Layout;
