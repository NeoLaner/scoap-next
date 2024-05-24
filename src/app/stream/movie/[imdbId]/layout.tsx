import { type ReactNode } from "react";
import StreamHeader from "../../_ui/StreamHeader";
import Image from "next/image";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import StreamFooter from "../../_ui/StreamFooter";
import StreamMenuFooter from "../../_ui/StreamMenuFooter";

async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { imdbId: string };
}) {
  const imdbId = params.imdbId;
  const movieMeta = await StremioService.getMetaMovie(imdbId);

  if (!movieMeta) return <div>Not found</div>;

  return (
    <section className="relative h-full">
      {/* <StreamHeader /> */}
      {movieMeta.background && (
        <Image
          src={movieMeta.background}
          alt={movieMeta.name}
          fill
          className="h-full object-cover object-top opacity-70"
          quality="80"
        />
      )}
      {movieMeta.logo && (
        <div className="flex h-full items-center justify-center">
          <Image
            src={movieMeta.logo}
            alt={movieMeta.name}
            width={800}
            height={310}
            className="z-10 w-96"
            quality="100"
          />
        </div>
      )}
      <StreamHeader />
      {children}

      <StreamMenuFooter />
    </section>
  );
}

export default layout;
