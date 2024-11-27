import { api } from "~/trpc/server";
import PopularMedias from "../_ui/PopularMedias";
import ScrollAreaY from "../_ui/ScrollAreaY";

async function page() {
  return (
    <ScrollAreaY className="h-full w-full">
      <div className="mr-2 mt-8 h-fit pr-2">
        <RecentCollection />
      </div>
    </ScrollAreaY>
  );
}

async function RecentCollection() {
  const medias = await api.collection.getMyCollection({
    uniqueName: "recent",
    limit: 20,
  });

  return <PopularMedias heading="Continue watching" items={medias.medias} />;
}

export default page;
