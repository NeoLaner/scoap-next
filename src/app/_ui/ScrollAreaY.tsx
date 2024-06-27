"use client";
import React, { useEffect, useRef, type ReactNode } from "react";
import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";

const ScrollAreaY = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Get the first div within the parent container
      const firstDiv = ref.current.querySelector("div");

      if (firstDiv) {
        // Remove all styles
        firstDiv.style.cssText = "height: 100%;";
      }
    }
  }, []);
  return (
    <ScrollAreaRadix.Root className="shadow-blackA4 h-full w-full overflow-hidden rounded ">
      <ScrollAreaRadix.Viewport className="h-full w-full rounded" ref={ref}>
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        className={`${className} bg-blackA3 duration-[160ms] hover:bg-blackA5 flex  touch-none select-none p-0.5 transition-colors ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col md:data-[orientation=vertical]:w-2.5`}
        orientation="vertical"
      >
        <ScrollAreaRadix.Thumb className="relative flex-1 rounded-full bg-border " />
      </ScrollAreaRadix.Scrollbar>

      <ScrollAreaRadix.Corner className="bg-blackA5 " />
    </ScrollAreaRadix.Root>
  );
};

export default ScrollAreaY;
