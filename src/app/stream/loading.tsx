import Loader from "~/app/_ui/Loader";

function loading() {
  return (
    <div className="absolute left-1/2 top-1/2  h-full w-full -translate-x-1/2 -translate-y-1/2 bg-gray-1">
      <Loader />
    </div>
  );
}

export default loading;
