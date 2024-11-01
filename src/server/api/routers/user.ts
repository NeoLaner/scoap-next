import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

function getDomainFromUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (error) {
    console.error("Invalid URL", error);
    return "";
  }
}

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),

  updateMeInfo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        userId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.findFirst({ where: { id: ctx.session.user.id } });
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name: input.name,
          userId: input.userId,
        },
      });
    }),

  getAllSrcByDomain: protectedProcedure.query(async ({ ctx }) => {
    //Get all user's sources
    const user = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
      include: { MediaSource: true, SubtitleSource: true },
    });
    if (!user) return;
    const { MediaSource, SubtitleSource } = user;
    const sources = [...MediaSource, ...SubtitleSource];
    //Group them by uniqueDomains
    const uniqueDomains = sources.reduce<string[]>((acc, src) => {
      const curDomain = getDomainFromUrl(src.url);
      if (acc.includes(curDomain)) return acc;
      else return [...acc, curDomain];
    }, []);

    const sourcesGroupedByDomain = uniqueDomains.map((domain) => {
      const srcs = sources.filter(
        (src) => getDomainFromUrl(src.url) === domain,
      );
      const newSrcsType = srcs.map((src) => {
        return { ...src, domain };
      });
      return {
        [domain]: { srcs: newSrcsType },
      };
      // [{"xxx.com": [{domain: "xxx.com" , ...srcFields} , {domain: "xxx.com" , ...srcFields}  ]},
      // {"xxx2.com": [{domain: "xxx2.com" , ...srcFields} , {domain: "xxx2.com" , ...srcFields}  ]}]
    });
    return { sourcesGroupedByDomain, domains: uniqueDomains };
  }),
});
