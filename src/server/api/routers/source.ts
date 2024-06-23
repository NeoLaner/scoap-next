import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const sourceRouter = createTRPCRouter({
  // Get a source
  get: protectedProcedure
    .input(z.object({ instanceId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.source.findFirst({
        where: { instanceId: input.instanceId, userId: input.userId },
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
        videoLink: z.string().optional(),
        infoHash: z.string().optional(),
        fileIdx: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      const existingSource = await ctx.db.source.findFirst({
        where: {
          instanceId: input.instanceId,
          userId: session.user.id,
        },
      });

      if (existingSource) return existingSource;

      return await ctx.db.source.create({
        data: {
          instanceId: input.instanceId,
          userId: session.user.id,
          videoLink: input.videoLink,
          infoHash: input.infoHash,
          fileIdx: input.fileIdx,
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.source.update({
        where: { id: input.id },
        data: {
          videoLink: input.videoLink,
          infoHash: input.infoHash,
          fileIdx: input.fileIdx,
        },
      });
    }),
});
