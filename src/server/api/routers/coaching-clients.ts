import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { showDecimalIfNotZero } from "~/app/_lib/utils";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { coachingClients } from "~/server/db/schema";
import { createClientSchema } from "~/types/_coaching/data/clients/coaching-clients";

export const coachingClientsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(coachingClients)
      .where(eq(coachingClients.userId, ctx.session.user.id))
      .orderBy(coachingClients.name);
  }),

  addWeightIn: protectedProcedure
    .input(z.object({ clientId: z.number(), weight: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.clientId) throw new Error("No id provided");

      return await ctx.db.execute(sql`
        UPDATE ${coachingClients}
        SET ${coachingClients.weightIns} = JSON_ARRAY_APPEND(
          ${coachingClients.weightIns},
          '$',
          JSON_OBJECT(
            'date', ${new Date().toISOString()},
            'value', ${showDecimalIfNotZero(input.weight, 2)}
          )
        )
        WHERE ${coachingClients.id} = ${input.clientId}
      `);
    }),

  create: protectedProcedure
    .input(z.object({ client: createClientSchema, createdDate: z.date() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.execute(sql`
      INSERT INTO ${coachingClients} (
        ${coachingClients.name},
        ${coachingClients.email},
        ${coachingClients.protein},
        ${coachingClients.fat},
        ${coachingClients.carbs},
        ${coachingClients.kcal},
        ${coachingClients.backgroundColor},
        ${coachingClients.textColor},
        ${coachingClients.weightIns},
        ${coachingClients.fatPercentages},
        ${coachingClients.userId}
        ) VALUES (
          ${input.client.name},
          ${input.client.email},
          ${input.client.protein},
          ${input.client.fat},
          ${input.client.carbs},
          ${input.client.kcal},
          ${input.client.backgroundColor},
          ${input.client.textColor},
          ${JSON.stringify([
            {
              date: input.createdDate.toISOString(),
              value: showDecimalIfNotZero(input.client.weight, 2),
            },
          ])},
          ${JSON.stringify([
            {
              date: input.createdDate.toISOString(),
              value: showDecimalIfNotZero(input.client.fatPercentage, 2),
            },
          ])},
          ${ctx.session.user.id}
        )
      `);
    }),

  update: protectedProcedure
    .input(z.object({ updatedClient: createClientSchema }))
    .mutation(async ({ ctx, input }) => {
      if (!input.updatedClient.id) throw new Error("No id provided");

      return await ctx.db.execute(sql`
      UPDATE ${coachingClients}
      SET ${coachingClients.name} = ${input.updatedClient.name},
      ${coachingClients.email} = ${input.updatedClient.email},
      ${coachingClients.protein} = ${input.updatedClient.protein},
      ${coachingClients.fat} = ${input.updatedClient.fat},
      ${coachingClients.carbs} = ${input.updatedClient.carbs},
      ${coachingClients.kcal} = ${input.updatedClient.kcal},
      ${coachingClients.backgroundColor} = ${
        input.updatedClient.backgroundColor
      },
      ${coachingClients.textColor} = ${input.updatedClient.textColor},
      ${coachingClients.weightIns} = JSON_SET(
        ${coachingClients.weightIns},
        '$[0].value', ${showDecimalIfNotZero(
          input.updatedClient.weight,
          2,
        )}      
      ),
      ${coachingClients.fatPercentages} = JSON_SET(
        ${coachingClients.fatPercentages},
        '$[0].value', ${showDecimalIfNotZero(
          input.updatedClient.fatPercentage,
          2,
        )}
      )
          WHERE ${coachingClients.id} = ${input.updatedClient.id}
      `);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.id) throw new Error("No id provided");

      return await ctx.db
        .delete(coachingClients)
        .where(eq(coachingClients.id, input.id));
    }),
});
