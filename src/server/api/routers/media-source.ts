import { z } from "zod";
import { QualityTypeEnum } from "~/lib/@types/Media";
import { checkIsDynamic, containsEpisode, containsSeason } from "~/lib/source";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const mediaSourceRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.mediaSource.findUnique({
        where: { id: input.id },
        include: { user: true },
      });
    }),
  // Get a source
  getAllPublicSources: protectedProcedure
    .input(z.object({ imdbId: z.string(), roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const roomData = await ctx.db.room.findUnique({
        where: { id: input.roomId },
      });
      if (!roomData) return;

      if (roomData.type === "series")
        return await ctx.db.mediaSource.findMany({
          where: {
            imdbId: input.imdbId,
            isPublic: true,
          },
          include: { user: true },
        });
      if (roomData.type === "movie")
        return await ctx.db.mediaSource.findMany({
          where: { imdbId: input.imdbId, isPublic: true },
          include: { user: true },
        });
    }),

  getAllRoomSources: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.mediaSource.findMany({
        where: { roomId: input.roomId },
        include: { user: true },
      });
    }),

  // Create a source
  create: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        imdbId: z.string(),
        url: z.string(),
        description: z.string().optional(),
        isPublic: z.boolean(),
        name: z.string().optional(),
        seasonBoundary: z.array(z.number()),
        season: z.number().optional(),
        episode: z.number().optional(),
        quality: z.string().optional(),
        dubbed: z.boolean().optional(),
        hardsub: z.boolean().optional(),
        qualityType: QualityTypeEnum.optional(),
        isHdr: z.boolean().optional(),
        countryEmoji: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      const existingSource = await ctx.db.mediaSource.findFirst({
        where: {
          roomId: input.roomId,
          url: input.url,
        },
        include: { user: true },
      });

      if (existingSource) return existingSource; //TODO: THROW ERROR

      const isContainsSeason = containsSeason(input.url);
      const isContainsEpisode = containsEpisode(input.url);
      const isDynamic = checkIsDynamic(input.url);
      if (isDynamic && !isContainsSeason) return; //TODO: THROW ERROR
      if (isDynamic && !isContainsEpisode) return; //TODO: THROW ERROR

      return await ctx.db.mediaSource.create({
        data: {
          roomId: input.roomId,
          ownerId: session.user.id,
          canBePublic: true,
          disabled: false,
          imdbId: input.imdbId,
          url: input.url,
          description: input.description,
          isPublic: input.isPublic,
          name: input.name,
          seasonBoundary: input.seasonBoundary,
          season: input.season,
          episode: input.episode,
          quality: input.quality,
          dubbed: input.dubbed,
          hardsub: input.hardsub,
          qualityType: input.qualityType,
          isHdr: input.isHdr,
          country: input.countryEmoji,
        },
        include: { user: true },
      });
    }),

  deleteMySource: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      await ctx.db.source.deleteMany({ where: { mediaSourceId: input.id } });
      await ctx.db.mediaSource.delete({
        where: {
          ownerId: session.user.id,
          id: input.id,
        },
      });

      return; //TODO: Error handling?!;
    }),
});
