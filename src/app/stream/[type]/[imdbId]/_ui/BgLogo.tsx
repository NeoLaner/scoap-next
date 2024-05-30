"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function BgLogo({ logo, name }: { logo: string; name: string }) {
  const searchParams = useSearchParams();
  const showStreams = searchParams.get("showStreams");

  return (
    <>
      {logo && (
        <div
          className={`${showStreams ? "opacity-0" : "opacity-100"} flex h-full items-center justify-center transition-all transition-all`}
        >
          <Image
            src={logo}
            alt={name}
            width={800}
            height={310}
            className="z-10 w-96"
            quality="100"
          />
        </div>
      )}
    </>
  );
}

export default BgLogo;
