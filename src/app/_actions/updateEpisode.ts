"use server";
import { api } from "~/trpc/server";

export async function updateEpisode(inputs: {
  name: string;
  roomId: string;
  type: string;
  season: number | string | null;
  episode: number | string | null;
}) {
  const { name, season, episode, roomId, type } = inputs;
  "🍕🍕🍕", inputs;

  if (type !== "series") return; //TODO: Error;
  return await api.room.updateMe({
    id: roomId,
    name,
    episode: Number(episode),
    season: Number(season),
  });
}
