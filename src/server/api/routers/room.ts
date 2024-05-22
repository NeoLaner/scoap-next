import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  //get a room
  get: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.room.findFirst({
        where: { id: input.roomId },
        select: { isPrivate: false, isActive: false },
      });
    }),
  //make a room
  create: protectedProcedure
    .input(
      z.object({
        roomName: z.string().min(1).max(32),
        videoLinks: z.array(
          z.object({
            name: z.string(),
            infoHash: z.string(),
            fileIdx: z.number(),
            videoLink: z.string(),
          }),
        ),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.room.create({
        data: {
          roomName: input.roomName,
          roomOwnerId: ctx.session.user.id,
          videoLinks: {
            create: input.videoLinks.map((link) => ({
              name: link.name,
              videoLink: link.videoLink,
              infoHash: link.infoHash,
              fileIdx: link.fileIdx,
            })),
          },
        },
      });
    }),
});
