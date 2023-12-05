"use client";

import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import React from "react";
import { Avatar, AvatarFallback } from "~/app/_components/ui/avatar";
import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { getInitials, showDecimalIfNotZero } from "~/app/_lib/utils";
import { coachingMealPlanState$ } from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";

enableReactTracking({
  auto: true,
});

const Summary = () => {
  const {
    meals,
    selectClientDialog: { selectedClient },
  } = coachingMealPlanState$.get();

  const { totalProtein, totalCarbs, totalFat, totalKcal } = meals.reduce(
    (acc, meal) => {
      return meal.foods.reduce((acc, food) => {
        return {
          totalProtein: acc.totalProtein + food.calculatedProtein,
          totalCarbs: acc.totalCarbs + food.calculatedCarbs,
          totalFat: acc.totalFat + food.calculatedFat,
          totalKcal: acc.totalKcal + food.calculatedKcal,
        };
      }, acc);
    },
    { totalProtein: 0, totalCarbs: 0, totalFat: 0, totalKcal: 0 },
  );
  return (
    <Card className="rounded-md-none h-full basis-[380px] border-t-0 p-4">
      <Button
        className="mx-auto block"
        variant={"default"}
        size={"sm"}
        onClick={() => {
          coachingMealPlanState$.set((state) => ({
            ...state,
            selectClientDialog: { ...state.selectClientDialog, show: true },
          }));
        }}
      >
        {selectedClient ? "Byt klient" : "Välj klient"}
      </Button>

      {selectedClient && <ClientInfo client={selectedClient} />}

      <h1 className="mt-10 text-center text-2xl font-semibold">Totalt</h1>

      {!selectedClient ? (
        <NoClientSummary
          totalKcal={totalKcal}
          totalProtein={totalProtein}
          totalCarbs={totalCarbs}
          totalFat={totalFat}
        />
      ) : (
        <ClientSummary
          totalKcal={totalKcal}
          totalProtein={totalProtein}
          totalCarbs={totalCarbs}
          totalFat={totalFat}
          clientProtein={selectedClient.protein}
          clientCarbs={selectedClient.carbs}
          clientFat={selectedClient.fat}
          clientKcal={selectedClient.kcal}
        />
      )}
    </Card>
  );
};

const NoClientSummary = ({
  totalCarbs,
  totalFat,
  totalKcal,
  totalProtein,
}: {
  totalKcal: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}) => {
  return (
    <>
      <div className="mx-auto mt-3 flex w-fit min-w-[150px] flex-col rounded-md bg-accent p-2 text-center">
        <p className="text-xs font-semibold text-gray-700">Kalorier</p>
        <p className="text-base">{totalKcal.toFixed(0)} kcal</p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 ">
        <div className="flex flex-col rounded-md bg-accent p-2 text-center">
          <p className="text-xs font-semibold text-gray-700">Protein</p>
          <p className="text-base">{totalProtein.toFixed(1)} g</p>
        </div>

        <div className="flex flex-col rounded-md bg-accent p-2 text-center">
          <p className="text-xs font-semibold text-gray-700">Kolhydrater</p>
          <p className="text-base">{totalCarbs.toFixed(1)} g</p>
        </div>

        <div className="flex flex-col rounded-md bg-accent p-2 text-center">
          <p className="text-xs font-semibold text-gray-700">Fett</p>
          <p className="text-base"> {totalFat.toFixed(1)} g</p>
        </div>
      </div>
    </>
  );
};

const ClientInfo = ({ client }: { client: GetCoachingClient }) => {
  return (
    <div className="mt-3 flex flex-col items-center justify-center gap-1 text-center">
      <p className="text-xs text-gray-700">Vald klient</p>
      <Avatar className="h-16 w-16 text-base">
        <AvatarFallback className="font-semibold">
          {getInitials(client.name)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold">{client.name}</p>
        <p className="text-sm">{client.email}</p>
      </div>
    </div>
  );
};

const ClientSummary = ({
  totalCarbs,
  totalFat,
  totalKcal,
  totalProtein,
  clientCarbs,
  clientFat,
  clientKcal,
  clientProtein,
}: {
  totalKcal: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  clientProtein: number;
  clientCarbs: number;
  clientFat: number;
  clientKcal: number;
}) => {
  return (
    <>
      <div className="mx-auto mt-3 flex w-fit flex-col rounded-md bg-accent p-2 text-center">
        <p className="text-xs font-semibold text-gray-700">Kalorier</p>
        <p className="text-base">
          {totalKcal.toFixed(0)} / {clientKcal} kcal
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 ">
        <div className="flex flex-col rounded-md bg-accent p-2 text-center">
          <p className="text-xs font-semibold text-gray-700">Protein</p>
          <p className="text-base">
            {showDecimalIfNotZero(totalProtein)} / {clientProtein} g
          </p>
        </div>

        <div className="flex flex-col rounded-md bg-accent p-2 text-center">
          <p className="text-xs font-semibold text-gray-700">Kolhydrater</p>
          <p className="text-base">
            {showDecimalIfNotZero(totalCarbs)} / {clientCarbs} g
          </p>
        </div>
        <div className="flex flex-col rounded-md bg-accent p-2 text-center">
          <p className="text-xs font-semibold text-gray-700">Fett</p>
          <p className="text-base">
            {showDecimalIfNotZero(totalFat)} / {clientFat} g
          </p>
        </div>
      </div>
    </>
  );
};
export default Summary;
