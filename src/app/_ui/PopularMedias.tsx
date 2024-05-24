import Image from "next/image";
import ScrollAreaX from "~/app/_ui/ScrollAreaX";
import Link from "next/link";
import { BsImage } from "react-icons/bs";

function PopularMedias({
  heading,
  items,
}: {
  heading: string;
  items: {
    id: string;
    imdb_id: string;
    poster: string | null;
    name: string;
    type: string;
  }[];
}) {
  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{heading}</h2>
      </div>
      <ScrollAreaX>
        <div className="flex min-w-0 shrink grow basis-0 gap-4 overflow-x-auto py-6">
          {items.map((item) => (
            <Link
              href={`/stream/${item.type}/${item.imdb_id}`}
              key={item.id}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative h-40 w-28 overflow-hidden rounded-lg bg-gray-4 md:h-52 md:w-36">
                {item.poster && (
                  <Image
                    src={item.poster}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover", opacity: 0.9 }}
                  />
                )}

                {!item.poster && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-8">
                    <BsImage size={30} />
                  </div>
                )}
              </div>
              <div className="text-center text-xs font-medium">{item.name}</div>
            </Link>
          ))}
        </div>
      </ScrollAreaX>
    </section>
  );
}

export default PopularMedias;
