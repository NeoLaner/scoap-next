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
          mediaSourceId: true,
          userId: true,
          MediaSource: true,
        },
      });
    }),

  // Create a source
  createMe: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        mediaSourceId: z.string(),
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
          mediaSourceId: input.mediaSourceId,
        },
      });
    }),

  // Update a source
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        mediaSourceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.source.update({
        where: { id: input.id },
        data: {
          mediaSourceId: input.mediaSourceId,
        },
      });
    }),
});
