"use server";
import { api } from "~/trpc/server";
import { permanentRedirect } from "next/navigation";

export async function makeRoom(inputs: {
  name: string;
  imdbId: string;
  ownerId: string;
  type: string;
  season?: number;
  episode?: number;
}) {
  const { imdbId, ownerId, type, name } = inputs;
  const roomData = await api.room.create({ imdbId, ownerId, type });
  const instanceData = await api.instance.create({
    name,
    online: false,
    ownerId: ownerId,
    roomId: roomData.id,
    season: inputs.season,
    episode: inputs.episode,
  });
  await api.source.create({ instanceId: instanceData.id });
  permanentRedirect(
    `/stream/${roomData.type}/${roomData.imdbId}/${roomData.id}/${instanceData.id}`,
  );
}
