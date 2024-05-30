"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function BgMedia({ background, name }: { background: string; name: string }) {
  const searchParams = useSearchParams();
  const showStreams = searchParams.get("showStreams") === "true";
  return (
    <div>
      {background && (
        <Image
          src={background}
          alt={name}
          fill
          className={`h-full object-cover object-top opacity-70 ${showStreams ? "blur-sm" : ""}`}
          quality="90"
        />
      )}
    </div>
  );
}

export default BgMedia;
