import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

type RouterInput = inferRouterOutputs<AppRouter>;

export type GetCoachingClient = RouterInput["coachingClients"]["get"][0];
