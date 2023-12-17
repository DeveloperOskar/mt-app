"use client";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import React, { useState } from "react";
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
import {
  coachingClientsState$,
  toggleAddWeightOrFatPercentageDialog,
} from "~/app/_state/coaching/data/clients/coachingClientsState";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Input } from "~/app/_components/ui/input";
import { useRouter } from "next/navigation";

enableReactTracking({
  auto: true,
});

const RegisterWeightFatPercentageDialog = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const [value, setValue] = useState(0);
  const { clientId, show, action, clientName } =
    coachingClientsState$.addWeightOrFatPercentageDialog.get();

  const addWeightMutation = api.coachingClients.addWeightIn.useMutation();
  const addFatPercentageMutation =
    api.coachingClients.addFatPercentage.useMutation();

  const handleRegister = async () => {
    if (action === "weight") {
      try {
        if (!clientId || !value) return;

        await addWeightMutation.mutateAsync({
          clientId,
          weight: value,
        });

        toggleAddWeightOrFatPercentageDialog(false, null, "weight", "");
        toast.success("Vikten har registrerats!");

        utils.coachingClients.get.invalidate();
        router.refresh();
      } catch (error) {
        toast.error(
          "Något gick fel! Försök igen senare. Eller kontakta support.",
        );
      }
    } else {
      if (!clientId || !value) return;
      try {
        await addFatPercentageMutation.mutateAsync({
          clientId,
          fatPercentage: value,
        });

        toggleAddWeightOrFatPercentageDialog(false, null, "weight", "");
        toast.success("Vikten har registrerats!");

        utils.coachingClients.get.invalidate();
        router.refresh();
      } catch (error) {
        toast.error(
          "Något gick fel! Försök igen senare. Eller kontakta support.",
        );
      }
    }
  };

  return (
    <AlertDialog
      open={show}
      onOpenChange={(state) => {
        if (!state) {
          setValue(0);
          toggleAddWeightOrFatPercentageDialog(false, null, "weight", "");
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          {action === "weight" ? (
            <AlertDialogTitle>
              Registrera vikt för{" "}
              <span className=" capitalize">{clientName}</span>
            </AlertDialogTitle>
          ) : (
            <AlertDialogTitle>
              Registrera fettprocent för{" "}
              <span className=" capitalize">{clientName}</span>
            </AlertDialogTitle>
          )}
          <AlertDialogDescription>
            {action === "weight"
              ? "Registrera vikt för klienten"
              : "Registrera fettprocent för klienten"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.valueAsNumber)}
        />

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={
              addWeightMutation.isLoading || addFatPercentageMutation.isLoading
            }
          >
            Cancel
          </AlertDialogCancel>
          <Button
            loading={
              addWeightMutation.isLoading || addFatPercentageMutation.isLoading
            }
            onClick={handleRegister}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RegisterWeightFatPercentageDialog;
