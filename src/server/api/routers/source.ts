import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const sourceRouter = createTRPCRouter({
  // Get a source
  getMe: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const session = ctx.session;
      const source = await ctx.db.source.findFirst({
        where: { roomId: input.roomId, userId: session.user.id },
        include: {
          MediaSource: true,
        },
      });
      if (source) return source;
      // await ctx.db.source.create({
      //   data: { roomId: input.roomId, userId: session.user.id },
      // });
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
        include: { MediaSource: true },
      });

      if (existingSource) return existingSource;

      return await ctx.db.source.create({
        data: {
          roomId: input.roomId,
          userId: session.user.id,
          mediaSourceId: input.mediaSourceId,
        },
        include: { MediaSource: true },
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
        include: { MediaSource: true },
      });
    }),
});
