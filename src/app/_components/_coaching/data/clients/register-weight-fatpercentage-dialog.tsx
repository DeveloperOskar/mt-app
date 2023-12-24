"use client";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import React, { useEffect, useState } from "react";
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
import {
  coachingClientsState$,
  toggleAddWeightOrFatPercentageDialog,
} from "~/app/_state/coaching/data/clients/coachingClientsState";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Input } from "~/app/_components/ui/input";
import { useRouter } from "next/navigation";
import { Label } from "~/app/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { CalendarIcon, Edit } from "lucide-react";
import { Calendar } from "~/app/_components/ui/calendar";
import { cn } from "~/app/_lib/utils";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Separator } from "~/app/_components/ui/separator";

enableReactTracking({
  auto: true,
});

const RegisterWeightFatPercentageDialog = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const [value, setValue] = useState<number | undefined>(undefined);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const { clientId, show, action, clientName, history } =
    coachingClientsState$.addWeightOrFatPercentageDialog.get();

  useEffect(() => {
    if (activeIndex === undefined) return;

    setValue(history[activeIndex]?.value);
    setDate(new Date(history[activeIndex]?.date ?? new Date()));
  }, [activeIndex]);

  const addWeightMutation = api.coachingClients.addWeightIn.useMutation();
  const addFatPercentageMutation =
    api.coachingClients.addFatPercentage.useMutation();

  const handleRegister = async () => {
    if (action === "weight") {
      try {
        if (!clientId || !value) return;

        await addWeightMutation.mutateAsync({
          clientId,
          weight: value,
        });

        toggleAddWeightOrFatPercentageDialog(false, null, "weight", "", []);
        toast.success("Vikten har registrerats!");

        utils.coachingClients.get.invalidate();
        router.refresh();
      } catch (error) {
        toast.error(
          "Något gick fel! Försök igen senare. Eller kontakta support.",
        );
      }
    } else {
      if (!clientId || !value) return;
      try {
        await addFatPercentageMutation.mutateAsync({
          clientId,
          fatPercentage: value,
        });

        toggleAddWeightOrFatPercentageDialog(false, null, "weight", "", []);
        toast.success("Vikten har registrerats!");

        utils.coachingClients.get.invalidate();
        router.refresh();
      } catch (error) {
        toast.error(
          "Något gick fel! Försök igen senare. Eller kontakta support.",
        );
      }
    }
  };

  return (
    <AlertDialog
      open={show}
      onOpenChange={(state) => {
        if (!state) {
          setActiveIndex(undefined);
          setDate(new Date());
          setValue(undefined);
          toggleAddWeightOrFatPercentageDialog(false, null, "weight", "", []);
        }
      }}
    >
      <AlertDialogContent className="w-[450px]">
        <AlertDialogHeader>
          {action === "weight" ? (
            <AlertDialogTitle>
              Registrera vikt för{" "}
              <span className=" capitalize">{clientName}</span>
            </AlertDialogTitle>
          ) : (
            <AlertDialogTitle>
              Registrera fettprocent för{" "}
              <span className=" capitalize">{clientName}</span>
            </AlertDialogTitle>
          )}
          <AlertDialogDescription>
            {action === "weight"
              ? "Registrera vikt för klienten"
              : "Registrera fettprocent för klienten"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <Label className="flex flex-col ">Datum</Label>
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div>
          <Label className="flex flex-col ">Ny vikt</Label>
          <Input
            className="mt-2"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.valueAsNumber)}
          />
        </div>

        <Separator />

        <History
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          history={history}
          action={action}
        />

        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel
            disabled={
              addWeightMutation.isLoading || addFatPercentageMutation.isLoading
            }
          >
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={!value || isNaN(value)}
            loading={
              addWeightMutation.isLoading || addFatPercentageMutation.isLoading
            }
            onClick={handleRegister}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RegisterWeightFatPercentageDialog;

const History: React.FC<{
  history: { date: string; value: number }[];
  action: "weight" | "fatPercentage";
  activeIndex?: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ history, action, activeIndex, setActiveIndex }) => {
  return (
    <div>
      <Label>Historik</Label>

      <div className=" mt-1.5 grid grid-cols-3 gap-2">
        {history.map((item, index) => (
          <div
            key={index}
            className={cn(
              " relative  flex items-center justify-between gap-2  rounded-md border  border-accent bg-accent px-3 py-1.5",
              activeIndex === index && " border-primary",
            )}
          >
            <div>
              <p className="text-sm font-semibold">
                {item.value} {action === "weight" ? " kg" : " %"}
              </p>
              <p className="text-xs">{item.date.split("T")[0]}</p>
            </div>

            <Button
              onClick={() => {
                setActiveIndex(index);
              }}
              variant={"ghost"}
              size={"icon"}
              className="absolute right-0 top-0"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const DatePicker: React.FC<{
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}> = ({ date, setDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " mt-1.5 w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", {
              locale: sv,
            })
          ) : (
            <span>Välj ett datum</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
