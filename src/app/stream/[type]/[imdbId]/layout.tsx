import { type ReactNode } from "react";
import StreamHeader from "./_ui/StreamHeader";
import Image from "next/image";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import StreamFooter from "./_ui/StreamFooter";
import StreamMenuFooter from "./_ui/StreamMenuFooter";
import BgMedia from "./_ui/BgMedia";
import BgLogo from "./_ui/BgLogo";

async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { imdbId: string; type: string };
}) {
  const imdbId = params.imdbId;
  const type = params.type;

  return (
    <section className="relative h-full w-full">
      {/* <StreamHeader /> */}
      <StreamHeader />

      <BgMedia imdbId={imdbId} type={type} />
      <BgLogo imdbId={imdbId} type={type} />
      {children}
      <StreamMenuFooter />
    </section>
  );
}

export default layout;
