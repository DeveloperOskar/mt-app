import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "~/server/api/root";

export const foodNumberSchema = z
  .number({
    invalid_type_error: "Måste ha ett värde.",
  })
  .min(0)
  .max(10000, {
    message: "Mängden får vara max 10000.",
  })
  .step(0.1, {
    message: "Max 1 decimal.",
  })
  .default(0);

export const createFoodSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(2, {
      message: "Namnet måste vara minst 2 tecken.",
    })
    .max(30, {
      message: "Namnet får vara max 30 tecken.",
    }),
  brand: z
    .string()
    .max(50, {
      message: "Märket får vara max 50 tecken.",
    })
    .optional()
    .default(""),
  unit: z
    .union([z.literal("g"), z.literal("ml"), z.literal("unit")])
    .default("g"),
  amount: foodNumberSchema,
  protein: foodNumberSchema,
  carbs: foodNumberSchema,
  fat: foodNumberSchema,
  kcal: foodNumberSchema,
  liked: z.boolean().default(false).optional(),
});

type RouterInput = inferRouterOutputs<AppRouter>;

export type GetCoachingFoods = RouterInput["coachingFoods"]["get"][0];
