"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

function BgMedia({ background, name }: { background: string; name: string }) {
  const { streamImdbId } = useParams<{ streamImdbId: string }>();
  return (
    <div>
      {background && (
        <Image
          src={background}
          alt={name}
          fill
          className={`h-full object-cover object-top opacity-70 ${streamImdbId ? "blur-sm" : ""}`}
          quality="90"
        />
      )}
    </div>
  );
}

export default BgMedia;
