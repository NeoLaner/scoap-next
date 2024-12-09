"use client";

import { useState, type ReactNode } from "react";
import { Separator } from "~/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

type Filter = "all" | "users" | "room" | "public";

function StreamSources({
  // Users,
  Room,
  Public,
}: {
  // Users: ReactNode;
  Room: ReactNode;
  Public: ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  return (
    <>
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(value: Filter) => {
          setFilter((prvValue) => (value ? value : prvValue));
        }}
        className="mb-2 w-full justify-start"
      >
        <ToggleGroupItem value="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        {/* <ToggleGroupItem value="users" aria-label="Toggle users">
          Users
        </ToggleGroupItem> */}
        <ToggleGroupItem value="room" aria-label="Toggle room">
          Room
        </ToggleGroupItem>
        <ToggleGroupItem value="public" aria-label="Toggle public">
          Public
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="flex w-full flex-col gap-4">
        {/* {filter === "users" && (
          <StreamsByFilter heading="users sources">{Users}</StreamsByFilter>
        )} */}
        {(filter === "room" || filter === "all") && <>{Room}</>}
        {(filter === "public" || filter === "all") && <>{Public}</>}
      </div>
    </>
  );
}

export default StreamSources;
