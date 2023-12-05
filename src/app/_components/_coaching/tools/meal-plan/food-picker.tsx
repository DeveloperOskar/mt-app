"use client";

import { Grip, Star } from "lucide-react";
import React from "react";
import { Card } from "~/app/_components/ui/card";
import { Input } from "~/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { cn, hyphenEmptyString } from "~/app/_lib/utils";
import { TransferFoodData } from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";
import { GetCoachingFoods } from "~/types/_coaching/data/foods/coaching-foods";
import { GetSystemFood } from "~/types/_coaching/data/foods/system-foods";

const FoodPicker: React.FC<{
  coachingFoods: GetCoachingFoods[];
  systemFoods: GetSystemFood[];
}> = ({ coachingFoods, systemFoods }) => {
  const [selectedFood, setSelectedFood] = React.useState<"coaching" | "system">(
    "coaching",
  );
  const [search, setSearch] = React.useState("");

  return (
    <Card className=" flex h-full basis-[330px] flex-col gap-6 rounded-none border-t-0 py-6">
      <div className="flex flex-col gap-4 px-4">
        <Select
          value={selectedFood}
          onValueChange={(val) => {
            setSelectedFood(val as "coaching" | "system");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Välja typ av livsmedel" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="coaching">Dina livsmedel</SelectItem>
            <SelectItem value="system">Systemets livsmedel</SelectItem>
          </SelectContent>
        </Select>

        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sök efter livsmedel"
        />
      </div>

      <div className="styled-scrollbar flex flex-col gap-3 overflow-auto px-4">
        {selectedFood === "coaching"
          ? coachingFoods
              .filter((food) =>
                !search ? true : food.name.toLowerCase().includes(search),
              )
              .map((food, i) => (
                <FoodCard
                  id={food.id}
                  key={food.id + "-" + "system" + "-" + i + "-" + food.name}
                  name={food.name}
                  amount={food.amount}
                  brand={food.brand ?? ""}
                  protein={food.protein}
                  carbs={food.carbs}
                  fat={food.fat}
                  kcal={food.kcal}
                  liked={food.liked ?? false}
                  coachingFoods={true}
                  calculatedCarbs={food.carbs}
                  calculatedFat={food.fat}
                  calculatedKcal={food.kcal}
                  calculatedProtein={food.protein}
                ></FoodCard>
              ))
          : systemFoods
              .filter((food) =>
                !search ? true : food.name.toLowerCase().includes(search),
              )
              .map((food, i) => (
                <FoodCard
                  id={food.id}
                  key={food.id + "-" + "system" + "-" + i + "-" + food.name}
                  name={food.name}
                  amount={food.amount}
                  brand={""}
                  protein={food.protein}
                  carbs={food.carbs}
                  fat={food.fat}
                  kcal={food.kcal}
                  liked={food.liked ?? false}
                  coachingFoods={false}
                  calculatedCarbs={food.carbs}
                  calculatedFat={food.fat}
                  calculatedKcal={food.kcal}
                  calculatedProtein={food.protein}
                ></FoodCard>
              ))}
      </div>
    </Card>
  );
};

const FoodCard: React.FC<TransferFoodData> = ({
  id,
  coachingFoods,
  amount,
  brand,
  carbs,
  fat,
  kcal,
  name,
  protein,
  liked,
  calculatedCarbs,
  calculatedFat,
  calculatedKcal,
  calculatedProtein,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);

    e.dataTransfer.setData(
      "food",
      JSON.stringify({
        id,
        coachingFoods,
        brand,
        carbs,
        fat,
        kcal,
        name,
        protein,
        liked,
        amount,
        calculatedCarbs,
        calculatedFat,
        calculatedKcal,
        calculatedProtein,
      }),
    );
  };
  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
  };

  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <Card
      className={cn(
        "relative cursor-grab p-4",
        isDragging && "cursor-grabbing bg-gray-100",
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center gap-2">
        <Grip className=" h-5 w-5 text-gray-600" />
        <h1 className="font-semibold">{name}</h1>
      </div>

      {coachingFoods && (
        <p className="text-sm text-gray-500">{hyphenEmptyString(brand)}</p>
      )}

      <div className="mt-1.5 flex items-center gap-1">
        <p className="text-xs text-gray-500">Protein: {protein}g |</p>
        <p className="text-xs text-gray-500">Kolhydrater: {carbs}g |</p>
        <p className="text-xs text-gray-500">Fett: {fat}g</p>
      </div>
      <p className="text-xs text-gray-500">Kcal: {kcal}</p>

      <Star
        className={cn(
          "absolute right-4 top-4 text-yellow-500",
          liked && "fill-yellow-500",
        )}
      />
    </Card>
  );
};

export default FoodPicker;
