"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "~/app/_components/ui/alert-dialog";

const NewEditFoodDialog = ({ text }: { text: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary  px-4 py-2 text-sm font-medium text-primary-foreground text-white ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ">
        {text}
      </AlertDialogTrigger>

      <AddFoodDialog />
    </AlertDialog>
  );
};

export default NewEditFoodDialog;

const AddFoodDialog = () => {
  return (
    <AlertDialogContent>
      sdfsdsfd
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
