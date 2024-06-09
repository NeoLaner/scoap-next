import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  // Get a room
  get: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.room.findFirst({
        where: { id: input.roomId },
        select: {
          id: true,
          ownerId: true,
          imdbId: true,
          videoLinks: true,
          instances: true, // This will include related instances
        },
      });
    }),

  // Create a room
  create: protectedProcedure
    .input(
      z.object({
        ownerId: z.string(),
        imdbId: z.string(),
        videoLinks: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.room.create({
          data: {
            ownerId: input.ownerId,
            imdbId: input.imdbId,
            videoLinks: input.videoLinks,
          },
        });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          throw new Error(
            "A room with this IMDb ID already exists for this user.",
          );
        }
        throw error;
      }
    }),
});
