"use server";
import { api } from "~/trpc/server";

export async function updateEpisode(inputs: {
  name: string;
  instanceId: string;
  type: string;
  season: number | string | null;
  episode: number | string | null;
}) {
  const { name, season, episode, instanceId, type } = inputs;
  console.log("🍕🍕🍕", inputs);

  if (type !== "series") return; //TODO: Error;
  await api.instance.update({
    id: instanceId,
    name,
    episode: Number(episode),
    season: Number(season),
  });
}
