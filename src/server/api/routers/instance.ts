import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const instanceRouter = createTRPCRouter({
  //get a instance
  get: protectedProcedure
    .input(z.object({ instanceId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.instance.findFirst({
        where: { id: input.instanceId },
        select: { password: false },
      });
    }),
  //make a instance
  create: protectedProcedure
    .input(z.object({ rootRoomId: z.string(), hostId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.instance.create({
        data: {
          rootRoomId: input.rootRoomId,
          hostId: input.hostId,
        },
      });
    }),
});
