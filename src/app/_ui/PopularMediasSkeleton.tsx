import { Skeleton } from "../_components/ui/Skeleton";

function PopularMediasSkeleton() {
  return (
    <section className="overflow-hidden">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-32 rounded-xl" />
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
    <div className="flex flex-col items-center gap-4 rounded-xl">
      <Skeleton className="relative h-40 w-28 overflow-hidden rounded-lg md:h-52 md:w-36">
        <div style={{ objectFit: "cover", opacity: 0.9 }} />
      </Skeleton>
      <Skeleton className="h-4 w-16"></Skeleton>
    </div>
  );
}

export default PopularMediasSkeleton;
