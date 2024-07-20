import { type ReactNode } from "react";
import StreamHeader from "../stream/[type]/[imdbId]/_ui/StreamHeader";
import BgMediaBox from "../stream/[type]/[imdbId]/_ui/BgMediaBox";

function MinimalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full">
      <StreamHeader />

      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between gap-4 md:flex-row">
        <div className="h-full w-full">
          <div className="relative h-full w-full ">
            <BgMediaBox />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinimalLayout;
