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

const DeleteClientDialog: React.FC<{
  handleToggleDialog: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
  clientId: number;
  clientName: string;
  clientImageKey?: string;
}> = ({
  clientImageKey = "",
  clientId,
  clientName,
  dialogOpen,
  handleToggleDialog,
}) => {
  const router = useRouter();
  const deleteMutation = api.coachingClients.delete.useMutation();
  const utils = api.useUtils();
  const handleDelete = async () => {
    await deleteMutation.mutateAsync({
      id: clientId,
      imageKey: clientImageKey,
    });
    await utils.coachingFoods.get.invalidate();
    router.refresh();
    toast.success(`${clientName} har tagits bort!`);
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
            <span className="font-bold"> {clientName}</span>? Detta går inte att
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

export default DeleteClientDialog;
