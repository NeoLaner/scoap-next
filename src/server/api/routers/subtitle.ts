import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import fetch from "node-fetch";

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
  getSubtitle: publicProcedure
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
});
