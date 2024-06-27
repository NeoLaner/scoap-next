"use client";
import { BsShare } from "react-icons/bs";
import ButtonPlay from "./ButtonPlay";
import { useSearchParams } from "next/navigation";
import { Button } from "~/app/_components/ui/Button";
function StreamMenuFooter() {
  const searchParams = useSearchParams();
  const showStreams = searchParams.get("showStreams");
  const season = searchParams.get("season");

  return (
    <div
      className={`${showStreams ?? season ? "-bottom-16" : "bottom-10 "} border-gray-10 absolute right-9 flex flex-col  justify-center gap-1 overflow-hidden rounded-full border bg-background p-2 px-1 transition-all`}
    >
      <Button size={"icon"} className="rounded-full " variant={"ghost"}>
        <BsShare size={18} />
      </Button>

      <ButtonPlay />
    </div>
  );
}

export default StreamMenuFooter;
