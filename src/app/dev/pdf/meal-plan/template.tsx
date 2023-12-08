"use client";
import { pdf } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import MealPlanTemplate from "~/app/_components/_coaching/tools/meal-plan/meal-plan-template";
import {
  MealPlanMeal,
  calculateMealsTotal,
} from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";

const Template = () => {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    const generatePdf = async () => {
      const blob = await pdf(
        <MealPlanTemplate
          totalCarbs={totalCarbs}
          totalFat={totalFat}
          totalKcal={totalKcal}
          totalProtein={totalProtein}
          meals={meals}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      setSrc(url);
    };

    generatePdf();
  }, [totalCarbs, totalFat, totalKcal, totalProtein, meals]);

  if (!src) return null;

  return <iframe className="h-screen w-full" src={src}></iframe>;
};

export default Template;

const meals: MealPlanMeal[] = [
  {
    description: "Måltid 1 beskrivning",
    foods: [
      {
        amount: 50,
        brand: "Arla",
        carbs: 5,
        fat: 5,
        id: "1",
        kcal: 100,
        name: "Mjölk",
        protein: 10,
        calculatedCarbs: 5,
        calculatedFat: 5,
        calculatedKcal: 100,
        calculatedProtein: 10,
        unit: "ml",
      },
      {
        amount: 150,
        brand: "guldfågeln",
        carbs: 1,
        fat: 3,
        id: "2",
        kcal: 150,
        name: "Kycklingfile",
        protein: 26,
        calculatedCarbs: 2,
        calculatedFat: 2.5,
        calculatedKcal: 220,
        calculatedProtein: 40,
        unit: "g",
      },
      {
        amount: 0.5,
        brand: "Goldenfarms",
        carbs: 2,
        fat: 1,
        id: "1",
        kcal: 55,
        name: "Äpple",
        protein: 1,
        calculatedCarbs: 1,
        calculatedFat: 2,
        calculatedKcal: 66,
        calculatedProtein: 1,
        unit: "unit",
      },
    ],
    id: "1",
    name: "Måltid 1",
  },
  {
    description: "Måltid 2 beskrivning",
    foods: [
      {
        amount: 50,
        brand: "Arla",
        carbs: 5,
        fat: 5,
        id: "1",
        kcal: 100,
        name: "Mjölk",
        protein: 10,
        calculatedCarbs: 5,
        calculatedFat: 5,
        calculatedKcal: 100,
        calculatedProtein: 10,
        unit: "ml",
      },
      {
        amount: 150,
        brand: "guldfågeln",
        carbs: 1,
        fat: 3,
        id: "2",
        kcal: 150,
        name: "Kycklingfile",
        protein: 26,
        calculatedCarbs: 2,
        calculatedFat: 2.5,
        calculatedKcal: 220,
        calculatedProtein: 40,
        unit: "g",
      },
      {
        amount: 0.5,
        brand: "Goldenfarms",
        carbs: 2,
        fat: 1,
        id: "1",
        kcal: 55,
        name: "Äpple",
        protein: 1,
        calculatedCarbs: 1,
        calculatedFat: 2,
        calculatedKcal: 66,
        calculatedProtein: 1,
        unit: "unit",
      },
    ],
    id: "2",
    name: "Måltid 2",
  },
  {
    description: "Måltid 3 beskrivning",
    foods: [
      {
        amount: 50,
        brand: "Arla",
        carbs: 5,
        fat: 5,
        id: "1",
        kcal: 100,
        name: "Mjölk",
        protein: 10,
        calculatedCarbs: 5,
        calculatedFat: 5,
        calculatedKcal: 100,
        calculatedProtein: 10,
        unit: "ml",
      },
      {
        amount: 150,
        brand: "guldfågeln",
        carbs: 1,
        fat: 3,
        id: "2",
        kcal: 150,
        name: "Kycklingfile",
        protein: 26,
        calculatedCarbs: 2,
        calculatedFat: 2.5,
        calculatedKcal: 220,
        calculatedProtein: 40,
        unit: "g",
      },
      {
        amount: 0.5,
        brand: "Goldenfarms",
        carbs: 2,
        fat: 1,
        id: "1",
        kcal: 55,
        name: "Äpple",
        protein: 1,
        calculatedCarbs: 1,
        calculatedFat: 2,
        calculatedKcal: 66,
        calculatedProtein: 1,
        unit: "unit",
      },
    ],
    id: "3",
    name: "Måltid 3",
  },
  {
    description: "",
    foods: [
      {
        amount: 50,
        brand: "Arla",
        carbs: 5,
        fat: 5,
        id: "1",
        kcal: 100,
        name: "Mjölk",
        protein: 10,
        calculatedCarbs: 5,
        calculatedFat: 5,
        calculatedKcal: 100,
        calculatedProtein: 10,
        unit: "ml",
      },
      {
        amount: 150,
        brand: "guldfågeln",
        carbs: 1,
        fat: 3,
        id: "2",
        kcal: 150,
        name: "Kycklingfile",
        protein: 26,
        calculatedCarbs: 2,
        calculatedFat: 2.5,
        calculatedKcal: 220,
        calculatedProtein: 40,
        unit: "g",
      },
      {
        amount: 0.5,
        brand: "Goldenfarms",
        carbs: 2,
        fat: 1,
        id: "1",
        kcal: 55,
        name: "Äpple",
        protein: 1,
        calculatedCarbs: 1,
        calculatedFat: 2,
        calculatedKcal: 66,
        calculatedProtein: 1,
        unit: "unit",
      },
    ],
    id: "4",
    name: "Måltid 4",
  },
];

const { totalCarbs, totalFat, totalKcal, totalProtein } =
  calculateMealsTotal(meals);
