import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { coachingFoods } from "~/server/db/schema";
import { createFoodSchema } from "~/types/_coaching/data/foods/coaching-foods";

export const coachingFoodsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.coachingFoods.findMany({
      where: eq(coachingFoods.userId, ctx.session.user.id),
    });
  }),

  create: protectedProcedure
    .input(createFoodSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(coachingFoods)
        .values({ ...input, userId: ctx.session.user.id, liked: false });
    }),
});
