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
});
