import { type ReactNode } from "react";
import MainHeader from "./MainHeader";
import MainNav from "./MainNav";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full">
      <div className="h-full ">
        <MainHeader />
        <MainNav />
        <div className="h-full pb-[72px] pt-[72px] md:pb-0 md:pl-[72px] md:pt-[72px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
