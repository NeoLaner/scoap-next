import { type ReactNode } from "react";
import StreamHeader from "./_ui/StreamHeader";
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
      {/* header */}
      <StreamHeader />
      {/* images bg and logo */}
      <BgMedia imdbId={imdbId} type={type} />
      <BgLogo imdbId={imdbId} type={type} />
      {/* main part */}
      {children}
      {/* footer menu */}
      <StreamMenuFooter />
    </section>
  );
}

export default layout;
