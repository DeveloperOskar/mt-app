"use client";

import { Eraser, FileText, PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "~/app/_components/ui/menubar";
import {
  addNewMeal,
  calculateMealsTotal,
  coachingMealPlanState$,
  defaultState,
  deleteMeal,
} from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import MealPlanTemplate from "./meal-plan-template";

enableReactTracking({
  auto: true,
});

const ActionBar = () => {
  const {
    meals,
    selectClientDialog,
    endDate,
    startDate,
    includeAuthor,
    userName,
  } = coachingMealPlanState$.get();

  const handleExportAsPdf = async () => {
    const { totalCarbs, totalFat, totalKcal, totalProtein } =
      calculateMealsTotal(meals);

    const blob = await pdf(
      <MealPlanTemplate
        meals={meals}
        totalCarbs={totalCarbs}
        totalFat={totalFat}
        totalKcal={totalKcal}
        totalProtein={totalProtein}
        clientName={selectClientDialog?.selectedClient?.name ?? ""}
        coachName={includeAuthor ? userName : ""}
        startDate={startDate}
        endDate={endDate}
      />,
    ).toBlob();

    saveAs(blob, "meal-plan.pdf");
  };

  return (
    <Menubar className="rounded-none border-t-0">
      <MenubarMenu>
        <MenubarTrigger>Hantera</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            className="flex items-center justify-between"
            onClick={() =>
              addNewMeal({
                foods: [],
                id: uuidv4(),
                name: "Ny måltid",
                description: "",
              })
            }
          >
            Ny måltid <PlusCircle className="h-4 w-4 text-gray-700" />
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger disabled={meals.length === 0}>
              Ta bort
            </MenubarSubTrigger>
            <MenubarSubContent>
              {meals.map((meal) => (
                <MenubarItem key={meal.id} onClick={() => deleteMeal(meal.id)}>
                  {meal.name}
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem
            onClick={() =>
              coachingMealPlanState$.set((state) => ({ ...defaultState }))
            }
            className="flex items-center justify-between"
          >
            Rensa allt <Eraser className="h-4 w-4 text-gray-700" />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Exportera</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={handleExportAsPdf}
            className="flex items-center justify-between"
          >
            PDF <FileText className="h-4 w-4 text-gray-700" />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ActionBar;
