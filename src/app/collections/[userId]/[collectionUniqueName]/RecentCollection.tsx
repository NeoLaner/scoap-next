"use client";

import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { MediaCard } from "~/app/_ui/MediaCard";
import MediasHeading from "~/app/_ui/MediasHeading";
import PopularMediasSkeleton from "~/app/_ui/PopularMediasSkeleton";
import { SkeletonCard } from "~/app/_ui/SkeletonCard";
import { api } from "~/trpc/react";

function RecentCollection() {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const [page, setPage] = useState(0);
  const { status, hasNextPage, data, fetchNextPage, isFetchingNextPage } =
    api.collection.getMyCollection.useInfiniteQuery(
      {
        uniqueName: "recent",
        limit: 30,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  useEffect(
    function () {
      const fn = async () => {
        if (entry?.isIntersecting && hasNextPage) await fetchNextPage();
      };
      //eslint-disable-next-line
      fn();
    },
    [entry, fetchNextPage, page, hasNextPage],
  );

  const content = data?.pages.map((page) =>
    page.medias.map((media, i) => {
      if (page.medias.length - 1 === i)
        return <MediaCard innerRef={ref} key={media.id} item={media} />;
      return <MediaCard key={media.id} item={media} />;
    }),
  )?.[0];

  return (
    <section className=" pr-4">
      <MediasHeading>Continue watching</MediasHeading>
      <div className="flex flex-wrap content-center items-center justify-center gap-3">
        {content}
        {((isFetchingNextPage && hasNextPage) || status === "pending") && (
          <SkeletonCard length={30} />
        )}
      </div>
    </section>
  );
}

export default RecentCollection;
