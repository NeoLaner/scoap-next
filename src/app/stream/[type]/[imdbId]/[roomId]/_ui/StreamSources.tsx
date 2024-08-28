"use client";

import { ReactNode } from "react";

function StreamSources({
  Users,
  Room,
  Public,
}: {
  Users: ReactNode;
  Room: ReactNode;
  Public: ReactNode;
}) {
  return <div>{Users}</div>;
}

export default StreamSources;
