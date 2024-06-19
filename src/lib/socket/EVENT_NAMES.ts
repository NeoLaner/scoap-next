import { type MediaEvents } from "@socket/@types";

export const EVENT_NAMES: Record<Capitalize<MediaEvents>, MediaEvents> = {
  UpdateUserMediaState: "updateUserMediaState",
  Seek: "seek",
  Play: "play",
  Pause: "pause",
  WaitingForData: "waitingForData",
  DataArrived: "dataArrived",
};
