"use server";
import { api } from "~/trpc/server";
import { permanentRedirect } from "next/navigation";

export async function makeRoom(inputs: {
  name: string;
  imdbId: string;
  type: string;
  season?: number;
  episode?: number;
}) {
  const { imdbId, type, name } = inputs;

  const season =
    type === "series" ? (inputs.season ? inputs.season : 1) : undefined;
  const episode =
    type === "series" ? (inputs.episode ? inputs.episode : 1) : undefined;

  const roomData = await api.room.createMe({
    name,
    online: false,
    season,
    episode,
    imdbId,
    type,
    status: "recent",
  });

  permanentRedirect(
    `/stream/${roomData.type}/${roomData.imdbId}/${roomData.id}`,
  );
}
