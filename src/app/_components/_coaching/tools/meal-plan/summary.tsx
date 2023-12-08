"use client";

import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "~/app/_components/ui/avatar";
import { Button } from "~/app/_components/ui/button";
import { Calendar } from "~/app/_components/ui/calendar";
import { Card } from "~/app/_components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { cn, getInitials, showDecimalIfNotZero } from "~/app/_lib/utils";
import {
  calculateMealsTotal,
  coachingMealPlanState$,
} from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";
import { format } from "date-fns";
import { Label } from "~/app/_components/ui/label";
import { sv } from "date-fns/locale";
import { Checkbox } from "~/app/_components/ui/checkbox";

enableReactTracking({
  auto: true,
});

const Summary = () => {
  const {
    meals,
    selectClientDialog: { selectedClient },
  } = coachingMealPlanState$.get();

  const { totalProtein, totalCarbs, totalFat, totalKcal } =
    calculateMealsTotal(meals);

  return (
    <Card className="flex h-full basis-[280px] flex-col gap-6 rounded-none border-t-0 py-4 ">
      <div className="flex flex-col gap-3  px-4">
        <Label>
          <span className="mb-1 block">Startdatum</span>
          <DatePicker label={"Välj startdatum"} />
        </Label>

        <Label>
          <span className="mb-1 block">Slutdatum </span>
          <DatePicker label={"Välj slutdatum"} />
        </Label>
      </div>

      <div className="flex items-center space-x-2 px-4">
        <Checkbox id="terms2" />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Inkludera mig som författare
        </label>
      </div>

      <div className="flex flex-col gap-3 px-4">
        <Button
          className="mx-auto block w-full"
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

        {selectedClient && (
          <Button
            onClick={() => {
              coachingMealPlanState$.set((state) => ({
                ...state,
                selectClientDialog: {
                  ...state.selectClientDialog,
                  selectedClient: undefined,
                },
              }));
            }}
            variant={"outline"}
          >
            Ångra
          </Button>
        )}
      </div>

      {selectedClient && <ClientInfo client={selectedClient} />}

      <div className="flex flex-col gap-3">
        <h1 className="px-4 text-start text-xl font-semibold">Totalt</h1>

        <MacrosSummary
          totalKcal={totalKcal}
          totalProtein={totalProtein}
          totalCarbs={totalCarbs}
          totalFat={totalFat}
          clientProtein={selectedClient?.protein}
          clientCarbs={selectedClient?.carbs}
          clientFat={selectedClient?.fat}
          clientKcal={selectedClient?.kcal}
        />
      </div>
    </Card>
  );
};

const DatePicker: React.FC<{ label: string }> = ({ label }) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", {
              locale: sv,
            })
          ) : (
            <span>{label}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const ClientInfo = ({ client }: { client: GetCoachingClient }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center">
      <Avatar className="h-16 w-16 text-base">
        <AvatarFallback
          style={{
            backgroundColor: client.backgroundColor,
            color: client.textColor,
          }}
          className="font-semibold"
        >
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

const MacrosSummary = ({
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
  clientProtein: number | undefined;
  clientCarbs: number | undefined;
  clientFat: number | undefined;
  clientKcal: number | undefined;
}) => {
  return (
    <>
      <div className="mx-auto flex  w-full flex-col  rounded-none bg-accent px-4 py-2">
        <p className="text-base font-semibold text-gray-700">Kalorier</p>
        <p className="text-sm">
          {totalKcal.toFixed(0)} {clientKcal && "/ " + clientKcal} kcal
        </p>
      </div>

      <div className="mx-auto  flex  w-full flex-col   rounded-none bg-accent px-4 py-2">
        <p className="text-base font-semibold text-gray-700">Protein</p>
        <p className="text-sm">
          {showDecimalIfNotZero(totalProtein)}{" "}
          {clientProtein && "/ " + clientProtein} g
        </p>
      </div>

      <div className="mx-auto flex  w-full flex-col   rounded-none bg-accent px-4 py-2">
        <p className="text-base font-semibold text-gray-700">Kolhydrater</p>
        <p className="text-sm">
          {showDecimalIfNotZero(totalCarbs)} {clientCarbs && "/ " + clientCarbs}{" "}
          g
        </p>
      </div>

      <div className="mx-auto   flex  w-full flex-col   rounded-none bg-accent px-4 py-2">
        <p className="text-base font-semibold text-gray-700">Fett</p>
        <p className="text-sm">
          {showDecimalIfNotZero(totalFat)} {clientFat && "/ " + clientFat}g
        </p>
      </div>
    </>
  );
};
export default Summary;
