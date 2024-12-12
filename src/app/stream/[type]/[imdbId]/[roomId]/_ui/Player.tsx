"use client";
import PlayerMedia from "./PlayerMedia";
import PlayerTogetherAddon from "./PlayerTogetherAddon";
import { useRoomData } from "~/app/_hooks/useRoomData";

function Player() {
  const { roomData } = useRoomData();

  return (
    <>
      <PlayerMedia />
      {roomData.online && <PlayerTogetherAddon />}
    </>
  );
}

export default Player;
