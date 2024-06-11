"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMetaData } from "~/app/_hooks/useMetaData";

function BgMedia() {
  const searchParams = useSearchParams();
  const showStreams = searchParams.get("showStreams");
  const season = searchParams.get("season");
  const { metaData } = useMetaData();
  return (
    <div className="absolute h-full w-full">
      {metaData.background && (
        <Image
          src={metaData.background}
          alt={metaData.name}
          fill
          className={`h-full w-full object-cover object-top opacity-70 ${showStreams ?? season ? "blur-sm" : ""}`}
          quality="90"
        />
      )}
    </div>
  );
}

export default BgMedia;
