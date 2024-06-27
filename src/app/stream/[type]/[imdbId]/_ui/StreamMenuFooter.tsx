"use client";
import { BsShare } from "react-icons/bs";
import ButtonPlay from "./ButtonPlay";
import { useSearchParams } from "next/navigation";
function StreamMenuFooter() {
  const searchParams = useSearchParams();
  const showStreams = searchParams.get("showStreams");
  const season = searchParams.get("season");

  return (
    <div
      className={`${showStreams ?? season ? "-bottom-16" : "bottom-10 "} border-gray-10 bg-primary-2 absolute left-1/2 flex -translate-x-1/2 justify-center gap-3 overflow-hidden rounded-full border p-2 px-4 transition-all`}
    >
      <Button className="rounded-md ">
        <BsShare size={18} />
      </Button>

      <ButtonPlay />
    </div>
  );
}

export default StreamMenuFooter;
