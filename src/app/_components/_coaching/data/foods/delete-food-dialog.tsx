"use client";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
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
  coachingFoodsState$,
  toggleDeleteFoodDialog,
} from "~/app/_state/coaching/data/foods/coahcingFoodsState";
import { api } from "~/trpc/react";

const DeleteFoodDialog = () => {
  const { foodId, show, foodName } = coachingFoodsState$.deleteFoodDialog.get();
  const router = useRouter();
  const deleteMutation = api.coachingFoods.delete.useMutation();
  const utils = api.useUtils();

  const handleDelete = async () => {
    if (!foodId) return;

    await deleteMutation.mutateAsync(foodId);
    await utils.coachingFoods.get.invalidate();
    router.refresh();
    toast.success(`${foodName} har tagits bort!`);

    toggleDeleteFoodDialog(false, null, "");
  };

  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ta bort livsmedlet</AlertDialogTitle>
          <AlertDialogDescription>
            Är du säkert på att du vill ta bort{" "}
            <span className="font-bold"> {foodName}</span>? Detta går inte att
            ångra.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            asChild
            onClick={() => toggleDeleteFoodDialog(false, null, "")}
          >
            <Button disabled={deleteMutation.isLoading} variant={"outline"}>
              Avbryt
            </Button>
          </AlertDialogCancel>
          <Button
            loading={deleteMutation.isLoading}
            variant={"destructive"}
            onClick={handleDelete}
          >
            Ta bort
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFoodDialog;
