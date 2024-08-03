import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  // Get an room
  get: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.room.findFirst({
        where: { id: input.roomId },
        select: {
          id: true,
          name: true,
          ownerId: true,
          online: true,
          timeWatched: true,
          season: true,
          episode: true,
          allowedGuestsId: true,
          bannedGuestsId: true,
          imdbId: true,
          isPublic: true,
          type: true,
          // Exclude password from the result
          password: false,
        },
      });
    }),

  // Create an room
  createMe: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        imdbId: z.string(),
        type: z.string(),
        online: z.boolean(),
        timeWatched: z.date().optional(),
        season: z.number().optional(),
        episode: z.number().optional(),
        guests: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //user can just make one room per imdbId

      const existingInstance = await ctx.db.room.findFirst({
        where: {
          imdbId: input.imdbId,
          ownerId: ctx.session.user.id,
        },
      });

      if (existingInstance) return existingInstance;

      return await ctx.db.room.create({
        data: {
          name: input.name,
          ownerId: ctx.session.user.id,
          online: input.online,
          timeWatched: input.timeWatched,
          season: input.season,
          episode: input.episode,
          allowedGuestsId: [],
          bannedGuestsId: [],
          imdbId: input.imdbId,
          type: input.type,
        },
      });
    }),

  // Update an room
  updateMe: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        roomId: z.string().optional(),
        online: z.boolean().optional(),
        timeWatched: z.date().optional().nullable(),
        season: z.number().optional().nullable(),
        episode: z.number().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.room.update({
        where: { id: input.id, ownerId: ctx.session.user.id },
        data: {
          name: input.name,
          ownerId: ctx.session.user.id,
          online: input.online,
          timeWatched: input.timeWatched,
          season: input.season,
          episode: input.episode,
        },
      });
    }),

  getRoomSources: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.room.findFirst({
        where: { id: input.roomId },
        select: {
          Sources: {
            select: {
              id: true,
              roomId: true,
              user: true,
              userId: true,
            },
          },
        },
      });
    }),

  joinRoom: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const room = await ctx.db.room.findUnique({
        where: { id: input.roomId },
        select: { allowedGuestsId: true },
      });

      if (!room) {
        throw new Error("Room not found");
      }
      return await ctx.db.room.update({
        where: { id: input.roomId },
        data: {
          allowedGuestsId: [...room.allowedGuestsId, input.userId],
        },
      });
    }),
});
