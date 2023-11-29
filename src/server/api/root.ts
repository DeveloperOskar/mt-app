import { createTRPCRouter } from "~/server/api/trpc";
import { systemFoodsRouter } from "./routers/system-foods";
import { accountRouter } from "./routers/accout";
import { coachingFoodsRouter } from "./routers/coaching-foods";
import { coachingClientsRouter } from "./routers/coaching-clients";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  systemFoods: systemFoodsRouter,
  coachingFoods: coachingFoodsRouter,
  coachingClients: coachingClientsRouter,
  account: accountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
