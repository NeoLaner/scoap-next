import PlayerLayout from "./_ui/PlayerLayout";

async function page({
  params,
  searchParams,
}: {
  params: { roomId: string; imdbId: string; type: string; instanceId: string };
  searchParams: { season?: string; episode?: string };
}) {
  console.log("💣💣💣", params, searchParams, "💣💣💣");

  return (
    <section className="relative h-full w-full overflow-hidden">
      <PlayerLayout params={params} searchParams={searchParams} />
    </section>
  );
}

export default page;
