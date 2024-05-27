"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BsFillPlayCircleFill } from "react-icons/bs";

function ButtonPlay() {
  const pathname = usePathname();
  const { imdbId } = useParams<{ imdbId: string }>();
  const streamPath = pathname + `/${imdbId}`;
  console.log(streamPath);

  return (
    <Link href={streamPath} className="rounded-md bg-app-color-gray-1">
      <BsFillPlayCircleFill size={30} />
    </Link>
  );
}

export default ButtonPlay;
