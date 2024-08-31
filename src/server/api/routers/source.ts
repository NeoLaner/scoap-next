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
  updateMe: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        mediaSourceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.source.update({
        where: { id: input.id, userId: ctx.session.user.id },
        data: {
          mediaSourceId: input.mediaSourceId,
        },
        include: { MediaSource: true },
      });
    }),

  bestSrcForMe: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { roomId } = input;
      const userId = ctx.session.user.id;

      const roomData = await ctx.db.room.findUnique({
        where: { id: input.roomId },
      });
      if (!roomData) return;

      // Check the current src is ok or not
      const curSrc = await ctx.db.source.findUnique({
        where: { userId, roomId },
      });
      if (curSrc?.mediaSourceId) {
        const curMediaSrc = await ctx.db.mediaSource.findUnique({
          where: {
            id: curSrc.mediaSourceId,
            seasonBoundary: { has: roomData.season },
          },
        });

        if (curMediaSrc) return curSrc;
      }

      // if current src is not ok find best src in the public
      const pubMediaSrcs = await ctx.db.mediaSource.findMany({
        where: {
          imdbId: roomData.imdbId,
          isPublic: true,
          seasonBoundary: {
            has: roomData.season,
          },
        },
      });
      // if (pubMediaSrcs.length > 0) return await ctx.db.source;
    }),
});

function name() {}
