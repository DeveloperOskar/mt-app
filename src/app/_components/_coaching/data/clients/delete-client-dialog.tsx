"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/app/_components/ui/alert-dialog";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import {
  coachingClientsState$,
  toggleDeleteClientDialog,
} from "~/app/_state/coaching/data/clients/coachingClientsState";

enableReactTracking({
  auto: true,
});

const DeleteClientDialog = () => {
  const { client, show } = coachingClientsState$.deleteClientDialog.get();

  const router = useRouter();
  const deleteMutation = api.coachingClients.delete.useMutation();
  const utils = api.useUtils();

  const handleDelete = async () => {
    if (!client) return;

    await deleteMutation.mutateAsync({
      id: client.id,
      imageKey: client?.imageKey,
    });
    await utils.coachingFoods.get.invalidate();
    router.refresh();
    toast.success(`${client.name} har tagits bort!`);
    toggleDeleteClientDialog(false, null);
  };

  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ta bort livsmedlet</AlertDialogTitle>
          <AlertDialogDescription>
            Är du säkert på att du vill ta bort{" "}
            <span className="font-bold"> {client?.name}</span>? Detta går inte
            att ångra.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            asChild
            onClick={() => toggleDeleteClientDialog(false, null)}
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

export default DeleteClientDialog;
