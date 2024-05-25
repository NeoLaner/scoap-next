import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const addonRouter = createTRPCRouter({
  getAddons: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    //Find the user
    const user = await ctx.db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.addons;
  }),

  addAddon: protectedProcedure
    .input(z.object({ transportUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      // Find the user
      const user = await ctx.db.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      //Check for duplicate addon
      const isAddonExist =
        user.addons.filter((url) => input.transportUrl === url).length > 0;

      if (isAddonExist) throw new Error("Addon added already.");
      // Update the addons array
      const updatedAddons = [...user.addons, input.transportUrl];

      // Save the updated user
      return await ctx.db.user.update({
        where: { id: userId },
        data: { addons: updatedAddons },
      });
    }),
});
