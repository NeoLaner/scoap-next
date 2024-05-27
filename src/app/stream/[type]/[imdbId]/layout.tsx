import { type ReactNode } from "react";
import StreamHeader from "./_ui/StreamHeader";
import StreamMenuFooter from "./_ui/StreamMenuFooter";
import BgMedia from "./_ui/BgMedia";
import BgLogo from "./_ui/BgLogo";
import BgLogoBox from "./_ui/BgLogoBox";
import BgMediaBox from "./_ui/BgMediaBox";

async function layout({
  streams,
  children,
  params,
}: {
  params: { imdbId: string; type: string; streamImdbId: string };
  streams: ReactNode;
  children: ReactNode;
}) {
  const { imdbId, streamImdbId, type } = params;
  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="relative h-full w-full ">
        <BgMediaBox type={type} imdbId={imdbId} />
        <BgLogoBox type={type} imdbId={imdbId} />
      </div>

      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between gap-4 md:flex-row">
        <div />
        <div className="flex-1 overflow-y-auto md:flex-none">{streams}</div>
      </div>

      <StreamHeader />
      <StreamMenuFooter />
    </section>
  );
}

export default layout;
