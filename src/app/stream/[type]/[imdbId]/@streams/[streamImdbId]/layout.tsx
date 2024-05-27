import { ReactNode } from "react";
import ScrollAreaY from "~/app/_ui/ScrollAreaY";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`h-full w-full pt-[96px] `}>
      <div className="z-40 h-full">
        <ScrollAreaY>{children}</ScrollAreaY>
      </div>
    </div>
  );
}

export default Layout;
