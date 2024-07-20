"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMetaData } from "~/app/_hooks/useMetaData";

function BgLogo({ className = "" }: { className?: string }) {
  const searchParams = useSearchParams();
  const showStreams = searchParams.get("showStreams");
  const season = searchParams.get("season");
  const { metaData } = useMetaData();

  return (
    <>
      {metaData.logo && (
        <div
          className={`${showStreams ?? season ? "opacity-0" : "opacity-100"} flex h-full items-center justify-center transition-all transition-all`}
        >
          <Image
            src={metaData.logo}
            alt={metaData.name}
            width={800}
            height={310}
            className={`z-10 w-96 ${className}`}
            quality="100"
          />
        </div>
      )}
    </>
  );
}

export default BgLogo;
