import { type ReactNode } from "react";
import FilePlayer from "./_ui/PlayerLayout";

async function layout({
  params,
}: {
  params: { roomId: string; imdbId: string };
  children: ReactNode;
}) {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <FilePlayer params={params} />
    </section>
  );
}

export default layout;
