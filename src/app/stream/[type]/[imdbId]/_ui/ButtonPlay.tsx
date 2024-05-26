"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";

function ButtonPlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Link
      href={pathname + "?" + createQueryString("showStreams", "true")}
      className="rounded-md bg-app-color-gray-1"
    >
      <BsFillPlayCircleFill size={30} />
    </Link>
  );
}

export default ButtonPlay;
