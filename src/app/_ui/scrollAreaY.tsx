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
    <ScrollAreaRadix.Root className="h-full w-full overflow-hidden rounded shadow-blackA4 ">
      <ScrollAreaRadix.Viewport className="h-full w-full rounded" ref={ref}>
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        className={`${className} flex touch-none select-none bg-blackA3  p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col md:data-[orientation=vertical]:w-2.5`}
        orientation="vertical"
      >
        <ScrollAreaRadix.Thumb className="bg-gray-10 relative flex-1 rounded-[10px] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] " />
      </ScrollAreaRadix.Scrollbar>

      <ScrollAreaRadix.Corner className="bg-blackA5 " />
    </ScrollAreaRadix.Root>
  );
};

export default ScrollAreaY;
