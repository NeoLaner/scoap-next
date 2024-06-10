import BgLogoBox from "./_ui/BgLogoBox";
import BgMediaBox from "./_ui/BgMediaBox";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import StreamHeader from "./_ui/StreamHeader";
import StreamMenuFooter from "./_ui/StreamMenuFooter";

async function page({
  params,
}: {
  params: { imdbId: string; type: "movie" | "series" };
}) {
  const { type, imdbId } = params;
  let metaData;
  if (type === "movie") metaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") metaData = await StremioService.getMetaSeries(imdbId);

  if (!metaData) return <div>Not found</div>;

  return (
    <section className="relative h-full w-full overflow-hidden">
      <StreamHeader />

      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between gap-4 md:flex-row">
        <div className="h-full w-full">
          <div className="relative h-full w-full ">
            <BgMediaBox background={metaData.background} name={metaData.name} />
            <BgLogoBox logo={metaData.logo} name={metaData.name} />
          </div>
        </div>
      </div>

      <StreamMenuFooter />
    </section>
  );
}

export default page;
