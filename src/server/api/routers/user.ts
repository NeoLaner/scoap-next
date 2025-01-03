import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
      const curDomain = src.domain;
      if (acc.includes(curDomain)) return acc;
      else return [...acc, curDomain];
    }, []);

    const sourcesGroupedByDomain = uniqueDomains.map((domain) => {
      const srcs = sources.filter((src) => src.domain === domain);
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

  updateSrcsDomain: protectedProcedure
    .input(z.object({ srcIds: z.array(z.string()), domain: z.string() }))
    .query(async ({ ctx, input }) => {
      await ctx.db.mediaSource.updateMany({
        where: { id: { in: input.srcIds }, ownerId: ctx.session.user.id },
        data: { domain: input.domain },
      });

      await ctx.db.subtitleSource.updateMany({
        where: { id: { in: input.srcIds }, ownerId: ctx.session.user.id },
        data: { domain: input.domain },
      });
    }),
});
