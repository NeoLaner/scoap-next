"use client";
import { Time } from "@vidstack/react";

export function TimeGroup() {
  return (
    <div className="ml-1.5 flex items-center text-sm font-medium">
      <Time className="time" type="current" />
      <div className="text-white/80 mx-1">/</div>
      <Time className="time" type="duration" />
    </div>
  );
}
