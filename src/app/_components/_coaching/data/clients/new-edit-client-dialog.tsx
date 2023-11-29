"use client";
import React, { Dispatch, SetStateAction } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/app/_components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GetCoachingClient,
  createClientSchema,
} from "~/types/_coaching/data/clients/coaching-clients";
import { UploadButton } from "~/app/_components/ui/uploadthing";

type Form = UseFormReturn<
  {
    name: string;
    email: string;
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
  },
  any,
  undefined
>;

export const NewEditClientDialog = ({
  client,
  handleToggleDialog,
  dialogOpen,
}: {
  client?: GetCoachingClient;
  handleToggleDialog: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
}) => {
  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: client?.name ?? "",
      email: client?.email ?? "",
      protein: client?.protein ?? 0,
      carbs: client?.carbs ?? 0,
      fat: client?.fat ?? 0,
      kcal: client?.kcal ?? 0,
    },
  });

  return (
    <AlertDialog
      open={dialogOpen}
      onOpenChange={(state) => {
        if (!state) {
          form.reset();
        }

        handleToggleDialog(state ?? false);
      }}
    >
      <AddClientDialog client={client} form={form} />
    </AlertDialog>
  );
};

const AddClientDialog = ({
  client,
  form,
}: {
  client?: GetCoachingClient;
  form: Form;
}) => {
  const title = client ? "Redigera klienten" : "Skapa ny klient";

  const onSubmit = async (values: z.infer<typeof createClientSchema>) => {};

  return (
    <AlertDialogContent className="w-[800px] max-w-none">
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
          Skapa en ny klient som du kan skapa koschema och träningsprogram till.
          Du kan senare enkelt skicka schemat till klienten via e-post.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <UploadButton
        endpoint={"imageUploader"}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          console.log("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(`ERROR! ${error.message}`);
        }}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Namn *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nötfärs 10%..." {...field} />
                  </FormControl>
                  <FormDescription>Namet på livsmedlet.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </AlertDialogContent>
  );
};
