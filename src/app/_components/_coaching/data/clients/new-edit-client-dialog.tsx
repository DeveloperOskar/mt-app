"use client";
import React, { useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogCancel,
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
import { createClientSchema } from "~/types/_coaching/data/clients/coaching-clients";
import { Button } from "~/app/_components/ui/button";
import { Avatar } from "~/app/_components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import {
  coachingClientsState$,
  toggleAddEditClientDialog,
} from "~/app/_state/coaching/data/clients/coachingClientsState";
import { calculateCalories } from "~/app/_lib/utils";
import {
  AVATAR_BASE_BACKGROUND_COLOR,
  AVATAR_BASE_TEXT_COLOR,
  AvatarColorPicker,
} from "~/app/_components/ui/avatar-color-picker";

type Form = UseFormReturn<
  {
    name: string;
    email: string;
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
    textColor: string;
    backgroundColor: string;
  },
  any,
  undefined
>;

enableReactTracking({
  auto: true,
});

export const NewEditClientDialog = () => {
  const { show, client } = coachingClientsState$.addEditClientDialog.get();

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: "",
      email: "",
      protein: 0,
      carbs: 0,
      fat: 0,
      kcal: 0,
      backgroundColor: "#F1F5F9",
      textColor: "#272E3F",
    },
  });

  useEffect(() => {
    if (client) {
      form.setValue("name", client.name);
      form.setValue("email", client.email);
      form.setValue("protein", client.protein);
      form.setValue("carbs", client.carbs);
      form.setValue("fat", client.fat);
      form.setValue("kcal", client.kcal);
    }
  }, [client]);

  return (
    <AlertDialog
      open={show}
      onOpenChange={(state) => {
        if (!state) {
          form.reset();
        }
      }}
    >
      <AddClientDialog form={form} />
    </AlertDialog>
  );
};

const AddClientDialog = ({ form }: { form: Form }) => {
  const textColor = React.useState(AVATAR_BASE_TEXT_COLOR);
  const background = React.useState(AVATAR_BASE_BACKGROUND_COLOR);
  const { client, show } = coachingClientsState$.addEditClientDialog.get();

  const updateMutation = api.coachingClients.update.useMutation();
  const createMutation = api.coachingClients.create.useMutation();
  const router = useRouter();
  const utils = api.useUtils();
  const title = client ? "Redigera klienten" : "Skapa ny klient";

  useEffect(() => {
    if (client) {
      textColor[1](client.textColor);
      background[1](client.backgroundColor);
    } else {
      textColor[1](AVATAR_BASE_TEXT_COLOR);
      background[1](AVATAR_BASE_BACKGROUND_COLOR);
    }
  }, [client]);

  const onSubmit = async (values: z.infer<typeof createClientSchema>) => {
    if (!client) {
      await createClient(values);
    } else {
      await updateClient(values);
    }
  };

  const updateClient = async (values: z.infer<typeof createClientSchema>) => {
    if (!client) return;

    await updateMutation.mutateAsync({
      updatedClient: {
        ...values,
        id: client.id,
        textColor: textColor[0],
        backgroundColor: background[0],
      },
    });
    await utils.coachingClients.invalidate();
    toast.success(`${values.name} har sparats`);
    router.refresh();
    form.reset();
    toggleAddEditClientDialog(false, null);
  };

  const createClient = async (values: z.infer<typeof createClientSchema>) => {
    await createMutation.mutateAsync({
      ...values,
      textColor: textColor[0],
      backgroundColor: background[0],
    });
    await utils.coachingClients.invalidate();
    toast.success(`${values.name} har sparats`);
    router.refresh();
    form.reset();
  };

  return (
    <AlertDialogContent className="w-[800px] max-w-none">
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
          Skapa en ny klient som du kan skapa koschema och träningsprogram till.
          Du kan senare enkelt skicka schemat till klienten via e-post.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AvatarColorPicker
        name={form.watch("name")}
        background={background}
        textColor={textColor}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Namn *</FormLabel>
                  <FormControl>
                    <Input placeholder="Sara Eriksson" {...field} />
                  </FormControl>
                  <FormDescription>Namet på klienten.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Epost</FormLabel>
                  <FormControl>
                    <Input placeholder="Sara.Eriksson@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>Klientens Epost.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="protein"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Protein *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder=""
                      {...field}
                      onChange={(event) => {
                        const protein = !event.target.value
                          ? 0
                          : event.target.valueAsNumber;
                        const calories = calculateCalories(
                          protein,
                          form.getValues("fat"),
                          form.getValues("carbs"),
                        );

                        form.setValue("kcal", +calories.toFixed(1));

                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>Klientens proteinbehov.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kolhydrater *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder=""
                      {...field}
                      onChange={(event) => {
                        const carbs = !event.target.value
                          ? 0
                          : event.target.valueAsNumber;
                        const calories = calculateCalories(
                          form.getValues("protein"),
                          form.getValues("fat"),
                          carbs,
                        );

                        form.setValue("kcal", +calories.toFixed(1));

                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>Klientens kolhydratsbehov.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fett *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder=""
                      {...field}
                      onChange={(event) => {
                        const fat = !event.target.value
                          ? 0
                          : event.target.valueAsNumber;
                        const calories = calculateCalories(
                          form.getValues("protein"),
                          fat,
                          form.getValues("carbs"),
                        );

                        form.setValue("kcal", +calories.toFixed(1));

                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>Klientens fettbehov.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kcal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kalorier *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder=""
                      {...field}
                      onChange={(event) =>
                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>Klientens kaloribehov.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8">
            <Button
              loading={createMutation.isLoading || updateMutation.isLoading}
              className=" float-right ml-4 "
              type="submit"
            >
              {client ? "Updatera" : "Skapa"}
            </Button>

            <AlertDialogCancel asChild>
              <Button
                onClick={() => toggleAddEditClientDialog(false, null)}
                disabled={createMutation.isLoading || updateMutation.isLoading}
                variant={"secondary"}
                className=" float-right"
                type="button"
              >
                Stäng
              </Button>
            </AlertDialogCancel>
          </div>
        </form>
      </Form>
    </AlertDialogContent>
  );
};
