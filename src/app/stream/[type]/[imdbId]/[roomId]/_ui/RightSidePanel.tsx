import { ResizablePanel } from "~/components/ui/resizable";
import { type ReactNode } from "react";

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
      id="RightPanel"
      order={2}
    >
      <div className="h-full">{children}</div>
    </ResizablePanel>
  );
}

export default RightSidePanel;
