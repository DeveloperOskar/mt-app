import { eq } from "drizzle-orm";
import { z } from "zod";

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

  create: protectedProcedure
    .input(createClientSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(coachingClients)
        .values({ ...input, userId: ctx.session.user.id });
    }),

  update: protectedProcedure
    .input(z.object({ updatedClient: createClientSchema }))
    .mutation(async ({ ctx, input }) => {
      if (!input.updatedClient.id) throw new Error("No id provided");

      return await ctx.db
        .update(coachingClients)
        .set({
          ...input.updatedClient,
          userId: ctx.session.user.id,
        })
        .where(eq(coachingClients.id, input.updatedClient.id));
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
