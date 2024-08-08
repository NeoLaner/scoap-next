import PlayerLayout from "./_ui/PlayerLayout";

async function page({ params }: { params: { roomId: string } }) {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <PlayerLayout roomId={params.roomId} />
    </section>
  );
}

export default page;
