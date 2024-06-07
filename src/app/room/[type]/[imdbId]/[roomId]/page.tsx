import { type ReactNode } from "react";
import FilePlayer from "./_ui/PlayerLayout";

async function Page({
  params,
  searchParams,
}: {
  params: { roomId: string; imdbId: string; type: "string" };
  searchParams: { season?: string; episode?: string };
  children: ReactNode;
}) {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <FilePlayer params={params} searchParams={searchParams} />
    </section>
  );
}

export default Page;
