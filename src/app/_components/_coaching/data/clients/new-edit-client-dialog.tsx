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
import { uploadFiles } from "~/app/_components/ui/uploadthing";
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

const defaultImage = "/default_client.png";
type Form = UseFormReturn<
  {
    name: string;
    email: string;
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
    imageUrl: string;
    imageKey: string;
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
  const { client, show } = coachingClientsState$.addEditClientDialog.get();

  const [isUploading, setIsUploading] = React.useState(false);
  const updateMutation = api.coachingClients.update.useMutation();
  const createMutation = api.coachingClients.create.useMutation();
  const router = useRouter();
  const utils = api.useUtils();
  const title = client ? "Redigera klienten" : "Skapa ny klient";

  const imageRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState<string>(defaultImage);
  const [file, setFile] = React.useState<File | null>(null);

  useEffect(() => {
    if (client) {
      setImage(
        client.imageUrl && client.imageUrl !== ""
          ? client.imageUrl
          : defaultImage,
      );
    }
  }, [client]);

  useEffect(() => {
    if (!show) {
      setImage(defaultImage);
      setFile(null);

      if (imageRef.current) imageRef.current.files = null;
    }
  }, [show]);

  const onSubmit = async (values: z.infer<typeof createClientSchema>) => {
    if (!client) {
      await createClient(values);
    } else {
      await updateClient(values);
    }
  };

  const updateClient = async (values: z.infer<typeof createClientSchema>) => {
    if (!client) return;

    setIsUploading(true);
    let uploadedUrl = undefined;
    let newImageKey = undefined;

    if (file) {
      try {
        const metadata = await uploadFiles("imageUploader", {
          files: [file],
        });

        newImageKey = metadata[0]?.key ?? "";
        uploadedUrl = metadata[0]?.url ?? "";
        setIsUploading(false);
        toast.success("Bilden har sparats");
      } catch (error) {
        setIsUploading(false);
        toast.success("Bilden kunde inte sparas");
      }
    }
    setIsUploading(false);

    await updateMutation.mutateAsync({
      updatedClient: {
        ...values,
        id: client.id,
        imageUrl: uploadedUrl ? uploadedUrl : client.imageUrl,
        imageKey: newImageKey ? newImageKey : client.imageKey,
      },
      updateImage: newImageKey !== undefined && uploadedUrl !== undefined,
    });
    await utils.coachingClients.invalidate();
    toast.success(`${values.name} har sparats`);
    router.refresh();
    form.reset();
    toggleAddEditClientDialog(false, null);
  };

  const createClient = async (values: z.infer<typeof createClientSchema>) => {
    setIsUploading(true);
    let uploadedUrl = "";
    let imageKey = "";
    if (file) {
      try {
        const metadata = await uploadFiles("imageUploader", {
          files: [file],
        });

        imageKey = metadata[0]?.key ?? "";
        uploadedUrl = metadata[0]?.url ?? "";
        setIsUploading(false);
        toast.success("Bilden har sparats");
      } catch (error) {
        setIsUploading(false);
        toast.success("Bilden kunde inte sparas");
      }
    }
    setIsUploading(false);

    await createMutation.mutateAsync({
      ...values,
      imageUrl: uploadedUrl ?? "",
      imageKey: imageKey ?? "",
    });
    await utils.coachingClients.invalidate();
    toast.success(`${values.name} har sparats`);
    router.refresh();
    form.reset();
    setImage(defaultImage);
    setFile(null);
    if (imageRef.current) imageRef.current.files = null;
  };

  const openSelectImage = () => {
    imageRef.current?.click();
  };

  const handleImageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
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

      <div className="mx-auto flex flex-col items-center justify-center">
        <Avatar className="h-20 w-20 ">
          <AvatarImage src={image} className="h-full w-full object-cover" />
        </Avatar>

        <Button onClick={openSelectImage} variant={"link"}>
          {image === defaultImage ? "Lägg till bild" : "Byt bild"}
        </Button>

        <input
          accept="image/*"
          onChange={handleImageSelected}
          ref={imageRef}
          className="sr-only"
          type="file"
          name="file"
          id="file"
        />
      </div>

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
              loading={
                createMutation.isLoading ||
                isUploading ||
                updateMutation.isLoading
              }
              className=" float-right ml-4 "
              type="submit"
            >
              {client ? "Updatera" : "Skapa"}
            </Button>

            <AlertDialogCancel asChild>
              <Button
                onClick={() => toggleAddEditClientDialog(false, null)}
                disabled={
                  createMutation.isLoading ||
                  isUploading ||
                  updateMutation.isLoading
                }
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
