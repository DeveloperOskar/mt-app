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
import { api } from "~/trpc/react";

const DeleteFoodDialog: React.FC<{
  handleToggleDialog: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
  foodId: number;
  foodName: string;
}> = ({ foodId, foodName, dialogOpen, handleToggleDialog }) => {
  const router = useRouter();
  const deleteMutation = api.coachingFoods.delete.useMutation();
  const utils = api.useUtils();
  const handleDelete = async () => {
    await deleteMutation.mutateAsync(foodId);
    await utils.coachingFoods.get.invalidate();
    router.refresh();
    toast.success(`${foodName} har tagits bort!`);
    handleToggleDialog(false);
  };

  return (
    <AlertDialog
      open={dialogOpen}
      onOpenChange={(state) => {
        handleToggleDialog(state);
      }}
    >
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
          <AlertDialogCancel asChild>
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
