import PopularMediasSkeleton from "../_ui/PopularMediasSkeleton";

function loading() {
  return (
    <div className="space-y-8">
      <PopularMediasSkeleton />
      <PopularMediasSkeleton />
    </div>
  );
}

export default loading;
