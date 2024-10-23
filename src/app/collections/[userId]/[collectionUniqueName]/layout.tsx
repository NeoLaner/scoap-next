import { type ReactNode } from "react";
import { ScrollArea } from "~/app/_components/ui/scroll-area";

function layout({ children }: { children: ReactNode }) {
  return (
    <ScrollArea type="always" className="h-full w-full">
      <div className="mt-8 h-fit">{children}</div>
    </ScrollArea>
  );
}

export default layout;
