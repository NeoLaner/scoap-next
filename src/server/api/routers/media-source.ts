import { z } from "zod";
import { TagEnum } from "~/lib/@types/Media";
import { checkIsDynamic, containsEpisode, containsSeason } from "~/lib/source";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const mediaSourceRouter = createTRPCRouter({
  // Get a source
  getAll: protectedProcedure
    .input(z.object({ imdbId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.mediaSource.findMany({
        where: { imdbId: input.imdbId },
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
      });
    }),
});
