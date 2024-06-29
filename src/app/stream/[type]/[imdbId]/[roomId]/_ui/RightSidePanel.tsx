import { ResizablePanel } from "~/app/_components/ui/resizable";
import Episodes from "./Episodes";
import { ReactNode } from "react";

function RightSidePanel({
  defaultSize,
  children,
  className,
}: {
  defaultSize: number;
  children: ReactNode;
  className: string;
}) {
  return (
    <ResizablePanel
      className={className}
      defaultSize={defaultSize}
      minSize={defaultSize}
    >
      <div className="h-full">{children}</div>
    </ResizablePanel>
  );
}

export default RightSidePanel;
