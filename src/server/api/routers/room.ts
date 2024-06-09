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
        type: z.string(),
        videoLinks: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if a room with the same ownerId and imdbId already exists
      const existingRoom = await ctx.db.room.findFirst({
        where: {
          ownerId: input.ownerId,
          imdbId: input.imdbId,
        },
      });

      if (existingRoom) {
        // If the room exists, return it
        return existingRoom;
      }

      // If the room does not exist, create a new one
      try {
        return await ctx.db.room.create({
          data: {
            ownerId: input.ownerId,
            imdbId: input.imdbId,
            type: input.type,
            videoLinks: input.videoLinks ?? [],
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
