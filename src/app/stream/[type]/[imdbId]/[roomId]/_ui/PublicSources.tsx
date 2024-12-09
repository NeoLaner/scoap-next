"use client";

import { StreamsHeadingType } from "./StreamsHeadingType";
import { StreamSource } from "./StreamSource";
import { usePublicSources } from "~/app/_hooks/usePublicSources";

export function PublicSources() {
  const { publicSources } = usePublicSources();

  return (
    <>
      {publicSources?.length !== 0 && (
        <StreamsHeadingType heading="public sources" />
      )}

      <div className="space-y-2">
        {publicSources?.map((mediaSource) => (
          <StreamSource key={mediaSource.id} source={mediaSource} />
        ))}
      </div>
    </>
  );
}
