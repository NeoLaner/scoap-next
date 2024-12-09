"use client";

import { useRoomSubs } from "~/app/_hooks/useRoomSubs";
import { Subtitle } from "./Subtitle";
import { StreamsHeadingType } from "./StreamsHeadingType";

export function RoomSubs() {
  const { roomSubs } = useRoomSubs();

  return (
    <>
      {roomSubs?.length !== 0 && <StreamsHeadingType heading="Room sources" />}
      <div className="space-y-2">
        {roomSubs?.map((sub) => <Subtitle key={sub.id} source={sub} />)}
      </div>
    </>
  );
}
