import { type ReactNode } from "react";
import MainHeader from "./MainHeader";
import MainNav from "./MainNav";
import ScrollAreaY from "./ScrollAreaY";
import AddonsHeader from "./AddonsHeader";

function AddonsLayout({ children }: { children: ReactNode }) {
  return (
    <ScrollAreaY className="!bottom-[72px] !top-[72px] md:!bottom-0">
      <div>
        <AddonsHeader />
        <MainNav />
        <div className="py-[72px] md:py-[72px] md:pl-[72px]">{children}</div>
      </div>
    </ScrollAreaY>
  );
}

export default AddonsLayout;
