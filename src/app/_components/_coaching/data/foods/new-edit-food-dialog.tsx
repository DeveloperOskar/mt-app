"use client";
import React, { useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "~/app/_components/ui/alert-dialog";
import { Button } from "~/app/_components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createFoodSchema } from "~/types/_coaching/data/foods/coaching-foods";
import {
  coachingFoodsState$,
  toggleAddEditFoodDialog,
} from "~/app/_state/coaching/data/foods/coahcingFoodsState";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

type Form = UseFormReturn<
  {
    name: string;
    brand: string;
    unit: "g" | "ml" | "unit";
    amount: number;
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
  },
  any,
  undefined
>;

enableReactTracking({
  auto: true,
});

export const NewEditFoodDialog = () => {
  const { food, show } = coachingFoodsState$.addEditFoodDialog.get();

  const form = useForm<z.infer<typeof createFoodSchema>>({
    resolver: zodResolver(createFoodSchema),
    defaultValues: {
      name: "",
      brand: "",
      unit: "g",
      amount: 100,
      protein: 0,
      carbs: 0,
      fat: 0,
      kcal: 0,
    },
  });

  useEffect(() => {
    if (food) {
      form.setValue("name", food.name);
      form.setValue("brand", food.brand ?? "");
      form.setValue("unit", food.unit);
      form.setValue("amount", food.amount);
      form.setValue("protein", food.protein);
      form.setValue("carbs", food.carbs);
      form.setValue("fat", food.fat);
      form.setValue("kcal", food.kcal);
    }
  }, [food]);

  return (
    <AlertDialog
      open={show}
      onOpenChange={(state) => {
        if (!state) {
          form.reset();
        }
      }}
    >
      <AddFoodDialog form={form} />
    </AlertDialog>
  );
};

const AddFoodDialog = ({ form }: { form: Form }) => {
  const { food } = coachingFoodsState$.addEditFoodDialog.get();

  const title = food ? "Redigera livsmedel" : "Skapa nytt livsmedel";
  const createMutation = api.coachingFoods.create.useMutation();
  const updateMutation = api.coachingFoods.update.useMutation();
  const utils = api.useUtils();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof createFoodSchema>) => {
    if (!food) {
      await createMutation.mutateAsync(values);
      await utils.coachingFoods.get.invalidate();
      router.refresh();
      toast.success("Livsmedlet skapades.");
      form.reset();
    } else {
      await updateMutation.mutateAsync({
        ...values,
        liked: food.liked ?? false,
        id: food.id,
      });
      await utils.coachingFoods.get.invalidate();
      router.refresh();
      toast.success("Livsmedlet updaterades.");
    }
  };

  return (
    <AlertDialogContent className="w-[800px] max-w-none">
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
          Skapa ett eget livsmedel genom att fylla i fälten nedan. Du kan senare
          använda livsmedlet i dina måltider och för att skapa kostplaner.
        </AlertDialogDescription>
      </AlertDialogHeader>

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

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Märke</FormLabel>
                  <FormControl>
                    <Input placeholder="Garant..." {...field} />
                  </FormControl>
                  <FormDescription>Livsmedlets märke.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enhet</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="g">Gram (G)</SelectItem>
                      <SelectItem value="ml">Mililiter (ML)</SelectItem>
                      <SelectItem value="unit">Enhet (Styck)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Vilken enhet livsmedlet ska räknas med.
                  </FormDescription>
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
                      {...field}
                      onChange={(event) =>
                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>Livsmedlets kalorier.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mängd *</FormLabel>
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
                  <FormDescription>Mängd.</FormDescription>
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
                      onChange={(event) =>
                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>Livsmedlets protein.</FormDescription>
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
                      {...field}
                      onChange={(event) =>
                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>Livsmedlets kolhydrater.</FormDescription>
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
                      {...field}
                      onChange={(event) =>
                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>Livsmedlets fett.</FormDescription>
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
              {food ? "Updatera" : "Skapa"}
            </Button>

            <AlertDialogCancel
              asChild
              onClick={() => toggleAddEditFoodDialog(false, null)}
            >
              <Button
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
