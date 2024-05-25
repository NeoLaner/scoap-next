import { type ReactNode } from "react";
import MainHeader from "./MainHeader";
import MainNav from "./MainNav";
import ScrollAreaY from "./ScrollAreaY";
import AddonsHeader from "./AddonsHeader";

function AddonsLayout({ children }: { children: ReactNode }) {
  return (
    <ScrollAreaY className="!bottom-[72px] !top-[72px] md:!bottom-0">
      <AddonsHeader />

      <MainNav />
      <div className="h-full w-full py-[72px] md:pb-[32px] md:pl-[72px] md:pt-[72px]">
        {children}
      </div>
    </ScrollAreaY>
  );
}

export default AddonsLayout;
