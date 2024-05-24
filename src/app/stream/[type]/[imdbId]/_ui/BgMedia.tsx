import Image from "next/image";
import StremioService from "~/app/_services/stremIo/stremIoServices";

async function BgMedia({ imdbId, type }: { imdbId: string; type: string }) {
  let mediaData;
  if (type === "movie") mediaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") mediaData = await StremioService.getMetaSeries(imdbId);

  if (!mediaData) return <div>Not found</div>;

  return (
    <>
      {mediaData.background && (
        <Image
          src={mediaData.background}
          alt={mediaData.name}
          fill
          className="h-full object-cover object-top opacity-70"
          quality="80"
        />
      )}
    </>
  );
}

export default BgMedia;
