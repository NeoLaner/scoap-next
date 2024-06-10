"use client";

import { useSearchParams } from "next/navigation";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import Episodes from "~/app/stream/[type]/[imdbId]/_ui/Episodes";

function EpisodesPanel() {
  const { metaData } = useMetaData();
  const searchParams = useSearchParams();
  const season = searchParams.get("season");

  return (
    <>
      {/* Episodes */}
      <div
        className={`${season ? "md:w-[420px]" : "md:w-[0]"} transition-all`}
      ></div>
      <Episodes
        videos={metaData.videos}
        className="absolute right-0 md:w-[420px]"
      />
    </>
  );
}

export default EpisodesPanel;
