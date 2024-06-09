import BgLogoBox from "./_ui/BgLogoBox";
import BgMediaBox from "./_ui/BgMediaBox";
import StremioService from "~/app/_services/stremIo/stremIoServices";

async function page({
  params,
  searchParams,
}: {
  params: { imdbId: string; type: "movie" | "series" };
  searchParams?: { season?: string; episode?: string };
}) {
  const { type, imdbId } = params;
  let mediaData;
  if (type === "movie") mediaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") mediaData = await StremioService.getMetaSeries(imdbId);

  if (!mediaData) return <div>Not found</div>;

  return (
    <div className="h-full w-full">
      <div className="relative h-full w-full ">
        <BgMediaBox background={mediaData.background} name={mediaData.name} />
        <BgLogoBox logo={mediaData.logo} name={mediaData.name} />
      </div>
    </div>
  );
}

export default page;
