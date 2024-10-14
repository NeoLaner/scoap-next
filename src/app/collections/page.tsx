import { api } from "~/trpc/server";
import PopularMedias from "../_ui/PopularMedias";
import StremioService from "../_services/stremIo/stremIoServices";

async function page() {
  const collections = await api.collection.getAllMyCollections();
  const watchingCollection = collections.filter(
    (collection) => (collection.name = "watching now"),
  );

  // const watchingCollectionMedia =
  return (
    <div>
      <RecentCollection />
    </div>
  );
}

async function RecentCollection() {
  const medias = await api.collection.getMyCollection({
    uniqueName: "recent",
  });

  return (
    <div>
      <PopularMedias heading="Continue watching" items={medias} />
    </div>
  );
}

export default page;
