import Image from "next/image";
import StremioService from "~/app/_services/stremIo/stremIoServices";

async function BgLogo({ imdbId, type }: { imdbId: string; type: string }) {
  let mediaData;
  if (type === "movie") mediaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") mediaData = await StremioService.getMetaSeries(imdbId);

  if (!mediaData) return <div>not found</div>;
  return (
    <>
      {mediaData.logo && (
        <div className="flex h-full items-center justify-center transition-all">
          <Image
            src={mediaData.logo}
            alt={mediaData.name}
            width={800}
            height={310}
            className="z-10 w-96"
            quality="100"
          />
        </div>
      )}
    </>
  );
}

export default BgLogo;
