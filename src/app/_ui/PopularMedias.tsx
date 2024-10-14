"use client";
import Image from "next/image";
import ScrollAreaX from "~/app/_ui/ScrollAreaX";
import Link from "next/link";
import { BsImage } from "react-icons/bs";
import { cn, truncateText } from "~/lib/utils";
import { useState } from "react";
import { useUserData } from "../_hooks/useUserData";

type Item = {
  id: string;
  imdb_id: string;
  poster: string | null;
  name: string;
  type: string;
};

function PopularMedias({
  heading,
  items,
  // collectionUniqueName,
}: {
  heading: string;
  items: Item[];
  // collectionUniqueName: string;
}) {
  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{heading}</h2>
        <CollectionLink collectionUniqueName={"recent"} />
      </div>
      <ScrollAreaX>
        <div className="flex min-w-0 shrink grow basis-0 select-none gap-4 py-6">
          {items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </ScrollAreaX>
    </section>
  );
}

export default PopularMedias;

export function CollectionLink({
  collectionUniqueName,
}: {
  collectionUniqueName: string;
}) {
  return (
    <Link href={`/collections/${"670b4a4dbca43552aa3f4af6"}/${"recent"}`}>
      Show all
    </Link>
  );
}

export function MediaCard({ item }: { item: Item }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link
      href={`/stream/${item.type}/${item.imdb_id}`}
      className="flex flex-col items-center gap-4 transition-all"
      title={item.name}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      draggable={false}
    >
      <div className="bg-gray-4 md:w-30 relative h-40 w-28 overflow-hidden rounded-lg md:h-44 lg:h-52 lg:w-36">
        {item.poster && (
          <Image
            src={item.poster}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", opacity: 0.8 }}
            className={cn(
              "pointer-events-none select-none transition-all",
              isHover && "scale-105",
            )}
          />
        )}

        {!item.poster && (
          <div
            className={cn(
              "text-primary-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            )}
          >
            <BsImage size={30} />
          </div>
        )}
      </div>
      <div className="max-h-8 max-w-32 overflow-hidden text-center text-xs font-medium">
        {truncateText(item.name, 28)}
      </div>
    </Link>
  );
}
