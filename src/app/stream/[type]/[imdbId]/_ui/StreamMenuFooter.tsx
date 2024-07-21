"use client";
import ButtonPlay from "./ButtonPlay";
import * as Buttons from "../[roomId]/_ui/Buttons";
import { useSearchParams } from "next/navigation";
function StreamMenuFooter() {
  const searchParams = useSearchParams();
  const showStreams = searchParams.get("showStreams");
  const season = searchParams.get("season");

  return (
    <div
      className={`${showStreams ?? season ? "-bottom-16" : "bottom-10 "} border-gray-10 absolute right-3 flex flex-col justify-center  gap-1 overflow-hidden rounded-lg border bg-background p-2 px-1 transition-all md:right-7`}
    >
      <Buttons.Share />
      <ButtonPlay />
    </div>
  );
}

export default StreamMenuFooter;
