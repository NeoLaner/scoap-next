"use client";

import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import { MediaCard } from "~/app/_ui/MediaCard";
import { api } from "~/trpc/react";

function RecentCollection() {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const [page, setPage] = useState(0);
  const { isLoading, data, fetchNextPage } =
    api.collection.getMyCollection.useInfiniteQuery(
      {
        uniqueName: "recent",
        limit: 16,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  useEffect(
    function () {
      const fn = async () => {
        const handleFetchNextPage = async () => {
          await fetchNextPage();
          setPage((prev) => prev + 1);
        };

        const handleFetchPreviousPage = () => {
          setPage((prev) => prev - 1);
        };

        if (
          entry?.isIntersecting &&
          data?.pages[page]?.nextCursor &&
          !isLoading
        )
          await handleFetchNextPage();
      };
      //eslint-disable-next-line
      fn();
    },
    [data?.pages, entry?.isIntersecting, fetchNextPage, page],
  );

  let medias: MetaInfo[] = [];
  data?.pages.forEach((page) => {
    medias = [...medias, ...page.medias];
  });
  const lastItem = medias.pop();

  return (
    <div className="flex flex-wrap gap-3">
      {medias?.map((media) => <MediaCard key={media.id} item={media} />)}
      <div>
        {lastItem && (
          <div key={lastItem.id} ref={ref}>
            <MediaCard item={lastItem} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentCollection;
