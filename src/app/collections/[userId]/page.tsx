import PopularMedias from "~/app/_ui/PopularMedias";
import { api } from "~/trpc/server";

async function page({
  params,
}: {
  params: { userId: string; collectionUniqueName: string };
}) {
  return (
    <div className="mt-8">
      <WatchingCollection userId={params.userId} />
    </div>
  );
}

async function WatchingCollection({ userId }: { userId: string }) {
  const popularMedias = await api.collection.getWatchingCollection({
    userId: userId,
  });

  return (
    <div>
      {popularMedias.length === 0 ? (
        <div></div>
      ) : (
        <PopularMedias heading="Watching recently" items={popularMedias} />
      )}
    </div>
  );
}

export default page;
