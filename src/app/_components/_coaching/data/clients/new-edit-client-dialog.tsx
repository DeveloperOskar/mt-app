"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
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
import {
  GetCoachingClient,
  createClientSchema,
} from "~/types/_coaching/data/clients/coaching-clients";
import {
  UploadButton,
  Uploader,
  uploadFiles,
} from "~/app/_components/ui/uploadthing";
import { Button } from "~/app/_components/ui/button";
import { Avatar } from "~/app/_components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
type Form = UseFormReturn<
  {
    name: string;
    email: string;
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
    imageUrl: string;
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

const defaultImage = "/default_client.png";
const AddClientDialog = ({
  client,
  form,
}: {
  client?: GetCoachingClient;
  form: Form;
}) => {
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
      ...values,
      id: client.id,
      imageUrl: client.imageUrl,
    });
    await utils.coachingClients.invalidate();
    toast.success(`${values.name} har sparats`);
    router.refresh();
  };

  const createClient = async (values: z.infer<typeof createClientSchema>) => {
    setIsUploading(true);
    let uploadedUrl = "";
    if (file) {
      try {
        const metadata = await uploadFiles("imageUploader", {
          files: [file],
        });

        uploadedUrl = metadata[0]?.url ?? "";
        setIsUploading(false);
        toast.success("Bilden har sparats");
      } catch (error) {
        setIsUploading(false);
        toast.success("Bilden kunde inte sparas");
      }
    }

    await createMutation.mutateAsync({
      ...values,
      imageUrl: uploadedUrl ?? "",
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
        <Avatar className="h-20 w-20">
          <AvatarImage src={image} />
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
                      onChange={(event) =>
                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        )
                      }
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
                      onChange={(event) =>
                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        )
                      }
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
                      onChange={(event) =>
                        field.onChange(
                          +event.target.value !== 0 ? +event.target.value : "",
                        )
                      }
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
