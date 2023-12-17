"use client";
import React from "react";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, getInitials } from "~/app/_lib/utils";
import { Avatar, AvatarFallback } from "../../ui/avatar";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

const ClientsProgress: React.FC<{ clients: GetCoachingClient[] }> = ({
  clients,
}) => {
  const [selectedClient, setSelectedClient] = React.useState<
    GetCoachingClient | undefined
  >(clients[0]);

  const getLabels = () => {
    if (!selectedClient) return [];
    return selectedClient.weightIns.map(
      (weightIn) => weightIn.date.split("T")[0],
    );
  };

  const getDatSet = () => {
    if (!selectedClient) return [];
    return selectedClient.weightIns.map((weightIn) => weightIn.value);
  };

  const getMin = () => {
    if (!selectedClient) return 0;
    return Math.min(
      ...selectedClient.weightIns.map((weightIn) => weightIn.value),
    );
  };

  const getMax = () => {
    if (!selectedClient) return 0;
    return Math.max(
      ...selectedClient.weightIns.map((weightIn) => weightIn.value),
    );
  };

  return (
    <Card className="w-1/2 p-6  ">
      <CardHeader className="flex flex-row items-center justify-between px-0 pt-0">
        <CardTitle>Klienters Viktprogression</CardTitle>

        <SelectClientComboBox
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          clients={clients}
        />
      </CardHeader>

      <Line
        options={{
          scales: {
            y: {
              suggestedMin: getMin() - 1,
              suggestedMax: getMax() + 1,
            },
          },
        }}
        datasetIdKey="label"
        data={{
          labels: getLabels(),
          datasets: [
            {
              data: getDatSet(),
            },
          ],
        }}
      />
    </Card>
  );
};

export default ClientsProgress;

const SelectClientComboBox: React.FC<{
  clients: GetCoachingClient[];
  selectedClient: GetCoachingClient | undefined;
  setSelectedClient: React.Dispatch<
    React.SetStateAction<GetCoachingClient | undefined>
  >;
}> = ({ clients = [], selectedClient, setSelectedClient }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between pl-2"
        >
          <div className="flex items-center gap-2 ">
            <Avatar className="h-7 w-7 text-xs ">
              <AvatarFallback
                className="  uppercase "
                style={{
                  backgroundColor: selectedClient?.backgroundColor,
                  color: selectedClient?.textColor,
                }}
              >
                <span className="">
                  {getInitials(selectedClient?.name ?? "")}
                </span>
              </AvatarFallback>
            </Avatar>

            <span className=" capitalize">
              {selectedClient?.name ?? "Välj en klient"}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Sök efter klient..." />
          <CommandEmpty>Ingen klient hittad.</CommandEmpty>

          <CommandGroup>
            {clients.map((client) => (
              <CommandItem
                key={client.id}
                value={client.id.toString()}
                onSelect={(selected) => {
                  setSelectedClient(
                    selected === selectedClient?.id?.toString()
                      ? selectedClient
                      : clients.find((c) => c.id.toString() === selected),
                  );
                  setOpen(false);
                }}
              >
                <div className="flex w-full items-center gap-2">
                  <Avatar className="h-7 w-7 text-xs ">
                    <AvatarFallback
                      className=" uppercase"
                      style={{
                        backgroundColor: client.backgroundColor,
                        color: client.textColor,
                      }}
                    >
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>

                  <span className=" capitalize">{client.name}</span>
                </div>

                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedClient?.id === client.id
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
