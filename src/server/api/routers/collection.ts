import { z } from "zod";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import {
  generateUniqueNames,
  preservedCollectionUniqueNames,
} from "~/lib/collections";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const collectionRouter = createTRPCRouter({
  // Get an room
  getCollectionByUniqueName: protectedProcedure
    .input(z.object({ uniqueName: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.collection.findFirst({
        where: { uniqueName: input.uniqueName },
      });
    }),

  getAllMyCollections: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.collection.findMany({
      where: { ownerId: ctx.session.user.id },
    });
  }),

  getAllUserCollection: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.collection.findMany({
        where: { ownerId: input.userId },
      });
    }),

  getMyCollection: protectedProcedure
    .input(
      z.object({
        uniqueName: z.string(),
        limit: z.number().min(1).max(40).nullish(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 40;
      // cursor is a reference to the last item in the previous batch
      // it's used to fetch the next batch
      const { cursor } = input;

      let rooms;
      const preservedUniqueName = input.uniqueName as Exclude<
        (typeof preservedCollectionUniqueNames)[number],
        "favorite"
      >;

      if (preservedCollectionUniqueNames.includes(preservedUniqueName))
        rooms = await ctx.db.room.findMany({
          where: { ownerId: ctx.session.user.id, status: preservedUniqueName },
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            updatedAt: "desc",
          },
        });
      else
        rooms = await ctx.db.room.findMany({
          where: { ownerId: ctx.session.user.id, status: "recent" },
          take: 40,
          orderBy: {
            updatedAt: "desc",
          },
        });

      const medias = await Promise.all(
        rooms.map(async (room) => {
          const meta =
            room.type === "movie"
              ? await StremioService.getMetaMovie(room.imdbId)
              : await StremioService.getMetaSeries(room.imdbId);
          return { ...meta, roomId: room.id };
        }),
      );

      let nextCursor: typeof cursor | undefined = undefined;
      if (rooms.length > limit) {
        const nextItem = medias.pop(); // return the last item from the array
        nextCursor = nextItem?.roomId;
      }
      return { medias, nextCursor };
    }),

  getWatchingCollection: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const rooms = await ctx.db.room.findMany({
        where: { ownerId: input.userId },
        take: 40,
        orderBy: {
          updatedAt: "desc",
        },
      });

      const medias = await Promise.all(
        rooms.map(async (room) => {
          return room.type === "movie"
            ? await StremioService.getMetaMovie(room.imdbId)
            : await StremioService.getMetaSeries(room.imdbId);
        }),
      );
      return medias;
    }),

  // madeMyCollection: protectedProcedure
  //   .input(z.object({ name: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const uniqueName = generateUniqueNames(input.name);

  //     return await ctx.db.collection.create({
  //       data: {
  //         name: input.name,
  //         uniqueName,
  //         visibility: "public",
  //         editable: preservedCollectionUniqueNames.includes(uniqueName),
  //         ownerId: ctx.session.user.id,
  //       },
  //     });
  //   }),
});
