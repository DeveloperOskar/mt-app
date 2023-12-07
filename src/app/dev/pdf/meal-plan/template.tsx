"use client";
import { pdf } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import MealPlanTemplate from "~/app/_components/_coaching/tools/meal-plan/meal-plan-template";
import { MealPlanMeal } from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";

const totalCarbs = 300;
const totalFat = 100;
const totalKcal = 3000;
const totalProtein = 200;
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
        coachingFoods: true,
      },
      {
        amount: 50,
        brand: "guldfågeln",
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
        coachingFoods: true,
      },
    ],
    id: "1",
    name: "Måltid 1",
  },
  {
    description: "Måltid 2 beskrivning",
    foods: [],
    id: "2",
    name: "Måltid 2",
  },
];

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
