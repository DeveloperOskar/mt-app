import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { z } from "zod";

export type ClientGoal = "gain" | "lose" | "maintain";

export const foodNumberSchema = z
  .number({
    invalid_type_error: "Måste ha ett värde.",
  })
  .min(0)
  .max(10000, {
    message: "Mängden får vara max 10000.",
  })
  .step(1, {
    message: "Inga decimaler tillåtet.",
  })
  .default(0);

export const createClientSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(2, {
      message: "Namnet måste vara minst 2 tecken.",
    })
    .max(30, {
      message: "Namnet får vara max 30 tecken.",
    }),
  email: z
    .string()
    .max(50, {
      message: "Får vara max 50 tecken.",
    })
    .optional()
    .default(""),
  textColor: z.string().default("#272E3F"),
  backgroundColor: z.string().default("#F1F5F9"),
  weight: z
    .number()
    .max(1000, {
      message: "Vikten får vara max 1000 kg.",
    })
    .step(0.01, {
      message: "Max 2 decimaler tilåtet.",
    })
    .default(0),
  fatPercentage: z
    .number()
    .max(100, {
      message: "Får max vara 100.",
    })
    .step(0.01, {
      message: "Max 2 decimaler tilåtet.",
    })
    .default(0),
  goal: z
    .union([z.literal("gain"), z.literal("lose"), z.literal("maintain")])
    .default("maintain"),
  protein: foodNumberSchema,
  carbs: foodNumberSchema,
  fat: foodNumberSchema,
  kcal: foodNumberSchema,
});

type RouterInput = inferRouterOutputs<AppRouter>;

export type GetCoachingClient = RouterInput["coachingClients"]["get"][0];
