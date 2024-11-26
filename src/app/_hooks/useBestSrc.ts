import { useQueries, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

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
      const isDynamic = checkIsDynamic(url);
      return {
        queryKey: ["status", isDynamic ? "dynamic" : "static", url],
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

  useEffect(
    function () {
      const promise = async () =>
        await queryClient.invalidateQueries({
          queryKey: ["status", "dynamic"],
        });
      promise();
    },
    [roomData.season, queryClient],
  );

  const allSrcWorked = allSrc.filter((src) => {
    return (
      results.filter((result) => {
        return !result.isError && result.data?.id === src.id;
      }).length > 0
    );
  });

  //Sort allSrcWorked
  //Choose the first sources if get an error in player go to the next one
  const curSrcNumber = 0;
  const curSrc = allSrcWorked[curSrcNumber];

  useEffect(
    function () {
      if (curSrc && sourceData?.mediaSourceId !== curSrc?.id) {
        setSourceData((src) => {
          const source = {
            id: src?.id ?? "",
            mediaSourceId: curSrc?.id ?? "",
            subtitleSourceId: src?.subtitleSourceId ?? "",
            createdAt: src?.createdAt ?? curSrc.createdAt,
            updatedAt: src?.updatedAt ?? curSrc.updatedAt,
            userId: src?.userId ?? "",
            roomId: src?.roomId ?? "",
          };
          return source;
        });
        setCurrentMediaSrc(curSrc);
      }
    },
    [setCurrentMediaSrc, setSourceData, allSrcWorked, sourceData, curSrc],
  );
}
