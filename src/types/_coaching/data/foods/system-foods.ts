import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

type RouterInput = inferRouterOutputs<AppRouter>;

export type FoodUnits = "g" | "ml" | "unit";

export type GetSystemFood = RouterInput["systemFoods"]["get"][0];
