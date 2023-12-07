import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterInput = inferRouterOutputs<AppRouter>;

export type FoodUnits = "g" | "ml" | "unit";

export type GetSystemFood = RouterInput["systemFoods"]["get"][0];
