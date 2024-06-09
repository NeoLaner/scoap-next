import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  // Get a room
  get: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.room.findFirst({
        where: { id: input.roomId },
        select: {
          imdbId: true,
          id: true,
          ownerId: true,
        },
      });
    }),

  // Create a room
  create: protectedProcedure
    .input(
      z.object({
        imdbId: z.string(),
        season: z.string().optional().nullable(),
        episode: z.string().optional().nullable(),
        name: z.string().optional(),
        infoHash: z.string().optional(),
        fileIdx: z.number().optional(),
        videoLink: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.room.create({
        data: {
          ownerId: ctx.session.user.id,
          imdbId: input.imdbId,
        },
      });
    }),

  // Edit a room
  edit: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        roomName: z.string().min(1).max(32).optional(),
        imdbId: z.string().optional(),
        season: z.string().optional().nullable(),
        episode: z.string().optional().nullable(),
        name: z.string().optional(),
        infoHash: z.string().optional(),
        fileIdx: z.number().optional(),
        videoLink: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { roomId, ...updateData } = input;
      const updatedData = ctx.db.room.update({
        where: { id: roomId },
        data: {
          ownerId: ctx.session.user.id,
          imdbId: input.imdbId,
        },
      });
      const type = input.episode ? "series" : "movie";
      const path = `/room/${type}/${input.imdbId}/${roomId}`;

      revalidatePath(path, "layout");

      return updatedData;
    }),
});
