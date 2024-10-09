"use client";
import { useRef, useState, type ReactNode } from "react";
import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";
import { cn } from "~/lib/utils";

const ScrollAreaX = ({ children }: { children: ReactNode }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 3; // Adjust the multiplier for faster/slower scroll
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  return (
    <ScrollAreaRadix.Root className="shadow-blackA4 h-full w-full  overflow-hidden rounded">
      <ScrollAreaRadix.Viewport
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={cn(
          "h-full w-full cursor-grab rounded",
          isDragging && "cursor-grabbing",
        )}
        ref={scrollRef}
      >
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
