import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const instanceRouter = createTRPCRouter({
  // Get an instance
  get: protectedProcedure
    .input(z.object({ instanceId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.instance.findFirst({
        where: { id: input.instanceId },
        select: {
          id: true,
          name: true,
          ownerId: true,
          roomId: true,
          online: true,
          timeWatched: true,
          season: true,
          episode: true,
          guests: true,
          // Exclude password from the result
          password: false,
        },
      });
    }),

  // Create an instance
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        ownerId: z.string(),
        roomId: z.string(),
        online: z.boolean(),
        timeWatched: z.date().optional(),
        season: z.number().optional(),
        episode: z.number().optional(),
        guests: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingInstance = await ctx.db.instance.findFirst({
        where: {
          roomId: input.roomId,
          ownerId: input.ownerId,
        },
      });

      if (existingInstance) return existingInstance;

      return await ctx.db.instance.create({
        data: {
          name: input.name,
          ownerId: input.ownerId,
          roomId: input.roomId,
          online: input.online,
          timeWatched: input.timeWatched,
          season: input.season,
          episode: input.episode,
          guests: input.guests ?? [],
        },
      });
    }),

  // Update an instance
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        ownerId: z.string().optional(),
        roomId: z.string().optional(),
        online: z.boolean().optional(),
        timeWatched: z.date().optional().nullable(),
        season: z.number().optional().nullable(),
        episode: z.number().optional().nullable(),
        guests: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.instance.update({
        where: { id: input.id, ownerId: ctx.session.user.id },
        data: {
          name: input.name,
          ownerId: input.ownerId,
          roomId: input.roomId,
          online: input.online,
          timeWatched: input.timeWatched,
          season: input.season,
          episode: input.episode,
          guests: input.guests,
        },
      });
    }),
});
