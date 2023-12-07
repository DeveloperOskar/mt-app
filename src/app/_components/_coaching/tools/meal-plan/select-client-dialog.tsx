"use client";

import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import React from "react";
import {
  coachingMealPlanState$,
  selectedClient,
} from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/app/_components/ui/alert-dialog";
import { Button } from "~/app/_components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "~/app/_components/ui/avatar";
import { getInitials, hyphenEmptyString } from "~/app/_lib/utils";
import { ChevronRight } from "lucide-react";

enableReactTracking({
  auto: true,
});

const SelectClientDialog = ({ clients }: { clients: GetCoachingClient[] }) => {
  const {
    selectClientDialog: { show },
  } = coachingMealPlanState$.get();

  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Välj klient</AlertDialogTitle>
          <AlertDialogDescription>
            Välj en klient så att du enkelt kan skapa ett kostschema åt den
            valda personen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ul className="styled-scrollbar flex max-h-[65vh] flex-col gap-2 overflow-auto pb-4 pr-2">
          {clients.map((client) => (
            <li key={client.id}>
              <Button
                className="flex h-auto w-full items-center justify-between gap-2 border p-2"
                variant={"ghost"}
                onClick={() => selectedClient(client, false)}
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback
                      style={{
                        backgroundColor: client.backgroundColor,
                        color: client.textColor,
                      }}
                      className="h-10 w-10"
                    >
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-start">
                    <p>{client.name}</p>
                    <p className="text-xs font-normal ">
                      {hyphenEmptyString(client.email)}
                    </p>
                    <p className="text-xs font-normal">
                      Protein: {client.protein} | Kolhydrater: {client.carbs} |
                      Fett: {client.fat} | Kcal: {client.kcal}
                    </p>
                  </div>
                </div>

                <ChevronRight />
              </Button>
            </li>
          ))}
        </ul>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              coachingMealPlanState$.set((state) => ({
                ...state,
                selectClientDialog: {
                  ...state.selectClientDialog,
                  show: false,
                },
              }));
            }}
          >
            Stäng
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SelectClientDialog;
