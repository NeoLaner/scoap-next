import { type ReactNode } from "react";

function MediasHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 text-xl font-semibold">{children}</h2>;
}

export default MediasHeading;
