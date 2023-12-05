"use client";
import React from "react";
import ActionBar from "./action-bar";
import { Card } from "~/app/_components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/app/_components/ui/collapsible";
import {
  MealPlanMeal,
  TransferFoodData,
  addFoodToMeal,
  amountChanged,
  coachingMealPlanState$,
  removeFoodFromMeal,
} from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";
import { cn, showDecimalIfNotZero } from "~/app/_lib/utils";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { ChevronDown } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import { Textarea } from "~/app/_components/ui/textarea";
import { Label } from "~/app/_components/ui/label";
import { Input } from "~/app/_components/ui/input";
import { coachingFoodsState$ } from "~/app/_state/coaching/data/foods/coahcingFoodsState";

enableReactTracking({
  auto: true,
});

const Content = () => {
  const { meals } = coachingMealPlanState$.get();
  return (
    <div className="flex basis-[700px] flex-col border-t-0 ">
      <ActionBar />

      <Card className="styled-scrollbar  flex h-full flex-col gap-6 overflow-auto rounded-none border-t-0 py-6">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </Card>
    </div>
  );
};

const MealCard: React.FC<{ meal: MealPlanMeal }> = ({ meal }) => {
  const { totalProtein, totalCarbs, totalFat, totalKcal } = meal.foods.reduce(
    (acc, food) => {
      acc.totalProtein += food.calculatedProtein;
      acc.totalCarbs += food.calculatedCarbs;
      acc.totalFat += food.calculatedFat;
      acc.totalKcal += food.calculatedKcal;
      return acc;
    },
    { totalProtein: 0, totalCarbs: 0, totalFat: 0, totalKcal: 0 },
  );

  const [open, setOpen] = React.useState(false);
  const [isOver, setIsOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setOpen(true);
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dataTransfer = e.dataTransfer.getData("food");
    if (!dataTransfer) return;
    const food = JSON?.parse(dataTransfer) as TransferFoodData | undefined;

    if (!food) return;

    addFoodToMeal(meal.id, food);
    setOpen(true);
    setIsOver(false);
  };

  return (
    <div
      className={cn(
        "border-y transition-all duration-100 hover:shadow-sm",
        open && "shadow-sm",
        isOver && "bg-accent text-accent-foreground",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex h-[unset] w-full items-center  justify-between rounded-none px-4 py-2",
              open && "bg-accent text-accent-foreground",
            )}
          >
            <p className="text-xl font-semibold">{meal.name}</p>

            <div className="text-sm">
              <p>Protein</p>
              <p className="font-normal">{totalProtein.toFixed(1)} g</p>
            </div>

            <div className="text-sm">
              <p>Kolhydrater</p>
              <p className="font-normal">{totalCarbs.toFixed(1)} g</p>
            </div>

            <div className="text-sm">
              <p>Fett</p>
              <p className="font-normal">{totalFat.toFixed(1)} g</p>
            </div>

            <div className="text-sm">
              <p>Kalorier</p>
              <p className="font-normal">
                {showDecimalIfNotZero(totalKcal)} kcal
              </p>
            </div>

            <ChevronDown
              className={cn(
                " ml-6 transition-all duration-150",
                open && " rotate-180",
              )}
            />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pt-6">
            <Label htmlFor={meal.name + "-name"}>Namn</Label>
            <Input
              onChange={(e) => {
                coachingMealPlanState$.set((state) => ({
                  ...state,
                  meals: state.meals.map((m) =>
                    m.id === meal.id ? { ...m, name: e.target.value } : m,
                  ),
                }));
              }}
              value={meal.name}
              type="text"
              id={meal.name + "-name"}
              className="mt-1 min-h-[unset] resize-none"
            />

            <Label htmlFor={meal.name + "-info"}>Beskrivning</Label>
            <Textarea
              value={meal.description}
              onChange={(e) => {
                coachingMealPlanState$.set((state) => ({
                  ...state,
                  meals: state.meals.map((m) =>
                    m.id === meal.id
                      ? { ...m, description: e.target.value }
                      : m,
                  ),
                }));
              }}
              id={meal.name + "-info"}
              className="mt-1 min-h-[unset] resize-none"
              rows={2}
            />
          </div>

          <div className="mt-4 px-4 pb-6 ">
            <Label>Livsmedel</Label>
            <table className="mt-1 w-full table-fixed">
              <thead>
                <tr className=" border-t bg-accent text-accent-foreground">
                  <th className=" py-3 pl-3 pr-2 text-start text-xs font-semibold uppercase">
                    Namn
                  </th>

                  <th className=" w-[90px] py-3 pr-2 text-start text-xs font-semibold uppercase">
                    Mängd
                  </th>
                  <th className="py-3 pr-2 text-start text-xs font-semibold uppercase">
                    Protein
                  </th>

                  <th className="  py-3 pr-2 text-start text-xs font-semibold uppercase">
                    Kolhydrater
                  </th>

                  <th className="w-[60px] py-3 pr-2 text-start text-xs font-semibold uppercase">
                    Fett
                  </th>
                  <th className="  py-3 pr-2 text-start text-xs font-semibold uppercase">
                    Kalorier
                  </th>
                  <th className=" w-[70px] py-3 pr-2 text-start text-xs font-semibold uppercase">
                    <span className="sr-only">ta bort</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {meal.foods.length === 0 && (
                  <tr className="border-b border-t">
                    <td colSpan={6} className="py-3 pl-3 text-center text-xs">
                      Dra livsmedel hit för att lägga till dem.
                    </td>
                  </tr>
                )}

                {meal.foods.length > 0 &&
                  meal.foods.map((food, foodIndex) => (
                    <tr
                      className={cn(
                        "border-t",
                        foodIndex === meal.foods.length - 1 && "border-b",
                      )}
                    >
                      <td className="py-3 pl-3 text-xs">{food.name}</td>
                      <td className="pr-3">
                        <Input
                          onChange={(e) =>
                            amountChanged(
                              meal,
                              food,
                              foodIndex,
                              e.target.valueAsNumber ?? 0,
                            )
                          }
                          value={food.amount}
                          type="number"
                          className="h-6 px-2 py-3 text-xs"
                        />
                      </td>
                      <td className="pr-2 text-xs">
                        {food.calculatedProtein.toFixed(1)} g
                      </td>
                      <td className="pr-2 text-xs">
                        {food.calculatedCarbs.toFixed(1)} g
                      </td>
                      <td className="pr-2 text-xs">
                        {food.calculatedFat.toFixed(1)} g
                      </td>
                      <td className="pr-2 text-xs">
                        {showDecimalIfNotZero(food.calculatedKcal)} kcal
                      </td>
                      <td className="pr-2 text-xs">
                        <Button
                          onClick={() => removeFoodFromMeal(meal.id, foodIndex)}
                          variant={"link"}
                          className="text-xs text-red-500 hover:text-red-600"
                          size={"sm"}
                        >
                          Ta bort
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Content;
