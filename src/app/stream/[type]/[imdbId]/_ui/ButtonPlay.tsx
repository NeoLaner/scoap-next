"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BsFillPlayCircleFill } from "react-icons/bs";

function ButtonPlay() {
  const pathname = usePathname();
  const { imdbId, type } = useParams<{
    imdbId: string;
    type: "movie" | "series";
  }>();

  let streamPath;
  //for movies load streams
  streamPath = pathname + `?showStreams="true"`;

  //for series load episodes and seasons
  if (type === "series") streamPath = pathname + "?season=1";

  return (
    <Link href={streamPath} className="rounded-md bg-app-color-gray-1">
      <BsFillPlayCircleFill size={30} />
    </Link>
  );
}

export default ButtonPlay;
