import { type ReactNode } from "react";
import StreamHeader from "./_ui/StreamHeader";
import StreamMenuFooter from "./_ui/StreamMenuFooter";
import BgMedia from "./_ui/BgMedia";
import BgLogo from "./_ui/BgLogo";

async function layout({
  streams,
  children,
  params,
}: {
  params: { imdbId: string; type: string };
  streams: ReactNode;
  children: ReactNode;
}) {
  const imdbId = params.imdbId;
  const type = params.type;

  return (
    <section className="relative h-full w-full">
      <div className="relative h-full w-full blur-sm">
        <BgMedia imdbId={imdbId} type={type} />
      </div>

      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center gap-4 md:flex-row">
        <div className="relative">
          <BgLogo imdbId={imdbId} type={type} />
        </div>
        {streams}
        {/* <div className="relative">{children}</div> */}
      </div>

      <StreamHeader />
      <StreamMenuFooter />
    </section>
  );
}

export default layout;
