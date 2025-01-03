import { api } from "~/trpc/server";
import PopularMedias from "../_ui/PopularMedias";
import ScrollAreaY from "../_ui/ScrollAreaY";
import { Ghost } from "lucide-react";

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
  const popularMedias = await api.collection.getMyCollection({
    uniqueName: "recent",
    limit: 20,
  });

  return (
    <div>
      {popularMedias.medias.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground md:my-40">
          <Ghost className="h-60 w-60" />
          <div className="text-xl font-semibold uppercase">
            Collections are empty{" "}
          </div>
        </div>
      ) : (
        <PopularMedias
          heading="Watching recently"
          items={popularMedias.medias}
          collectionUniqueName="recent"
        />
      )}
    </div>
  );
}

export default page;
