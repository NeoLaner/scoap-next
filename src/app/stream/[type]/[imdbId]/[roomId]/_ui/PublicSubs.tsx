"use client";

import { StreamsHeadingType } from "./StreamsHeadingType";
import { Subtitle } from "./Subtitle";
import { usePublicSubs } from "~/app/_hooks/usePublicSubs";

export function PublicSubs() {
  const { publicSubs } = usePublicSubs();

  return (
    <>
      {publicSubs?.length !== 0 && (
        <StreamsHeadingType heading="public subtitles" />
      )}
      <div className="space-y-2">
        {publicSubs?.map((sub) => <Subtitle key={sub.id} source={sub} />)}
      </div>
    </>
  );
}
