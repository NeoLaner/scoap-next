import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const sourceRouter = createTRPCRouter({
  // Get a source
  get: protectedProcedure
    .input(z.object({ roomId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.source.findFirst({
        where: { roomId: input.roomId, userId: input.userId },
        select: {
          id: true,
          roomId: true,
          mediaLinkId: true,
          userId: true,
          videoLink: true,
          infoHash: true,
          fileIdx: true,
        },
      });
    }),

  // Create a source
  create: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        videoLink: z.string().optional(),
        infoHash: z.string().optional(),
        fileIdx: z.number().optional(),
        mediaLinkId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      const existingSource = await ctx.db.source.findFirst({
        where: {
          roomId: input.roomId,
          userId: session.user.id,
        },
      });

      if (existingSource) return existingSource;

      return await ctx.db.source.create({
        data: {
          roomId: input.roomId,
          userId: session.user.id,
          videoLink: input.videoLink,
          infoHash: input.infoHash,
          fileIdx: input.fileIdx,
          mediaLinkId: input.mediaLinkId,
        },
      });
    }),

  // Update a source
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        videoLink: z.string().optional(),
        infoHash: z.string().optional(),
        fileIdx: z.number().optional(),
        mediaLinkId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.source.update({
        where: { id: input.id },
        data: {
          videoLink: input.videoLink,
          infoHash: input.infoHash,
          fileIdx: input.fileIdx,
          mediaLinkId: input.mediaLinkId,
        },
      });
    }),
});
