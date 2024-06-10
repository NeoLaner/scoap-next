import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { roomRouter } from "./routers/room";
import { instanceRouter } from "./routers/instance";
import { addonRouter } from "./routers/addon";
import { userRouter } from "./routers/user";
import { sourceRouter } from "./routers/source";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  addon: addonRouter,
  post: postRouter,
  room: roomRouter,
  instance: instanceRouter,
  user: userRouter,
  source: sourceRouter,
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
