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
      z.object({
        client: createClientSchema,
        newImageKey: z.string().optional(),
        newImageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.client.id) throw new Error("No id provided");

      console.log("got image key:", input.client.imageKey);

      if (input.newImageKey && input.newImageUrl) {
        const ut = new UTApi();
        await ut.deleteFiles(input.client.imageKey);
      }

      return await ctx.db
        .update(coachingClients)
        .set({
          ...input.client,
          userId: ctx.session.user.id,
          imageKey: input.newImageKey
            ? input.newImageKey
            : input.client.imageKey,
          imageUrl: input.newImageUrl
            ? input.newImageUrl
            : input.client.imageUrl,
        })
        .where(eq(coachingClients.id, input.client.id));
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
