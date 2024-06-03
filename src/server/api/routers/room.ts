import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  // Get a room
  get: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.room.findFirst({
        where: { id: input.roomId },
        select: { source: true, imdbId: true }, // Correcting select to include isPrivate and isActive
      });
    }),

  // Create a room
  create: protectedProcedure
    .input(
      z.object({
        roomName: z.string().min(1).max(32),
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
      return ctx.db.room.create({
        data: {
          roomName: input.roomName,
          roomOwnerId: ctx.session.user.id,
          imdbId: input.imdbId,
          season: input.season,
          episode: input.episode,
          source: {
            create: {
              videoLink: input.videoLink,
              infoHash: input.infoHash,
              fileIdx: input.fileIdx,
              name: input.name,
            },
          },
        },
      });
    }),
});
