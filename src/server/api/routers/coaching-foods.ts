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
    const result = await ctx.db
      .select()
      .from(coachingFoods)
      .where(eq(coachingFoods.userId, ctx.session.user.id))
      .orderBy(desc(coachingFoods.liked), coachingFoods.name);

    return result.map((food) => ({
      ...food,
      amount: parseFloat(food.amount),
      protein: parseFloat(food.protein),
      carbs: parseFloat(food.carbs),
      fat: parseFloat(food.fat),
      kcal: parseFloat(food.kcal),
    }));
  }),

  create: protectedProcedure
    .input(createFoodSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(coachingFoods).values({
        ...input,
        amount: input.amount + "",
        protein: input.protein + "",
        carbs: input.carbs + "",
        fat: input.fat + "",
        kcal: input.kcal + "",
        userId: ctx.session.user.id,
        liked: false,
      });
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(coachingFoods).where(eq(coachingFoods.id, input));
    }),

  update: protectedProcedure
    .input(createFoodSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) throw new Error("No id");

      await ctx.db
        .update(coachingFoods)
        .set({
          ...input,
          protein: input.protein + "",
          carbs: input.carbs + "",
          fat: input.fat + "",
          kcal: input.kcal + "",
          amount: input.amount + "",
        })
        .where(eq(coachingFoods.id, input.id));
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
