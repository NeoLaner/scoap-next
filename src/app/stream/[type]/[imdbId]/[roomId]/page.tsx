import PlayerLayout from "./_ui/PlayerLayout";

async function page(props: { params: Promise<{ roomId: string }> }) {
  const params = await props.params;
  return (
    <section className="relative h-full w-full overflow-hidden">
      <PlayerLayout roomId={params.roomId} />
    </section>
  );
}

export default page;
