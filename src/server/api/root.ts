import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

import { addonRouter } from "./routers/addon";
import { userRouter } from "./routers/user";
import { sourceRouter } from "./routers/source";
import { roomRouter } from "./routers/room";
import { mediaSourceRouter } from "./routers/media-source";
import { subtitleRouter } from "./routers/subtitle";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  addon: addonRouter,
  room: roomRouter,
  user: userRouter,
  source: sourceRouter,
  mediaSource: mediaSourceRouter,
  subtitle: subtitleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
