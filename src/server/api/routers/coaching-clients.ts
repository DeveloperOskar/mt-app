import { eq, sql, desc } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { coachingClients } from "~/server/db/schema";
import { createClientSchema } from "~/types/_coaching/data/clients/coaching-clients";
import { UTApi } from "uploadthing/server";
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
    .input(
      z.object({ updatedClient: createClientSchema, updateImage: z.boolean() }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.updatedClient.id) throw new Error("No id provided");

      //user has uploaded a new image we remove the old one first
      if (input.updateImage) {
        const ut = new UTApi();
        const selectedClient = await ctx.db
          .select()
          .from(coachingClients)
          .where(eq(coachingClients.id, input.updatedClient.id));

        if (selectedClient[0]?.imageKey) {
          await ut.deleteFiles(selectedClient[0].imageKey);
        }
      }

      console.log("input", input.updatedClient);

      return await ctx.db
        .update(coachingClients)
        .set({
          ...input.updatedClient,
          userId: ctx.session.user.id,
        })
        .where(eq(coachingClients.id, input.updatedClient.id));
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number(), imageKey: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.id) throw new Error("No id provided");

      if (input.imageKey && input.imageKey !== "") {
        const ut = new UTApi();
        await ut.deleteFiles(input.imageKey);
      }

      return await ctx.db
        .delete(coachingClients)
        .where(eq(coachingClients.id, input.id));
    }),
});
