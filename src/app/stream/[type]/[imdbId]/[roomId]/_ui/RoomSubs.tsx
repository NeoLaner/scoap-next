"use client";

import { useRoomSubs } from "~/app/_hooks/useRoomSubs";
import { Subtitle } from "./Subtitle";

export function RoomSubs() {
  const { roomSubs } = useRoomSubs();

  return (
    <div className="space-y-2">
      {roomSubs?.map((sub) => <Subtitle key={sub.id} source={sub} />)}
    </div>
  );
}
