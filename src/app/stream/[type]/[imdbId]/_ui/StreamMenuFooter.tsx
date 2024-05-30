"use client";
import { BsShare } from "react-icons/bs";
import ButtonPlay from "./ButtonPlay";
import { useSearchParams } from "next/navigation";
function StreamMenuFooter() {
  const searchParams = useSearchParams();
  const showStreams = searchParams.get("showStreams") === "true";

  return (
    <div
      className={`${showStreams ? "-bottom-16" : "bottom-10 "} absolute left-1/2 flex -translate-x-1/2 justify-center gap-3 overflow-hidden rounded-full border border-gray-10 bg-primary-2 p-2 px-4 transition-all`}
    >
      <button className="rounded-md ">
        <BsShare size={18} />
      </button>

      <ButtonPlay />
    </div>
  );
}

export default StreamMenuFooter;
