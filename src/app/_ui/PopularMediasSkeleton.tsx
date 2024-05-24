import ScrollAreaX from "./ScrollAreaX";

function PopularMediasSkeleton() {
  return (
    <section className="overflow-hidden">
      <div className="flex justify-between">
        <h2 className="h-6 w-32 rounded-xl bg-gray-4 text-xl font-semibold" />
      </div>
      <>
        <div className="flex min-w-0 shrink grow basis-0 gap-4 overflow-hidden py-6">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </>
    </section>
  );
}

function Card() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-gray-4">
      <div className="relative h-40 w-28 overflow-hidden rounded-lg md:h-52 md:w-36">
        <div style={{ objectFit: "cover", opacity: 0.9 }} />
      </div>
      <div className="bg-gray-4 text-center text-xs font-medium"></div>
    </div>
  );
}

export default PopularMediasSkeleton;
