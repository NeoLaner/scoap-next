"use client";
import { type ReactNode } from "react";
import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";

const ScrollAreaX = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollAreaRadix.Root className="shadow-blackA4 h-full w-full overflow-hidden rounded ">
      <ScrollAreaRadix.Viewport className="h-full w-full rounded">
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        className="bg-blackA3 duration-[160ms] hover:bg-blackA5 flex touch-none select-none p-0.5 transition-colors ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="horizontal"
      >
        <ScrollAreaRadix.Thumb className="relative flex-1 rounded-full bg-border" />
      </ScrollAreaRadix.Scrollbar>

      <ScrollAreaRadix.Corner className="bg-blackA5" />
    </ScrollAreaRadix.Root>
  );
};

export default ScrollAreaX;
