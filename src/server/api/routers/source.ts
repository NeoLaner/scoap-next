import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const sourceRouter = createTRPCRouter({
  // Get a source
  get: protectedProcedure
    .input(z.object({ sourceId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.source.findFirst({
        where: { id: input.sourceId },
        select: {
          id: true,
          instanceId: true,
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
        instanceId: z.string(),
        userId: z.string(),
        videoLink: z.string().optional(),
        infoHash: z.string().optional(),
        fileIdx: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.source.create({
        data: {
          instanceId: input.instanceId,
          userId: input.userId,
          videoLink: input.videoLink,
          infoHash: input.infoHash,
          fileIdx: input.fileIdx,
        },
      });
    }),
});
