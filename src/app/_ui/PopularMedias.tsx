"use client";

import ScrollAreaX from "~/app/_ui/ScrollAreaX";
import Link from "next/link";
import { MediaCard } from "./MediaCard";
import MediasHeading from "./MediasHeading";

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
        <MediasHeading>{heading}</MediasHeading>
        <CollectionLink collectionUniqueName={"recent"} />
      </div>
      <ScrollAreaX>
        <div className="flex min-w-0 shrink grow basis-0 select-none gap-4 pb-6">
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
      Show All
    </Link>
  );
}
