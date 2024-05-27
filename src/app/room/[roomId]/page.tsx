import { type ReactNode } from "react";
import FilePlayer from "./_ui/FilePlayer";

async function layout({
  params,
}: {
  params: { roomId: string };
  children: ReactNode;
}) {
  const { roomId } = params;
  return (
    <section className="relative h-full w-full overflow-hidden">
      <FilePlayer />
    </section>
  );
}

export default layout;
