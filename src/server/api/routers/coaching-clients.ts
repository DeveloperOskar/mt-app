import { eq, sql, desc } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { coachingClients } from "~/server/db/schema";

export const coachingClientsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(coachingClients)
      .where(eq(coachingClients.userId, ctx.session.user.id))
      .orderBy(coachingClients.name);
  }),
});
