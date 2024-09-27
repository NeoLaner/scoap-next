import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import fetch from "node-fetch";
import { checkIsDynamic, containsEpisode, containsSeason } from "~/lib/source";

const allowedDomains = ["dl10.dl1acemovies.xyz"];

function isValidDomain(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return allowedDomains.includes(hostname);
  } catch {
    return false;
  }
}

function isValidUrl(input: string): boolean {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}

export const subtitleRouter = createTRPCRouter({
  getSubtitle: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
      }),
    )
    .query(async ({ input }) => {
      const { url } = input;

      if (!isValidUrl(url)) {
        throw new Error("Invalid or unauthorized URL");
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch subtitle");
        }

        const subtitleData = await response.text();
        return {
          subtitle: subtitleData,
        };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.subtitleSource.findUnique({
        where: { id: input.id },
        include: { user: true },
      });
    }),
  // Get a source
  getAllPublicSubs: protectedProcedure
    .input(z.object({ imdbId: z.string(), roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const roomData = await ctx.db.room.findUnique({
        where: { id: input.roomId },
      });
      if (!roomData) return;

      if (roomData.type === "series")
        return await ctx.db.subtitleSource.findMany({
          where: {
            imdbId: input.imdbId,
            isPublic: true,
          },
          include: { user: true },
        });
      if (roomData.type === "movie")
        return await ctx.db.subtitleSource.findMany({
          where: { imdbId: input.imdbId, isPublic: true },
          include: { user: true },
        });
    }),

  getAllRoomSubs: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.subtitleSource.findMany({
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
        subUrl: z.string(),
        description: z.string().optional(),
        isPublic: z.boolean(),
        name: z.string().optional(),
        seasonBoundary: z.array(z.number()),
        season: z.number().optional(),
        episode: z.number().optional(),
        crossorigin: z.boolean(),
        language: z.string(),
        translator: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      const existingSource = await ctx.db.subtitleSource.findFirst({
        where: {
          roomId: input.roomId,
          subUrl: input.subUrl,
        },
        include: { user: true },
      });

      if (existingSource) return existingSource; //TODO: THROW ERROR

      const isContainsSeason = containsSeason(input.subUrl);
      const isContainsEpisode = containsEpisode(input.subUrl);
      const isDynamic = checkIsDynamic(input.subUrl);
      if (isDynamic && !isContainsSeason) return; //TODO: THROW ERROR
      if (isDynamic && !isContainsEpisode) return; //TODO: THROW ERROR

      return await ctx.db.subtitleSource.create({
        data: {
          roomId: input.roomId,
          ownerId: session.user.id,
          canBePublic: true,
          disabled: false,
          imdbId: input.imdbId,
          subUrl: input.subUrl,
          description: input.description,
          isPublic: input.isPublic,
          name: input.name,
          seasonBoundary: input.seasonBoundary,
          season: input.season,
          episode: input.episode,
          crossorigin: input.crossorigin,
          language: input.language,
          translator: input.translator,
        },
        include: { user: true },
      });
    }),

  deleteMySub: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      //TODO: await ctx.db.source.findMany({ where: { subtitleSourceId: input.id } });
      await ctx.db.subtitleSource.delete({
        where: {
          ownerId: session.user.id,
          id: input.id,
        },
      });

      return; //TODO: Error handling?!;
    }),
});
