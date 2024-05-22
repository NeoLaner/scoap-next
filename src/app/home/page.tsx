import { CreatePost } from "~/app/_ui/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import PopularMovies from "./_ui/popularMovies";
import PopularSeries from "./_ui/popularSeries";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div className="space-y-10 px-10 pt-20">
      <PopularMovies />
      <PopularSeries />
    </div>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
