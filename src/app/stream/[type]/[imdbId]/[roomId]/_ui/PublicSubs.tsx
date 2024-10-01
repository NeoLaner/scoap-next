"use client";

import { Subtitle } from "./Subtitle";
import { usePublicSubs } from "~/app/_hooks/usePublicSubs";

export function PublicSubs() {
  const { publicSubs } = usePublicSubs();

  return (
    <div className="space-y-2">
      {publicSubs?.map((sub) => <Subtitle key={sub.id} source={sub} />)}
    </div>
  );
}
