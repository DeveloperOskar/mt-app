import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { systemFoodLikes, systemFoods } from "~/server/db/schema";

export const systemFoodsRouter = createTRPCRouter({
  likeStatus: protectedProcedure
    .input(z.object({ liked: z.boolean(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(systemFoodLikes)
        .set({
          liked: input.liked,
        })
        .where(eq(systemFoodLikes.id, parseInt(input.id)));
    }),

  createLike: protectedProcedure
    .input(z.object({ liked: z.boolean(), systemFoodId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.execute(sql`
      INSERT INTO ${systemFoodLikes} 
      (
        ${systemFoodLikes.systemFoodId}, 
        ${systemFoodLikes.userId}, 
        ${systemFoodLikes.liked}
      )
      VALUES (
        ${input.systemFoodId},
        ${ctx.session.user.id},
        ${input.liked}
      )`);
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.execute(sql`
      SELECT 
      ${systemFoods.id},
      ${systemFoods.name}, 
      ${systemFoods.protein}, 
      ${systemFoods.carbs}, 
      ${systemFoods.fat}, 
      ${systemFoods.kcal}, 
      ${systemFoods.amount}, 
      ${systemFoods.unit}, 
      ${systemFoodLikes.liked} ,
      ${systemFoodLikes.id} AS likeId
      FROM ${systemFoods} 
      LEFT JOIN ${systemFoodLikes}
      ON ${systemFoodLikes.systemFoodId} = ${systemFoods.id} 
      AND ${systemFoodLikes.userId} = ${ctx.session.user.id}
      ORDER BY ${systemFoodLikes.liked} DESC,  ${systemFoods.name} ASC
    `);

    return result.rows as {
      id: string;
      name: string;
      protein: number;
      carbs: number;
      fat: number;
      kcal: number;
      amount: number;
      unit: string;
      liked: boolean | null;
      likeId: string | null;
    }[];
  }),
});
