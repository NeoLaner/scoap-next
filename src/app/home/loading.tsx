import PopularMediasSkeleton from "../_ui/PopularMediasSkeleton";

function loading() {
  return (
    <div className="space-y-8">
      <PopularMediasSkeleton size={20} />
      <PopularMediasSkeleton size={20} />
    </div>
  );
}

export default loading;
