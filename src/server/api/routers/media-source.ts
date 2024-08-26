import { z } from "zod";
import { TagEnum } from "~/lib/@types/Media";
import { checkIsDynamic, containsEpisode, containsSeason } from "~/lib/source";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const mediaSourceRouter = createTRPCRouter({
  // Get a source
  getAllPublicSources: protectedProcedure
    .input(z.object({ imdbId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.mediaSource.findMany({
        where: { imdbId: input.imdbId, isPublic: true },
        select: {
          id: true,
          name: true,
          roomId: true,
          description: true,
          imdbId: true,
          isPublic: true,
          canBePublic: true,
          disabled: true,
          interactions: true,
          ownerId: true,
          seasonBoundary: true,
          usersLikesId: true,
          videoLink: true,
          quality: true,
          season: true,
          episode: true,
          sources: true,
          tags: true,
          user: true,
        },
      });
    }),

  getAllRoomSources: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.mediaSource.findMany({
        where: { roomId: input.roomId },
        select: {
          id: true,
          name: true,
          roomId: true,
          description: true,
          imdbId: true,
          isPublic: true,
          canBePublic: true,
          disabled: true,
          interactions: true,
          ownerId: true,
          seasonBoundary: true,
          usersLikesId: true,
          videoLink: true,
          quality: true,
          season: true,
          episode: true,
          sources: true,
          tags: true,
          user: true,
        },
      });
    }),

  // Create a source
  create: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        imdbId: z.string(),
        videoLink: z.string(),
        description: z.string().optional(),
        isPublic: z.boolean(),
        name: z.string().optional(),
        seasonBoundary: z.array(z.number()),
        season: z.number().optional(),
        episode: z.number().optional(),
        tags: z.array(TagEnum).optional(),
        quality: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      const existingSource = await ctx.db.mediaSource.findFirst({
        where: {
          roomId: input.roomId,
          videoLink: input.videoLink,
        },
      });

      if (existingSource) return existingSource; //TODO: THROW ERROR

      const isContainsSeason = containsSeason(input.videoLink);
      const isContainsEpisode = containsEpisode(input.videoLink);
      const isDynamic = checkIsDynamic(input.videoLink);
      if (isDynamic && !isContainsSeason) return; //TODO: THROW ERROR
      if (isDynamic && !isContainsEpisode) return; //TODO: THROW ERROR

      return await ctx.db.mediaSource.create({
        data: {
          roomId: input.roomId,
          ownerId: session.user.id,
          canBePublic: true,
          disabled: false,
          imdbId: input.imdbId,
          videoLink: input.videoLink,
          description: input.description,
          isPublic: input.isPublic,
          name: input.name,
          seasonBoundary: input.seasonBoundary,
          season: input.season,
          episode: input.episode,
          tags: input.tags,
          quality: input.quality,
        },
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
