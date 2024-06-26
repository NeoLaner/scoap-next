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
  const { imdbId, type, name } = inputs;
  const roomData = await api.room.createMe({
    name,
    online: false,
    season: inputs.season,
    episode: inputs.episode,
    imdbId,
    type,
  });
  await api.source.createMe({ roomId: roomData.id });
  permanentRedirect(
    `/stream/${roomData.type}/${roomData.imdbId}/${roomData.id}`,
  );
}
