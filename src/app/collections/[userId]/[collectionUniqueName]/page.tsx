import PopularMedias from "~/app/_ui/PopularMedias";
import { api } from "~/trpc/server";

async function page({ params }: { params: { userId: string } }) {
  return (
    <div>
      <WatchingCollection userId={params.userId} />
    </div>
  );
}

async function WatchingCollection({ userId }: { userId: string }) {
  const medias = await api.collection.getWatchingCollection({ userId: userId });

  return <div>all</div>;
}

export default page;
