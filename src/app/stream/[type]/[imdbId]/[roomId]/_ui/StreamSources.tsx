"use client";

import { useState, type ReactNode } from "react";
import { Separator } from "~/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

type Filter = "all" | "users" | "room" | "public";

function StreamSources({
  Users,
  Room,
  Public,
}: {
  Users: ReactNode;
  Room: ReactNode;
  Public: ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("users");
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
        <ToggleGroupItem value="users" aria-label="Toggle users">
          Users
        </ToggleGroupItem>
        <ToggleGroupItem value="room" aria-label="Toggle room">
          Room
        </ToggleGroupItem>
        <ToggleGroupItem value="public" aria-label="Toggle public">
          Public
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="flex w-full flex-col gap-4">
        {filter === "users" && (
          <StreamsByFilter heading="users sources">{Users}</StreamsByFilter>
        )}
        {(filter === "room" || filter === "all") && (
          <StreamsByFilter heading="room sources">{Room}</StreamsByFilter>
        )}
        {(filter === "public" || filter === "all") && (
          <StreamsByFilter heading="public sources">{Public}</StreamsByFilter>
        )}
      </div>
    </>
  );
}

function StreamsByFilter({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="relative w-full">
        <Separator />
        <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs uppercase">
          {heading}
        </p>
      </div>
      {children}
    </>
  );
}

export default StreamSources;
