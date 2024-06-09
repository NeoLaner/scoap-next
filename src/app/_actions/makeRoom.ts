"use server";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export async function makeRoom(inputs: {
  imdbId: string;
  ownerId: string;
  type: string;
}) {
  const { imdbId, ownerId, type } = inputs;
  const roomData = await api.room.create({ imdbId, ownerId, type });
  const instanceData = await api.instance.create({
    name: "test",
    online: false,
    ownerId: ownerId,
    roomId: roomData.id,
  });
  redirect(`${roomData.imdbId}/${roomData.id}/${instanceData.id}`);
}
