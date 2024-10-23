import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { cn, truncateText } from "~/lib/utils";
import { Ref, useState } from "react";
import Link from "next/link";

type Item = {
  id: string;
  imdb_id: string;
  poster: string | null;
  name: string;
  type: string;
};

export function MediaCard({
  item,
  innerRef,
}: {
  item: Item;
  innerRef?: Ref<HTMLAnchorElement>;
}) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link
      ref={innerRef}
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
      <div className="h-8 max-w-28 overflow-hidden text-center text-xs font-medium">
        {truncateText(item.name, 28)}
      </div>
    </Link>
  );
}
