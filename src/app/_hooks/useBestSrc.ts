import { useQueries } from "@tanstack/react-query";
import { usePublicSources } from "./usePublicSources";
import { useRoomSources } from "./useRoomSources";
import {
  checkIsDynamic,
  createUrlFromPrats,
  makeRawSource,
} from "~/lib/source";
import { useRoomData } from "./useRoomData";
import { useSourceData } from "./useSourceData";
import { useCurMediaSrc } from "./useCurMediaSrc";
import { useEffect } from "react";

export function useBestSrc() {
  const { publicSources } = usePublicSources();
  const { roomSourcesData } = useRoomSources();
  const { roomData } = useRoomData();
  const { sourceData, setSourceData } = useSourceData();
  const { setCurrentMediaSrc } = useCurMediaSrc();

  const allSrc = [
    ...(publicSources ?? []),
    ...(roomSourcesData?.filter(
      (src) =>
        publicSources?.filter((pubSrc) => pubSrc.id === src.id).length === 0,
    ) ?? []),
  ];

  const results = useQueries({
    queries: allSrc.map((src) => {
      const url = createUrlFromPrats({
        protocol: src.protocol,
        domain: src.domain,
        pathname: src.pathname,
      });
      return {
        queryKey: [url],
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retryOnMount: false,
        queryFn: async () => {
          let source = url;
          if (checkIsDynamic(url))
            source = makeRawSource({
              source: url,
              season: roomData.season,
              episode: 1,
            });
          await fetch(source, { method: "HEAD" });
          return { ...src, url };
        },
      };
    }),
  });

  const allSrcWorked = allSrc.filter((src) => {
    return (
      results.filter((result) => {
        return !result.isError && result.data?.id === src.id;
      }).length > 0
    );
  });

  useEffect(
    function () {
      if (
        allSrcWorked.length > 0 &&
        sourceData?.mediaSourceId !== allSrcWorked[0]?.id
      ) {
        setSourceData((src) => {
          const source = {
            ...src,
            mediaSourceId: allSrcWorked[0]?.id ?? "",
            id: src?.id ?? "",
          };
          return source;
        });
        setCurrentMediaSrc(allSrcWorked[0]);
      }
    },
    [setCurrentMediaSrc, setSourceData, allSrcWorked, sourceData],
  );
}
