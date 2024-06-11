import BgLogoBox from "./_ui/BgLogoBox";
import BgMediaBox from "./_ui/BgMediaBox";
import StreamHeader from "./_ui/StreamHeader";
import StreamMenuFooter from "./_ui/StreamMenuFooter";

async function page() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <StreamHeader />

      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between gap-4 md:flex-row">
        <div className="h-full w-full">
          <div className="relative h-full w-full ">
            <BgMediaBox />
            <BgLogoBox />
          </div>
        </div>
      </div>

      <StreamMenuFooter />
    </section>
  );
}

export default page;
