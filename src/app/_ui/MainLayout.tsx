import { type ReactNode } from "react";
import MainHeader from "./MainHeader";
import MainNav from "./MainNav";
import ScrollAreaY from "./ScrollAreaY";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ScrollAreaY className="!bottom-[72px] !top-[72px] md:!bottom-0">
      {/* don't add h-full here */}
      <div className="flex h-fit max-h-fit min-h-full flex-col">
        <MainHeader />
        <MainNav />
        <div className="flex flex-1 flex-col pb-[72px] pt-[72px] md:pb-2 md:pl-[72px] md:pt-[72px]">
          {children}
        </div>
      </div>
    </ScrollAreaY>
  );
}

export default MainLayout;
