"use server";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export async function makeRoom(inputs: {
  imdbId: string;
  ownerId: string;
  type: string;
}) {
  const { imdbId, ownerId, type } = inputs;
  const data = await api.room.create({ imdbId, ownerId, type });
  redirect(`/room/${type}/${data.imdbId}/${data.id}`);
}
