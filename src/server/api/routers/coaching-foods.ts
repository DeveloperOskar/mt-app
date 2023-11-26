import { eq, sql, desc } from "drizzle-orm";
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
    return await ctx.db
      .select()
      .from(coachingFoods)
      .where(eq(coachingFoods.userId, ctx.session.user.id))
      .orderBy(desc(coachingFoods.liked), coachingFoods.name);
  }),

  create: protectedProcedure
    .input(createFoodSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(coachingFoods)
        .values({ ...input, userId: ctx.session.user.id, liked: false });
    }),

  changeLikeStatus: protectedProcedure
    .input(z.object({ foodId: z.number(), liked: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(coachingFoods)
        .set({
          liked: input.liked,
        })
        .where(eq(coachingFoods.id, input.foodId));
    }),
});
